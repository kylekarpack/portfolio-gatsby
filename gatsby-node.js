const _ = require("lodash");
const getColors = require("get-image-colors");
const path = require("path");
const config = require("./config/website");

// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = (promise) =>
	promise.then((result) => {
		if (result.errors) {
			throw result.errors;
		}
		return result;
	});

exports.onCreateNode = async ({ node, actions, getNode }) => {
	const { createNodeField } = actions;
	let slug;
	// Only use MDX nodes
	if (node.internal.type === "Mdx") {
		const fileNode = getNode(node.parent);
		// If the frontmatter contains a "slug", use it
		if (
			Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
		) {
			slug = `/${_.kebabCase(node.frontmatter.slug)}`;
		}
		// Otherwise use the title for the slug
		if (
			Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
			Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
		) {
			slug = `/${_.kebabCase(node.frontmatter.title)}`;
		}
		createNodeField({ node, name: "slug", value: slug });
		// Adds the name of "gatsby-source-filesystem" as field (in this case "projects" or "pages")
		createNodeField({
			node,
			name: "sourceInstanceName",
			value: fileNode.sourceInstanceName,
		});

		let color = config.themeColor;

		// If no color is specified, get one from the image
		if (node.frontmatter.color) {
			color = node.frontmatter.color;
		} else {
			if (node.frontmatter.cover) {
				try {
					const colors = await getColors(
						path.join(node.internal.contentFilePath, "../", node.frontmatter.cover)
					);
					color = colors[0].hex();
					for (let c of colors) {
						if (c.get("lab.l") < 90) {
							color = c.hex();
							break;
						}
					}
				} catch (e) {
					// eslint-disable-next-line no-console
					console.error("could not get color", e);
				}
			}
		}
		node.frontmatter.color = color;
		createNodeField({ node, name: "frontmatter.color", value: color });
		createNodeField({ node, name: "color", value: color });
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	// Our templates for projects and files inside /pages/*.mdx
	const projectPage = require.resolve("./src/templates/project.jsx");
	const singlePage = require.resolve("./src/templates/single.jsx");

	const result = await wrapper(
		graphql(`
			{
				projects: allMdx(
					filter: { fields: { sourceInstanceName: { eq: "projects" } } }
				) {
					nodes {
						fields {
							slug
						}
						internal {
							contentFilePath
						}
					}
				}
				single: allMdx(
					filter: { fields: { sourceInstanceName: { eq: "pages" } } }
				) {
					nodes {
						fields {
							slug
						}
						internal {
							contentFilePath
						}
					}
				}
			}
		`)
	);

	// Create all portfolio pages
	result.data.projects.nodes.forEach((node) => {
		createPage({
			path: path.join("portfolio", node.fields.slug),
			component: `${projectPage}?__contentFilePath=${node.internal.contentFilePath}`,
			context: {
				// Pass "slug" through context so we can reference it in our query like "$slug: String!"
				slug: node.fields.slug,
			},
		});
	});

	// Create all single pages
	result.data.single.nodes.forEach((node) => {
		createPage({
			path: node.fields.slug,
			component: `${singlePage}?__contentFilePath=${node.internal.contentFilePath}`,
			context: {
				slug: node.fields.slug,
			},
		});
	});
};

// Necessary changes to get gatsby-mdx and Cypress working
exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
	const cfg = getConfig();

	cfg.module.rules = [
		...cfg.module.rules.filter(
			(rule) => String(rule.test) !== String(/\.jsx?$/)
		),
		{
			...loaders.js(),
			test: /\.jsx?$/,
			exclude: (modulePath) =>
				/node_modules/.test(modulePath) &&
				!/node_modules\/gatsby-mdx/.test(modulePath),
		},
	];

	actions.replaceWebpackConfig(cfg);
};
