export const googleBookService = {
    query
}

function query(txt) {
    const encodedSearchTerm = encodeURIComponent(txt)
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=intitle:${encodedSearchTerm}`

    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok')
            return res.json()
        })
        .then(json => json.items)
        .catch(error => {
            console.error('Fetch error:', error)
            throw error
        })
}