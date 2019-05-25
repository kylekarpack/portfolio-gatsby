import React from 'react'
import { Link, Image, StaticQuery, graphql } from 'gatsby'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import styled from 'styled-components'
import config from '../../config/website'

const Wrapper = styled.header`
  align-items: center;
  display: flex;
  padding: 0;
  position: relative;
  z-index: 1000;
  background: ${props => props.theme.brand.secondary};
  a {
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    z-index: 100;
    &:hover {
      color: ${props => props.theme.brand.primary};
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0;
    flex-wrap: wrap;
  }
`

const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  padding: 0;
  a {
    padding 1rem 1.5rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 2;
  }
  img {
	  max-width: 100%;
  }
`

const Name = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  a {
    font-size: 1.25rem;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 700;
    &:hover,
    &:focus {
      color: ${props => props.theme.colors.body_color};
      text-decoration: none;
    }
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 1;
    flex: 1 0 100%;
    margin-bottom: 0.75rem;
  }
`

const SocialMedia = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding: 0 ${props => props.theme.spacer.horizontal};
  a {
    font-size: 1.25rem;
    line-height: 20px;
  }
  a:not(:first-child) {
    margin-left: 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    padding: 0 1rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    order: 3;
  }
`

// Grabs all MDX files from src/pages and puts them into the navigation

const Navigation = () => (
	<StaticQuery
		query={query}
		render={data => (
			<Wrapper data-testid="navigation">

				<Nav>
					<Link to="/">
						<img src="logo.png" />
					</Link>
					<Link to="/" data-testid="home-title-link" activeClassName="nav-active">
						Home
          			</Link>
					{data.nav.edges.map((nav, index) => (
						<Link
							key={nav.node.fields.slug}
							to={nav.node.fields.slug}
							data-testid={`navItem-${index}`}
							activeClassName="nav-active"
						>
							{nav.node.frontmatter.title}
						</Link>
					))}
					<Link to="/contact" data-testid="contact-title-link" activeClassName="nav-active">
						Contact
          			</Link>
				</Nav>
				<SocialMedia>
					<a
						href="https://github.com/kylekarpack"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Github">
						<FaGithub />
					</a>
					<a
						href="https://www.linkedin.com/in/kylekarpack"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn">
						<FaLinkedin />
					</a>
				</SocialMedia>
			</Wrapper>
		)}
	/>
)

export default Navigation

const query = graphql`
  query NavLinks {
    nav: allMdx(filter: { fields: { sourceInstanceName: { eq: "pages" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
