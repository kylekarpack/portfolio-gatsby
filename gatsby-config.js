const config = require("./config/website");

const pathPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;

module.exports = {
	pathPrefix: config.pathPrefix,
	siteMetadata: {
		siteUrl: config.siteUrl + pathPrefix,
	},
	flags: {
		DEV_SSR: false,
		PRESERVE_FILE_DOWNLOAD_CACHE: true,
		PARALLEL_SOURCING: true,
		FAST_DEV: true,
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		{
			/* Include plugin */
			resolve: "gatsby-omni-font-loader",
		
			/* Plugin options */
			options: {
				/* Font loading mode */
				mode: "render-blocking",
				/* Enable font loading listener to handle FOUT */
				enableListener: false,
				/* Preconnect URL-s. This example is for Google Fonts */
				preconnect: ["https://use.typekit.net"],
				/* Web fonts. File link should point to font CSS file. */
				web: [{
						/* Exact name of the font as defied in @font-face CSS rule */
						name: "proxima-nova",
						/* URL to the font CSS file with @font-face definition */
						file: "https://use.typekit.net/kia0axj.css",
					},
				],
			},
		},
		"gatsby-plugin-styled-components",
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
				name: "pagesmd",
				path: `${__dirname}/content/pages`,
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
				],
			},
		},
		{
			resolve: "gatsby-plugin-google-gtag",
			options: {
				trackingIds: [config.googleAnalyticsID],
			},
		},
		"gatsby-plugin-image",
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
