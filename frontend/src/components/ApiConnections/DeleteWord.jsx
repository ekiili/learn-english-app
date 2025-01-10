import { fetchHelper } from "./FetchHelper"

const URL = 'http://localhost:3000/words'

export const deleteWord = async (id) => {
    try {
        const data = await fetchHelper(
            `${URL}/${id}`,
            'DELETE'
        )
        console.log('Word deleted', data)
    } catch (error) {
        console.error('Error deleting word:', error)
    }
}