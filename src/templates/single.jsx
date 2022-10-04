import { Container, Text } from "@nextui-org/react";
import PropTypes from "prop-types";
import React from "react";
import { animated, config, useSpring } from "react-spring";
import { Layout, SEO } from "../components";

const Single = ({ data: { mdx }, location, children }) => {
	const single = mdx.frontmatter;

	const titleProps = useSpring({
		config: config.slow,
		from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
		to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
	});
	const contentProps = useSpring({
		config: config.slow,
		delay: 500,
		from: { opacity: 0 },
		to: { opacity: 1 },
	});

	return (
		<Layout pathname={location.pathname} customSEO>
			<SEO pathname={location.pathname} postNode={mdx} single />
			<Container>
				<Text h1 data-testid="single-title" style={titleProps}>
					{single.title}
				</Text>
				<animated.div style={contentProps}>{children}</animated.div>
			</Container>
		</Layout>
	);
};

export default Single;

Single.propTypes = {
	data: PropTypes.shape({
		mdx: PropTypes.object.isRequired,
	}).isRequired,
	location: PropTypes.object.isRequired,
};
