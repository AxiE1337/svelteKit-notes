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
	text: string;
	uid: string | null | undefined;
	updated_at: Date | null | undefined;
	created_at: Date | null | undefined;
}

export type Theme = 'dark' | 'light';
