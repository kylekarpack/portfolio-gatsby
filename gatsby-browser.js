import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export const wrapRootElement = ({ element }) => {
	return (
		<NextUIProvider>
			{element}
		</NextUIProvider>
	);
};
