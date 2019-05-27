/* eslint react/display-name: 0 */
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { useTrail } from 'react-spring'
import styled from 'styled-components'
import { Layout, ProjectItem } from '../components'

const Wrapper = styled.div`
	padding: 2vw;
`
const ListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	grid-column-gap: 2vw;
	grid-row-gap: 2vw;
	width: 100%;
`

const Portfolio = ({
  data: {
    allMdx: { edges: projectEdges },
  },
  location,
}) => {
  const trail = useTrail(projectEdges.length, {
    from: { height: '0%' },
    to: { height: '100%' },
  })

  return (
    <Layout pathname={location.pathname}>
		<Wrapper>
			<h1>Recent Work</h1>
			<ListWrapper>
				{trail.map((style, index) => (
				<ProjectItem
					testid={`projectItem-${index}`}
					style={style}
					key={projectEdges[index].node.fields.slug}
					node={projectEdges[index].node}
				/>
				))}
			</ListWrapper>
		</Wrapper>
    </Layout>
  )
}

export default Portfolio

Portfolio.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PortfolioQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      edges {
		node {
			excerpt(pruneLength: 140)
		}
        node {
          fields {
            slug
			color
          }
          frontmatter {
			title
            cover {
              childImageSharp {
                fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
