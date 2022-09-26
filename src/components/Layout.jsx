import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import SEO from "./SEO";

// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times
const Layout = ({ children, pathname, customSEO }) => (
	<>
		{!customSEO && <SEO pathname={pathname} />}
		<Navigation pathname={pathname} />
		{children}
		<Footer />
	</>
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
