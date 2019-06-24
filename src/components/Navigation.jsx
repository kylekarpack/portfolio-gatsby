import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { FaGithub, FaLinkedin, FaBars } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled.header`
	position: sticky;
	top: 0;
	align-items: center;
	display: flex;
	padding: 0;
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
	.navbar-toggle {
		display: none;
		padding: 0.75rem;
		cursor: pointer;
		svg {
			font-size: 1.25rem;
			fill: #fff;
		}
		&:hover {
			svg {
				fill: #ddd;
			}
		}
	}
	@media (max-width: ${props => props.theme.breakpoints.s}) {
		padding: 0;
		display: block;
		position: static;
		.navbar-toggle {
			display: inline-block;
		}
		.navbar {
			display: block;
			&.collapsed {
				display: none;
			}
		}

	}
`;

const Nav = styled.nav`
	display: flex;
	flex: 1;
	justify-content: flex-start;
	padding: 0;
	a {
		padding: 1rem 1.5rem;
	}
	@media (max-width: ${props => props.theme.breakpoints.m}) {
		a {
			padding: 1rem;
		}
	}
	@media (max-width: ${props => props.theme.breakpoints.s}) {
		padding: 0 1rem;
		display: block;
		a {
			display: block;	
			text-align: center;
		}
	}
	@media (max-width: ${props => props.theme.breakpoints.xs}) {
		order: 2;
	}
	.logo {
		@media (max-width: ${props => props.theme.breakpoints.s}) {
			display: none;
		}
		width: 15%;
		max-width: 10em;
		min-width: 5em;
		padding: 1rem 1vw;
		margin-right: 1vw;
		img {
			max-width: 100%;
		}
	}
`;

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
		float: right;
		padding: .5rem 1rem;
	}
	@media (max-width: ${props => props.theme.breakpoints.xs}) {
		order: 3;
	}
`;

// Grabs all MDX files from src/pages and puts them into the navigation

class Navigation extends React.Component {

	state = {
		collapsed: true
	}

	toggleSideNav = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		return (
			<StaticQuery
				query={query}
				render={() => (
					<Wrapper data-testid="navigation">

						<a className="navbar-toggle" onClick={this.toggleSideNav}>
							<FaBars />
						</a>

						<Nav className={this.state.collapsed ? "navbar collapsed" : "navbar"}>
							<Link to="/" className="logo">
								<img src="/logo.png" alt="Site Logo" />
							</Link>
							<Link to="/" data-testid="home-title-link" activeClassName="nav-active">
								Home
							</Link>
							<Link to="/about" data-testid="about-title-link" activeClassName="nav-active">
								About
							</Link>
							<Link to="/resume" data-testid="resume-title-link" activeClassName="nav-active">
								Resume
							</Link>
							<Link to="/portfolio" data-testid="portfolio-title-link" activeClassName="nav-active">
								Portfolio
							</Link>
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
		);
	}
}

export default Navigation;

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
`;
