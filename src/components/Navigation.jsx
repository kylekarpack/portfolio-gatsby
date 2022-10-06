import { Avatar, Link as TextLink, Navbar, Text } from "@nextui-org/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const menuItems = [
	{ href: "/", title: "Home" },
	{ href: "/about", title: "About" },
	{ href: "/resume", title: "Resume" },
	{ href: "/portfolio", title: "Portfolio" },
	{ href: "/contact", title: "Contact" },
];

const NavLink = ({ to, currentPath, children, isCollapse }) => {
	const isActive =
		to === "/"
			? currentPath === "/"
			: currentPath?.trimEnd("/").startsWith(to?.trimEnd("/"));

	const LinkComponent = isCollapse ? Navbar.CollapseItem : Navbar.Link;

	return (
		<LinkComponent as="span" isActive={isActive}>
			<Link to={to}>
				{isActive && (
					<Text as="span" color="$primary">
						{children}
					</Text>
				)}
				{!isActive && <Text as="span">{children}</Text>}
			</Link>
		</LinkComponent>
	);
};

const Navigation = ({ pathname }) => {
	return (
		<Navbar variant="sticky">
			<Navbar.Toggle showIn="xs" aria-label="Toggle navigation" />

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
			<Navbar.Content hideIn="xs" variant="underline" activeColor="primary">
				{menuItems.map((el) => (
					<NavLink key={el.href} to={el.href} currentPath={pathname}>
						{el.title}
					</NavLink>
				))}
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
			<Navbar.Collapse>
				{menuItems.map((el) => (
					<NavLink
						key={el.href}
						to={el.href}
						currentPath={pathname}
						isCollapse={true}>
						{el.title}
					</NavLink>
				))}
			</Navbar.Collapse>
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
