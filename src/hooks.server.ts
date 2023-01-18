// @ts-nocheck
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import GoogleProvider from '@auth/core/providers/google';
import {
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';
import { getXataClient } from './xata';

const xata = getXataClient();

const isUserExists = async (id: string) => {
	const user = await xata.db.user.read(id);
	return user;
};
const createUser = async (userData) => {
	const user = await xata.db.user.create({
		name: userData.name,
		email: userData.email,
		id: userData.id
	});
	return user;
};

export const handle = SvelteKitAuth({
	providers: [
		GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		async session({ session, user, token }) {
			session.user.sub = token.sub as string;
			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			const isExists = await isUserExists(user.id);

			if (!isExists) {
				await createUser(user);
			}

			const isAllowedToSignIn = true;

			if (isAllowedToSignIn) {
				return true;
			} else {
				return false;
			}
		}
	}
});
