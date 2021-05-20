const config = require("./config/website");

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;

module.exports = {
	pathPrefix: config.pathPrefix,
	siteMetadata: {
		siteUrl: config.siteUrl + pathPrefix,
	},
	flags: {
		DEV_SSR: false,
		PRESERVE_WEBPACK_CACHE: true,
		PRESERVE_FILE_DOWNLOAD_CACHE: true,
		PARALLEL_SOURCING: true,
		FAST_DEV: true
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-styled-components",
		{
			resolve: "gatsby-source-google-docs",
			options: {
				// https://drive.google.com/drive/folders/FOLDER_ID
				folder: "1tj9nGujJ0TAGWcegD5XjRFgUDYJrcQRS",
				createPages: false,
				demoteHeadings: false,
				debug: true,
			},
		},
		"gatsby-transformer-remark",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "projects",
				path: `${__dirname}/content/projects`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: `${__dirname}/src/pages`,
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "static",
				path: `${__dirname}/static`,
			},
		},
		{
			resolve: "gatsby-plugin-mdx",
			options: {
				extensions: [".mdx", ".md"],
				gatsbyRemarkPlugins: [
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 820,
							quality: 90,
							linkImagesToOriginal: false,
						},
					},
					{
						resolve: "gatsby-remark-external-links",
						options: {
							target: "_blank",
							rel: "nofollow noopener noreferrer",
						},
					},
					{
						resolve: "gatsby-remark-responsive-iframe",
						options: {},
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-google-analytics",
			options: {
				trackingId: config.googleAnalyticsID,
			},
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		"gatsby-plugin-lodash",
		"gatsby-plugin-catch-links",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: config.siteTitle,
				short_name: config.siteTitleShort,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: "standalone",
				icons: [
					{
						src: "/favicons/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/favicons/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		},
		"gatsby-plugin-offline",
		"gatsby-plugin-netlify",
	],
};
