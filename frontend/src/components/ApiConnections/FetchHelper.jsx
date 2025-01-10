export const fetchHelper = async (url, method, body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    if (body) {
        options.body = JSON.stringify(body)
    }

    const res = await fetch(url, options)
    if (!res.ok) {
        throw new Error(`Error while fetching: ${res.status}`)
    }
    return res.json()
}
