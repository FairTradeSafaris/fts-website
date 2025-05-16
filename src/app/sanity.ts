import { createClient } from "@sanity/client";

export const sanity = createClient({
  projectId: "jw971r14", // replace with your actual project ID
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
