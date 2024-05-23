const BASE_URL = process.env.REACT_APP_PUBLIC_DEV_BASE_URL

export default async function fetchData(path, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, options);
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json()
  } catch (error) {
    throw error;
  }
}