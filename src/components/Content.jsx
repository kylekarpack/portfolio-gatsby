import styled from "styled-components";
import { Container } from "../components";

const Content = styled(Container)`
	margin: 0 auto;
	input,
	textarea {
		padding: 0.75em 1em;
		width: 100%;
		display: block;
		margin-bottom: 1em;
		font-size: 1rem;
		background: #f2f4f5;
		border: none;
		outline: none;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
		&:focus {
			box-shadow: 0 0 0 2px ${(props) => props.theme.brand.primary};
		}
	}
	button {
		background: ${(props) => props.theme.brand.primary};
		color: #fff;
		padding: 0.5em 2em;
		font-size: 1em;
		border: none;
	}
`;

export default Content;