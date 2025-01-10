import { fetchHelper } from './FetchHelper'

const URL = 'http://localhost:3000/words'

export const addWord = async (finnish, english) => {

    if (!finnish || !english) {
        alert('Both Finnish and English words are required')
        return
    }

    try {
        const data = await fetchHelper(URL, 'POST', {
            finnish_version: finnish,
            english_version: english,
        })
        console.log('Word added:', data)
    } catch (error) {
        console.error('Error adding word:', error)
        throw error // Rethrow the error to handle it in the component
    }
}
