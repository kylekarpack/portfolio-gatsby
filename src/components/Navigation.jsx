import { Avatar, Link as TextLink, Navbar, Text } from "@nextui-org/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const NavLink = ({ to, currentPath, children }) => {
	const isActive =
		to === "/"
			? currentPath === "/"
			: currentPath?.trimEnd("/").startsWith(to?.trimEnd("/"));

	return (
		<Link to={to}>
			<Navbar.Link as="span" isActive={isActive}>
				{isActive && (
					<Text as="span" color="$primary">
						{children}
					</Text>
				)}
				{!isActive && <Text as="span">{children}</Text>}
			</Navbar.Link>
		</Link>
	);
};

const Navigation = ({ pathname }) => {
	return (
		<Navbar variant="sticky">
			<Navbar.Brand>
				<Link to="/" className="logo">
					<StaticImage
						placeholder="blurred"
						layout="constrained"
						height={32}
						src="../../static/logo.png"
						alt="Site logo"
					/>
				</Link>
			</Navbar.Brand>
			<Navbar.Content hideIn="xs">
				<NavLink to="/" currentPath={pathname}>
					Home
				</NavLink>
				<NavLink to="/about" currentPath={pathname}>
					About
				</NavLink>
				<NavLink to="/resume" currentPath={pathname}>
					Resume
				</NavLink>
				<NavLink to="/portfolio" currentPath={pathname}>
					Portfolio
				</NavLink>
				<NavLink to="/contact" currentPath={pathname}>
					Contact
				</NavLink>
			</Navbar.Content>
			<Navbar.Content>
				<TextLink
					color="text"
					href="https://github.com/kylekarpack"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Github">
					<Avatar pointer={true} icon={<FaGithub />} />
				</TextLink>
				<TextLink
					color="text"
					href="https://www.linkedin.com/in/kylekarpack"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn">
					<Avatar pointer={true} icon={<FaLinkedin />} />
				</TextLink>
			</Navbar.Content>
		</Navbar>
	);
	/*
		return (
			<StaticQuery
				query={query}
				render={() => (
					<Wrapper data-testid="navigation">
						<a className="navbar-toggle" onClick={this.toggleSideNav}>
							<FaBars />
						</a>

						<Nav
							className={this.state.collapsed ? "navbar collapsed" : "navbar"}
						>
							<Link to="/" className="logo">
								<StaticImage
									placeholder="blurred"
									layout="constrained"
									height={32}
									src="../../static/logo.png"
									alt="Site logo"
								/>
							</Link>
							<Link
								to="/"
								data-testid="home-title-link"
								activeClassName="nav-active"
							>
								Home
							</Link>
							<Link
								to="/about"
								data-testid="about-title-link"
								activeClassName="nav-active"
							>
								About
							</Link>
							<Link
								to="/resume"
								data-testid="resume-title-link"
								activeClassName="nav-active"
							>
								Resume
							</Link>
							<Link
								to="/portfolio"
								data-testid="portfolio-title-link"
								activeClassName="nav-active"
							>
								Portfolio
							</Link>
							<Link
								to="/contact"
								data-testid="contact-title-link"
								activeClassName="nav-active"
							>
								Contact
							</Link>
						</Nav>

					</Wrapper>
				)}
			/>
		);
		*/
};

export default Navigation;
