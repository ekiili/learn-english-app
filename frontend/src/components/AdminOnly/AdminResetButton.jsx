import React from 'react'
import { resetStatuses } from '../ApiConnections/ResetStatuses'
import { fetchWords } from '../ApiConnections/FetchWords'

export const AdminResetButton = ({ setWords }) => {

    return (
        <button className='reset-button btn' onClick={() => {
            // Reset all word statuses to 0
            resetStatuses()
            // Fetch words again to update the list
            fetchWords(setWords)
        }}>Reset all progress</button>
    )
}