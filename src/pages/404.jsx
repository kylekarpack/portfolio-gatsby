import React from "react";
import PropTypes from "prop-types";
import { Layout } from "../components";
import { Container } from "@nextui-org/react";

const NotFoundPage = ({ location }) => (
	<Layout pathname={location.pathname}>
		<Container css={{textAlign: "center", padding: "4em 0"}}>
			<h1>Not Found</h1>
			<p>You&#39;ve hit a route that doesn&#39;t exist</p>
		</Container>
	</Layout>
);

export default NotFoundPage;

NotFoundPage.propTypes = {
	location: PropTypes.object.isRequired,
};
