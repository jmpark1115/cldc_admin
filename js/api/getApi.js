export async function CallBackendAPIFunction(FunctionName, BodyInJson = null, Login = false) {
    
    const APIURL = `https://26se42fkm9.execute-api.ap-northeast-2.amazonaws.com/${FunctionName}`

    try {
        const response = await fetch(APIURL, {
            method:'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('GIDT')}`
            },
            body: JSON.stringify(BodyInJson)
        })

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error('Failed to fetch data from the backend API.')
        }

    } catch(error) {
        console.error('Error:', error)
        throw error
    }
}