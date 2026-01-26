import { client } from "./client";

interface SessionResponse {
  userId: string;
}

export async function fetchNewUserId(): Promise<string | null> {
  console.log("Fetching new user ID...");
  const response = await client<SessionResponse>("/users/new");
  return response.userId || null;
}