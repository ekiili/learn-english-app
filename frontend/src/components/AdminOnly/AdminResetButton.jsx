import React from 'react'
import { resetStatuses } from '../ApiConnections/ResetStatuses'

export const AdminResetButton = ({ fetchWords, setWords, setTranslations }) => {

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