import { createTheme, NextUIProvider } from "@nextui-org/react";
import React from "react";

const darkTheme = createTheme({
	type: "light",
	theme: {
		colors: {
			primary: "#43a9d1"
		}
	}
});

export const wrapRootElement = ({ element }) => {
	return <NextUIProvider theme={darkTheme}>{element}</NextUIProvider>;
};
