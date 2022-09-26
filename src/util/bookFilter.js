
export const bookFilter = (book) => {
	return (
		!book.title?.toLowerCase()?.includes("hardy boys") &&
		!book.subtitle?.toLowerCase()?.includes("hardy boys") &&
		book.dateRead?.getFullYear() > 2015
	);
};