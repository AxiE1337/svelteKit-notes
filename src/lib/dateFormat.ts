export default function dateFormate(date: number | Date | undefined) {
	const formattedDate = Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric'
	}).format(date);
	return formattedDate;
}
