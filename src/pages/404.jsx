import React from "react";
import PropTypes from "prop-types";
import { Layout, Container } from "../components";
import styled from "styled-components";

const Content = styled(Container)`
`;

const NotFoundPage = ({ location }) => (
	<Layout pathname={location.pathname}>
		<Content type="text">
			<h1>NOT FOUND</h1>
			<p>You&#39;ve hit a route that doesn&#39;t exist</p>
		</Content>
	</Layout>
);

export default NotFoundPage;

NotFoundPage.propTypes = {
	location: PropTypes.object.isRequired,
};
