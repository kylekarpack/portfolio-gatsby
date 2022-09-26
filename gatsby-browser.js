import { NextUIProvider, createTheme } from "@nextui-org/react";
import React from "react";

const darkTheme = createTheme({
	type: "light",
});

export const wrapRootElement = ({ element }) => {
	return (
		<NextUIProvider theme={darkTheme}>
			{element}
		</NextUIProvider>
	);
};
