import { OpenAPI } from "@/generated-api";

export function initializeAPIClient() {
  OpenAPI.BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://fullstack.exercise.applifting.cz";
  OpenAPI.HEADERS = {
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
  };
}
