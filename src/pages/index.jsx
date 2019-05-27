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

const Profile = styled.div`
	color: #777;
	h1, h2 { 
		margin: 0;
		font-weight: 400;
	}
	h2 {
		font-size: 1.4rem;
	}
	img {
		border-radius: 100%;
		max-height: 150px;
	}
	display: grid;
	grid-template-columns 1fr 6fr;
	grid-column-gap: 2vw;
	margin-bottom: 2vw;
`

const ListWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	grid-column-gap: 2vw;
	grid-row-gap: 2vw;
	width: 100%;
`

const Index = ({
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
			<Profile>
				<div>
					<img src="headshot.jpeg" alt="Kyle headshot" />
				</div>
				<div>
					<h1>Kyle Karpack</h1>
					<h2>Software Engineer in Seattle</h2>
				</div>
			</Profile>
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

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
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
