import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Layout } from "../components";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

class ContactPage extends React.Component {
	_onViewportChange = (viewport) => this.setState({ viewport });

	state = {
		map: {
			mapboxApiAccessToken:
				"pk.eyJ1Ijoia3lsZWthcnBhY2siLCJhIjoiY2pvZXZmNTh4MDZ2dzN3bm1pbmk1dDlmZiJ9.Gapqs5j98RUsHOBl2rqOGQ",
			mapStyle: "mapbox://styles/mapbox/outdoors-v10",
			viewport: {
				width: "100%",
				height: "35vh",
				latitude: 47.6798,
				longitude: -122.3258,
				zoom: 11,
			},
		},
	};

	encode(data) {
		return Object.keys(data)
			.map(
				(key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			)
			.join("&");
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target,
			data = this.encode({
				"form-name": form.getAttribute("name"),
				...this.state,
			});

		delete data.map;

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: data,
		})
			.then(() => this.setState({ submitted: true }))
			.catch((error) => alert(error));
	};

	render() {
		return (
			<Layout pathname={this.props.location.pathname}>
				<ReactMapGL
					mapboxApiAccessToken={this.state.map.mapboxApiAccessToken}
					mapStyle={this.state.map.mapStyle}
					onViewportChange={this._onViewportChange}
					{...this.state.map.viewport}
				/>

				<Content type="text">
					<h1>Contact</h1>
					{/* <h3>Get in Touch</h3>
					<p>Have an idea for a project? Want me to work for you? Send me a message here and I’ll get back to you as soon as possible.</p>
			
					<h3>Based Out of the PNW</h3>
					<p>Born and raised here, I love the Pacific Northwest and plan on being here for a long while.</p> */}
					<form
						name="contact"
						method="POST"
						data-netlify
						data-netlify-honeypot="bot-field"
						onSubmit={this.handleSubmit}
						hidden={this.state.submitted}>
						<input type="hidden" name="form-name" value="contact" />

						<p hidden>
							<label>
								Don’t fill this out:{" "}
								<input name="bot-field" onChange={this.handleChange} />
							</label>
						</p>

						<input
							type="text"
							name="name"
							placeholder="Your name"
							onChange={this.handleChange}
						/>
						<input
							type="email"
							name="email"
							placeholder="Your email"
							required
							onChange={this.handleChange}
						/>
						<textarea
							name="message"
							placeholder="Your message"
							rows="4"
							required
							onChange={this.handleChange}></textarea>
						<button type="submit">Send</button>
					</form>

					<p hidden={!this.state.submitted}>
						Thank you for your submission. I will get back to you shortly.
					</p>
				</Content>
			</Layout>
		);
	}
}

export default ContactPage;

ContactPage.propTypes = {
	location: PropTypes.object.isRequired,
};
