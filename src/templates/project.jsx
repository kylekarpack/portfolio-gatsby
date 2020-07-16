import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { SEO, Container, Layout } from "../components";

const ImageContainer = styled(animated.div)`
	padding: 1em;
`;

const Content = styled(Container)`
	padding-top: 2em;
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-auto-rows: 1fr;
	color: #777;
	@media (max-width: ${props => props.theme.breakpoints.m}) {
		display: block;
	}
`;

const InformationWrapper = styled(animated.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Title = styled(animated.h1)`
  margin-top: 0;
  border-bottom: 4px solid;
  display: inline-block;
`;

const ContentBlock = styled.div`
  h2, h3 {
	  color: ${props => (props.customcolor ? props.customcolor : props.theme.colors.grey)};
	  text-transform: uppercase;
	  font-size: 1.1rem;
	  font-weight: 600;
	  margin: 2em 0 0;
  }
`;

const Project = ({ data: { mdx: postNode }, location }) => {
	const project = postNode.frontmatter;

	const titleProps = {
		...useSpring({
			config: config.slow,
			from: { opacity: 0, transform: "translate3d(0, -30px, 0)" },
			to: { opacity: 1, transform: "translate3d(0, 0, 0)" },
		}),
		...{
			borderBottomColor: project.color
		}
	};
	const infoProps = useSpring({ config: config.slow, delay: 500, from: { opacity: 0 }, to: { opacity: 1 } });
	const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } });
	const imageProps = useSpring({
		config: config.slow,
		delay: 500,
		from: { opacity: 0, transform: "translate3d(0, -10%, 0)" },
		to: { opacity: 1, transform: "translate3d(0, 0, 0)" }
	});

	return (
		<Layout pathname={location.pathname} customSEO>
			<SEO pathname={location.pathname} postNode={postNode} article />
			<Content>
				<Container type="text">
					<Title data-testid="project-title" style={titleProps}>
						{project.title}
					</Title>
					<InformationWrapper style={infoProps}>
						<ContentBlock customcolor={project.color}>
							<h3>Date</h3>
							<p>{project.date}</p>
						</ContentBlock>
					</InformationWrapper>
					<ContentBlock customcolor={project.color}>
						<animated.div style={contentProps}>
							<MDXRenderer>{postNode.body}</MDXRenderer>
						</animated.div>
					</ContentBlock>
				</Container>
				<ImageContainer style={imageProps}>
					<Img fluid={project.cover.childImageSharp.fluid} alt="" />
				</ImageContainer>

			</Content>
		</Layout>
	);
};

export default Project;

Project.propTypes = {
	data: PropTypes.shape({
		mdx: PropTypes.object.isRequired,
	}).isRequired,
	location: PropTypes.object.isRequired,
};

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      fields {
        slug
      }
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
      frontmatter {
		title
        date(formatString: "MMMM YYYY")
		color
        cover {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 800) {
              src
            }
          }
        }
      }
    }
  }
`;
