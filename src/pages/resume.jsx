import { graphql } from "gatsby";
import React from "react";
import styled from "styled-components";
import { parse } from "node-html-parser";
import { Container, Layout } from "../components";

const Content = styled(Container)`
	line-height: 1.2;
	ul li {
		line-height: 1.5;
		font-size: 0.9rem;
	}
	p > span,
	p > a > span {
		font-size: 1em !important;
	}
	h2:first-of-type {
		font-size: 2rem;
	}
	h2 {
		font-size: 1.4rem;
		margin-top: 2.5rem;
		color: ${(props) => props.theme.brand.primary};
	}
	h3 {
		margin-top: 1.5rem;
		font-weight: 400;
		font-size: 1.2rem;
		span:first-child {
			font-weight: 700;
		}
	}
	h4 {
		font-size: 1rem;
		font-weight: 400;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 1rem;
		em {
			font-weight: 400;
		}
	}
	h1,
	h2,
	h3,
	h4 {
		> span {
			font-size: 1em !important;
		}
	}
`;

// Remove address from resume
const processResume = (str) => {
	const doc = parse(str);
	doc
		.querySelectorAll("a[href*='@'], a[href*='@'] + span")
		.forEach((el) => el.remove());
	return doc.toString();
};

const Resume = ({ data: { doc }, location }) => {
	const html = processResume(doc.childMarkdownRemark.html);
	return (
		<Layout pathname={location.pathname}>
			<Content type="text">
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</Content>
		</Layout>
	);
};

export default Resume;

export const pageQuery = graphql`
	query {
		doc: googleDocs(slug: { eq: "/resume" }) {
			path
			childMarkdownRemark {
				html
			}
		}
	}
`;
