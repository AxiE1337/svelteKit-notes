export interface ISession {
	user: {
		name: string;
		email: string;
		image: string;
		sub: string;
	};
	expires: number;
}
export interface INote {
	id: string;
	text: string | null | undefined;
	uid: string | null | undefined;
	updated_at: number | Date | null | undefined;
}
