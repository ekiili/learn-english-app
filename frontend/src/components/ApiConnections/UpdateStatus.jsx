import { fetchHelper } from './FetchHelper'

const URL = 'http://localhost:3000/words'

// Update the status of a word (0: not learned, 1: learned)
export const updateStatus = async (id, status) => {
    try {
        const data = await fetchHelper(
            `${URL}/${id}/status`,
            'PUT',
            { status: status }
        )
        console.log('Status updated', data)
    } catch (error) {
        console.error('Error updating status:', error)
    }
}