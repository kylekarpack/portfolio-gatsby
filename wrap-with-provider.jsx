import { createTheme, CssBaseline, NextUIProvider } from "@nextui-org/react";
import React from "react";
import { HelmetProvider } from "react-helmet-async";

const theme = createTheme({
	type: "light",
	theme: {
		colors: {
			primary: "#43a9d1",
		},
	},
});

const wrapRootElement = ({ element }) => {
	return (
		<HelmetProvider>
			{CssBaseline.flush()}
			<NextUIProvider theme={theme}>{element}</NextUIProvider>
		</HelmetProvider>
	);
};

export default wrapRootElement;
