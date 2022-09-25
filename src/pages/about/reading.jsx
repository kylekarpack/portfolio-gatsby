import React from "react";
import { GoodreadsBookshelf } from "react-goodreads-shelf";
import { Layout } from "../../components";
import { bookFilter } from "../../util/bookFilter";

const ReadingPage = ({ location }) => (
	<Layout pathname={location.pathname}>
		<div className="recently-read" style={{ padding: "0 2em" }}>
			<h2>Recently Read</h2>
			<GoodreadsBookshelf
				userId="63515611"
				limit={500}
				width={170}
				filter={bookFilter}
				groupBy="year"
			/>
		</div>
	</Layout>
);

export default ReadingPage;
