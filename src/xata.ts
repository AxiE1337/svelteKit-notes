// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from '@xata.io/client';
import { XATA_API_KEY } from '$env/static/private';

import type { BaseClientOptions, SchemaInference, XataRecord } from '@xata.io/client';

const tables = [
	{
		name: 'notes',
		columns: [
			{
				name: 'created_at',
				type: 'datetime',
				notNull: true,
				defaultValue: '2023-01-14T17:12:24.429Z'
			},
			{ name: 'updated_at', type: 'datetime' },
			{ name: 'uid', type: 'string' },
			{ name: 'text', type: 'text', notNull: true, defaultValue: '' }
		]
	},
	{
		name: 'user',
		columns: [
			{ name: 'name', type: 'string' },
			{ name: 'email', type: 'email' },
			{
				name: 'created_at',
				type: 'datetime',
				notNull: true,
				defaultValue: '2023-01-14T17:34:05.126Z'
			}
		]
	}
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Notes = InferredTypes['notes'];
export type NotesRecord = Notes & XataRecord;

export type User = InferredTypes['user'];
export type UserRecord = User & XataRecord;

export type DatabaseSchema = {
	notes: NotesRecord;
	user: UserRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
	databaseURL: 'https://myWorkspace-n5j0gg.eu-west-1.xata.sh/db/notesSvelte'
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
	constructor(options?: BaseClientOptions) {
		super({ ...defaultOptions, ...options }, tables);
	}
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
	if (instance) return instance;

	instance = new XataClient({ apiKey: XATA_API_KEY });
	return instance;
};
