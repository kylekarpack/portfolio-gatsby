import { Container } from "@nextui-org/react";
import React from "react";

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<Container
			css={{ textAlign: "center", padding: "2em 0" }}
			data-testid="footer">
			Copyright &copy; {year} Kyle Karpack
		</Container>
	);
};

export default Footer;
