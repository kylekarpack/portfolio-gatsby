import {
	Button,
	Container,
	Input,
	Spacer,
	Text,
	Textarea,
} from "@nextui-org/react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import React from "react";
import ReactMapGL from "react-map-gl";
import { Layout } from "../../components";
class ContactPage extends React.Component {
	_onViewportChange = (viewport) => this.setState({ viewport });

	state = {
		map: {
			mapboxApiAccessToken:
				"pk.eyJ1Ijoia3lsZWthcnBhY2siLCJhIjoiY2pvZXZmNTh4MDZ2dzN3bm1pbmk1dDlmZiJ9.Gapqs5j98RUsHOBl2rqOGQ",
			mapStyle: "mapbox://styles/mapbox/outdoors-v10",
			viewport: {
				width: "100%",
				height: "33vh",
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

				<Container css={{ maxWidth: "55em", padding: "2em 0" }}>
					<Text h2>Contact</Text>
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

						<Input
							fullWidth
							type="text"
							name="name"
							placeholder="Your name"
							onChange={this.handleChange}
						/>
						<Spacer />
						<Input
							fullWidth
							type="email"
							name="email"
							placeholder="Your email"
							required
							onChange={this.handleChange}
						/>
						<Spacer />
						<Textarea
							fullWidth
							name="message"
							placeholder="Your message"
							rows="4"
							required
							onChange={this.handleChange}
						/>
						<Spacer />
						<Button type="submit">Send</Button>
					</form>

					<p hidden={!this.state.submitted}>
						Thank you for your submission. I will get back to you shortly.
					</p>
				</Container>
			</Layout>
		);
	}
}

export default ContactPage;

ContactPage.propTypes = {
	location: PropTypes.object.isRequired,
};
