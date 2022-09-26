import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
	
`;

const Container = ({ children, type, className }) => (
	<Wrapper className={className} type={type}>
		{children}
	</Wrapper>
);

export default Container;

Container.propTypes = {
	children: PropTypes.node.isRequired,
	type: PropTypes.oneOf(["base", "text"]),
	className: PropTypes.string,
};

Container.defaultProps = {
	type: "base",
	className: null,
};
