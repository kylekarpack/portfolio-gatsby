import { styled } from "@nextui-org/react";
import React from "react";
import { Layout } from "../../components";

const Content = styled("div", {
	ul: {
		listStyle: "disc",
		marginLeft: "$xl",
	},
});

export default function Recruitment(props) {
	return (
		<Layout pathname={props.location.pathname}>
			<h2>Recruitment Policy</h2>
			<Content>
				<p>
					Hi recruiters, and thank you for your interest. To help manage
					incoming requests, I can only respond to inquiries submitted using the
					form below. Please do not call, text, or send unsolicited email, and
					please consider removing my information from your system if obtained
					elsewhere. I will respond prompty to all relevant inquries, so please
					avoid contacting me multiple times regarding a single opportunity.
				</p>

				<p>
					I am not actively seeking opportunities, but I will respond to any
					inquries offering more than one of the following:
					<ul>
						<li>
							Competitive compensation for an experienced, productive,
							Seattle-based software engineer
						</li>
						<li>Meaningful work that benefits real people</li>
						<li>A modern tech stack and clean codebase</li>
						<li>Thoughful, remote-first culture</li>
					</ul>
				</p>

				<p>
					Please note that I am not currently interested in the following:
					<ul>
						<li>Amazon</li>
						<li>
							Products based on the collection or aggregation of user data
						</li>
						<li>
							Working with third-party recruiters without a specific position
						</li>
						<li>Relocating outside Seattle</li>
					</ul>
				</p>
			</Content>

			<iframe
				src="https://docs.google.com/forms/d/e/1FAIpQLSeGnUUbZyJLm3iOR2gSU4o0UVpigT92OW-74XyFsJdpp9yCIw/viewform?embedded=true"
				width="100%"
				height="1658"
				frameBorder="0"
				marginHeight="0"
				marginWidth="0">
				Loading…
			</iframe>
		</Layout>
	);
}
