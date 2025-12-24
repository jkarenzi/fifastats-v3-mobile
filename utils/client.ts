const baseURL = process.env.EXPO_PUBLIC_BASE_URL;

export const fetchAPI = async (endpoint: string, options?: RequestInit) => {
  try {
    console.log(`${baseURL}${endpoint}`)
    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'An error occurred');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch API Error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network Error');
  }
};