
const API_BASE_URL = "http://localhost:5000/api";

type ApiOptions = RequestInit & {
  token?: string;
};

export async function apiRequest(
  endpoint: string,
  options: ApiOptions = {}
) {
  const { token, headers, ...rest } = options;

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
        ...(token
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export default apiRequest;
