import React from 'react'
import { resetStatuses } from '../ApiConnections/ResetStatuses'
import { fetchWords } from '../ApiConnections/FetchWords'

export const AdminResetButton = ({ setWords, setTranslations }) => {

    return (
        <button className='reset-button btn' onClick={() => {
            // Reset all word statuses to 0
            resetStatuses()
            // Fetch words again to update the list
            fetchWords(setWords)
            // Reset translations to empty any correct answers from the input boxes
            setTranslations({})
        }}>Reset all progress</button>
    )
}