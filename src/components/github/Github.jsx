import React from "react";
import "./github.css";

class Github extends React.Component {

	constructor(props) {
		super(props);
		this.state = { 
			loaded: false,
			chart: "",
			header: "",
			tooltip: {
				position: null
			}
		};
		this.init();
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleMouseOut);
	}

	handleMouseOver = (e) => {
		if (e.target && e.target.matches && e.target.matches("rect")) {
			const rect = e.target.getBoundingClientRect()
			this.setState({
				tooltip: {
					data: e.target.dataset,
					position: {
						left: rect.x + rect.width / 2,
						top: rect.y - 4
					}
				}
			})
		}
	}

	handleMouseOut = (e) => {
		this.setState({ tooltip: null });
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
			<div className="contributions">
				<h2 className="contributions-header">{this.state.header}</h2>
				<div className="contributions-chart" 
					onMouseOver={this.handleMouseOver}
					onMouseOut={this.handleMouseOut}
					dangerouslySetInnerHTML={{ __html: this.state.chart }}></div>
				{
					this.state.tooltip && this.state.tooltip.data ?
						<div className="tooltip" style={this.state.tooltip.position}>
							<strong>Date:</strong> {this.state.tooltip.data.date} <br />
							<strong>Contributions:</strong> {this.state.tooltip.data.count}
						</div>
					: ""
				}
			</div>
		) : "";
	}

}

export default Github;