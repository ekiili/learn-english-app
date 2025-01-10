import { fetchHelper } from './FetchHelper'

const URL = 'http://localhost:3000/words'

// Reset all statuses to 0 (not learned)
export const resetStatuses = async () => {
    try {
        const data = await fetchHelper(
            `${URL}/reset-status`, // reset-status endpoint automatically resets all statuses to 0
            'PUT'
        )
        console.log('Statuses reset:', data)

    } catch (error) {
        console.error('Error resetting statuses:', error)
    }
}