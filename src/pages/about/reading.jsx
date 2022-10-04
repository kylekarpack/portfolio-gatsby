import { Container, styled } from "@nextui-org/react";
import React from "react";
import { GoodreadsBookshelf } from "react-goodreads-shelf";
import { Layout } from "../../components";
import { bookFilter } from "../../util/bookFilter";

const Shelf = styled(Container, {
	".rgs-subtitle": {
		fontSize: "$sm",
	},
	".rgs-group-title small": {
		fontSize: "$lg"
	}
});

const ReadingPage = ({ location }) => (
	<Layout pathname={location.pathname}>
		<Shelf className="recently-read">
			<h2>Recently Read</h2>
			<GoodreadsBookshelf
				userId="63515611"
				limit={500}
				width={170}
				filter={bookFilter}
				groupBy="year"
			/>
		</Shelf>
	</Layout>
);

export default ReadingPage;
