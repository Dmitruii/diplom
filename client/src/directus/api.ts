import { createDirectus, rest } from "@directus/sdk";

const API_URL = process.env.API_URL as string;

const client = createDirectus("http://0.0.0.0:8055").with(
  rest({ credentials: "include" })
);

export default client;
