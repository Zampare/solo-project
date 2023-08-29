import { Client } from 'pg';
const PG_URL = '';
const client = new Client();
await client.connect();
