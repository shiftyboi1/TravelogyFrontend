import { client } from "./client";

interface SessionResponse {
  userId: string;
}

export async function fetchNewUserId(): Promise<number | null> {
  const response = await client<SessionResponse>("/users/new");
  return response.userId ? parseInt(response.userId, 10) : null;
}