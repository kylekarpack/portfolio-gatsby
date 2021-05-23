import React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components";
import SEO from "./SEO";
import Navigation from "./Navigation";
import Footer from "./Footer";
import theme from "../../config/theme";

// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times

const Layout = ({ children, pathname, customSEO }) => (
	<ThemeProvider theme={theme}>
		<>
			<link rel="stylesheet" href="https://use.typekit.net/kia0axj.css" />
			{!customSEO && <SEO pathname={pathname} />}
			<Navigation />
			{children}
			<Footer />
		</>
	</ThemeProvider>
);

export default Layout;

Layout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
	pathname: PropTypes.string.isRequired,
	customSEO: PropTypes.bool,
};

Layout.defaultProps = {
	customSEO: false,
};
