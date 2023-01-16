export default function dateFormate(date: Date | undefined) {
	if (!date) {
		return;
	}
	const new_date = new Date(date);

	const formattedDate = Intl.DateTimeFormat('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric'
	}).format(new_date);
	return formattedDate;
}
