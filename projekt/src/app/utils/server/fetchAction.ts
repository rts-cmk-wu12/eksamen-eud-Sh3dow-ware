export const fetchAction = async (endpoint: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`Response Status kode: ${response.status}`)
    }
    return await response.json()
  } catch (e) {
    throw new Error((e as Error).message)
  }
}