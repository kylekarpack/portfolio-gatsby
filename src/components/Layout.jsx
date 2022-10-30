import {
	Container,
	createTheme,
	CssBaseline,
	NextUIProvider,
	styled,
	getCssText
} from "@nextui-org/react";
import PropTypes from "prop-types";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import SEO from "./SEO";

const MainContent = styled(Container, {
	padding: "$16 0",
});

const primary = "#43a9d1";

const theme = createTheme({
	type: "light",
	theme: {
		colors: {
			primary,
		},
	},
});

// We can pass customSEO here to not include the <SEO> component twice. This prop is 'true' on the project template
// as the SEO component there passes in some additional things. Otherwise things would be inserted two times
const Layout = ({ children, pathname, customSEO, fixed, bannerContent }) => {
	return (
		<>
			{CssBaseline.flush()}
			<style dangerouslySetInnerHTML={{__html: getCssText()}} />
			<style
				dangerouslySetInnerHTML={{
					__html: `:root { --nextui-colors-primary: ${primary}; --nextui-colors-link: ${primary} }`,
				}}
			/>
			<NextUIProvider theme={theme}>
				{!customSEO && <SEO pathname={pathname} />}
				<Navigation pathname={pathname} />
				{bannerContent ? bannerContent : null}
				<MainContent css={{ maxWidth: fixed ? "55em" : null }}>
					{children}
				</MainContent>

				<Footer />
			</NextUIProvider>
		</>
	);
};

export default Layout;

Layout.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
	pathname: PropTypes.string.isRequired,
	customSEO: PropTypes.bool,
	fixed: PropTypes.bool,
	bannerContent: PropTypes.element,
};

Layout.defaultProps = {
	customSEO: false,
};
