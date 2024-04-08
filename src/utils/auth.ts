export const isUserLoggedIn = (): boolean => {
    const accessToken = localStorage.getItem('access_token')

    if (!accessToken) {
        return false
    } else {
        return true
    }
}