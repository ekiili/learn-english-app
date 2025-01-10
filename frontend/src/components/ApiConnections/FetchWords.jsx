import { fetchHelper } from './FetchHelper'

export const fetchWords = async (setWords) => {
    const URL = 'http://localhost:3000/words'
    try {
        const data = await fetchHelper(URL, "GET")
        setWords(data.data) // Access the data key which has the array of words
    } catch (error) {
        console.error('Error fetching words:', error)
    }
}