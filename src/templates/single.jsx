import PropTypes from "prop-types";
import React from "react";
import { animated, config, useSpring } from "react-spring";
import styled from "styled-components";
import { Container, Layout, SEO } from "../components";

const Content = styled(Container)`
	left: 0;
	right: 0;
	bottom: 0;
	padding-top: 2rem;
	padding-bottom: 2rem;
`;

const Title = styled(animated.h1)`
	margin-top: 0;
`;

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
			<Content type="text">
				<Title data-testid="single-title" style={titleProps}>
					{single.title}
				</Title>
			</Content>
			<Container type="text">
				<animated.div style={contentProps}>
					{children}
				</animated.div>
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
