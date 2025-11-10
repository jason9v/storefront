export const decodeToken = (token: string): any => {
  try {
    const decoded = atob(token)
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}

export const decodeUserFromToken = (token: string) => {
  try {
    const decoded = decodeToken(token)

    if (decoded && decoded.email)
      return {
        id: decoded.id || 0,
        name: decoded.name || '',
        email: decoded.email || ''
      }

    return null
  } catch (error) {
    console.error('Failed to decode token:', error)
    return null
  }
}
