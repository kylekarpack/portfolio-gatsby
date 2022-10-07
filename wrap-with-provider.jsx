import { createTheme, CssBaseline, NextUIProvider } from "@nextui-org/react";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const theme = createTheme({
	type: "light",
	theme: {
		colors: {
			primary: "#43a9d1",
		},
	},
});

export const wrapRootElement = ({ element }) => {
	return (
		<HelmetProvider>
			<Helmet>{CssBaseline.flush()}</Helmet>
			<NextUIProvider theme={theme}>{element}</NextUIProvider>
		</HelmetProvider>
	);
};
