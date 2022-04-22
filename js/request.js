export const request = async (url, method, body, headers) => {
    try {
        if (body) {
            body = JSON.stringify(body)
            headers["Content-Type"] = 'application/json'
        }

        const response = await fetch(url, { method, body, headers })
        const result = await response.json()

        return result

    } catch (error) {
        console.error('Что-то пошло не так!')
    }
}