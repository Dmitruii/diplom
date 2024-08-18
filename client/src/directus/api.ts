import { authentication, createDirectus, rest } from "@directus/sdk";

const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
  // .with(authentication("json"))
  .with(rest({ credentials: "include" }))
  .with(authentication("session", { credentials: "include" }));

export default client;
