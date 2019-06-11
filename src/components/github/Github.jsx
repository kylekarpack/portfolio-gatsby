import React from "react";
import "./github.css";

class Github extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			loaded: false,
			chart: "",
			header: ""
		};
		this.init();
	}

	async init() {

		let responseText;

		try {
			const contributions = await fetch(
				`https://cors-anywhere.herokuapp.com/https://github.com/users/${this.props.username}/contributions`, 
				{ mode: "cors" }
			);

			responseText = await contributions.text();
		} catch (e) {
			console.warn("Error retrieving graph: ", e);
		}

		const parser = new DOMParser(),
			doc = await parser.parseFromString(responseText, "text/html");

		const graph = doc.body.querySelector(".calendar-graph");
		graph.querySelector("svg").setAttribute("viewBox", "0 0 828 128");

		this.setState({ 
			loaded: true,
			header: doc.body.querySelector(".f4").innerHTML,
			chart: graph.innerHTML 
		});
	}

	render() {
		return this.state.loaded ? (
			<div>
				<h2 className="contributions-header">{this.state.header}</h2>
				<div dangerouslySetInnerHTML={{ __html: this.state.chart }}></div>
			</div>
		) : "";
	}

}

export default Github;