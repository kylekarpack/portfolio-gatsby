import { styled } from "@nextui-org/react";
import React from "react";
import { useTrail } from "react-spring";
import ProjectItem from "./ProjectItem";

const InnerGrid = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
	gap: "$12",
});

const ProjectGrid = ({ nodes }) => {
	const trail = useTrail(nodes.length, {
		from: { opacity: 0 },
		to: { opacity: 1 },
	});
	return (
		<InnerGrid>
			{trail.map((style, index) => (
				<div xs={12} sm={4} md={3} key={nodes[index].fields.slug}>
					<ProjectItem
						testid={`projectItem-${index}`}
						key={nodes[index].fields.slug}
						node={nodes[index]}
						style={style}
					/>
				</div>
			))}
		</InnerGrid>
	);
};

export default ProjectGrid;
