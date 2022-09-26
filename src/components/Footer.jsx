import React from "react";
import styled from "styled-components";

const Wrapper = styled.footer`
	
`;
const year = new Date().getFullYear();
const Footer = () => (
	<Wrapper data-testid="footer">Copyright &copy; {year} Kyle Karpack</Wrapper>
);

export default Footer;
