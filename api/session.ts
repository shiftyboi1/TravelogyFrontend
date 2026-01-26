import { client } from "./client";

interface SessionResponse {
  userId: string;
}

export async function fetchNewUserId(): Promise<string | null> {
  const response = await client<SessionResponse>("/users/new");
  return response.userId || null;
}