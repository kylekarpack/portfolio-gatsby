import {
	Button,
	Card,
	Input,
	Loading,
	Spacer,
	styled,
	Text,
	Textarea,
} from "@nextui-org/react";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { Layout } from "../../components";

const Alert = styled(Card.Body, {
	backgroundColor: "$error",
	color: "$white",
	border: "2px solid $errorBorder",
});

const ContactPage = ({ location }) => {
	const [map, setMap] = useState({
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
	});

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({});

	const encode = (data) => {
		return Object.keys(data)
			.map(
				(key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			)
			.join("&");
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target,
			data = encode({
				"form-name": form.getAttribute("name"),
				...form,
			});

		delete data.map;

		setError(null);
		setLoading(true);
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: data,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
			})
			.then(() => setForm({ ...form, submitted: true }))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false));
	};

	return (
		<Layout
			pathname={location.pathname}
			fixed
			bannerContent={
				<ReactMapGL
					mapboxApiAccessToken={map.mapboxApiAccessToken}
					mapStyle={map.mapStyle}
					onViewportChange={(viewport) => setMap({ ...map, viewport })}
					{...map.viewport}
				/>
			}>
			<Text h2>Contact</Text>
			<form
				name="contact"
				method="POST"
				data-netlify
				data-netlify-honeypot="bot-field"
				onSubmit={handleSubmit}
				hidden={form.submitted}>
				<input type="hidden" name="form-name" value="contact" />

				<p hidden>
					<label>
						Don&quot;t fill this out:{" "}
						<input name="bot-field" onChange={handleChange} />
					</label>
				</p>

				<Input
					fullWidth
					type="text"
					name="name"
					placeholder="Your name"
					aria-label="Your name"
					onChange={handleChange}
				/>
				<Spacer />
				<Input
					fullWidth
					type="email"
					name="email"
					placeholder="Your email"
					aria-label="Your email"
					required
					onChange={handleChange}
				/>
				<Spacer />
				<Textarea
					fullWidth
					name="message"
					placeholder="Your message"
					aria-label="Your message"
					rows=""
					required
					onChange={handleChange}
				/>
				<Spacer />
				<Button type="submit" disabled={loading}>
					{loading ? <Loading size="sm" /> : "Send"}
				</Button>
			</form>

			<Spacer />

			{error && (
				<Card>
					<Alert>Error: {error}</Alert>
				</Card>
			)}

			<p hidden={!form.submitted}>
				Thank you for your submission. I will get back to you shortly.
			</p>
		</Layout>
	);
};

export default ContactPage;

ContactPage.propTypes = {
	location: PropTypes.object.isRequired,
};
