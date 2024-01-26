import { createDirectus, rest } from '@directus/sdk';

const API_URL = process.env.API_URL as string

const client = createDirectus(API_URL).with(rest())

export default client