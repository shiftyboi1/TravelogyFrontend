const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://127.0.0.1/8080";

export async function client<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const defaults = {
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}` // Handle tokens centrally here
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...defaults,
    ...options,
    headers: { ...defaults.headers, ...options?.headers },
  });

  if (!response.ok) {
    // throw new Error(`API Error: ${response.statusText}`);
    console.log(`API Error: ${response.status} ${response.statusText}`);
  }

  // Handle empty responses
  if (response.status === 204) return {} as T;

  return response.json();
}