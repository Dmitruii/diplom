import { authentication, createDirectus, graphql, rest } from "@directus/sdk";

class LocalStorage {
  get() {
    return JSON.parse(localStorage.getItem("directus-data"));
  }
  set(data: any) {
    localStorage.setItem("directus-data", JSON.stringify(data));
  }
}

const storage = new LocalStorage();

const client = createDirectus(process.env.NEXT_PUBLIC_API_URL as string)
  .with(rest())
  .with(authentication("json", { storage }));

export default client;
