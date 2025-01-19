import React, { useState } from 'react'
import { addWord } from '../ApiConnections/AddWord'
import { fetchWords } from '../ApiConnections/FetchWords'

export const AdminAddWord = ({ setWords }) => {

    const [errorMessage, setErrorMessage] = useState('')
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')

    // Handle form submission to add a new word
    const handleSubmit = async (e) => {

        // Prevent React from refreshing the page
        e.preventDefault()

        // Check if either Finnish or English is empty
        if (!finnish || !english) {
            setErrorMessage('Both Finnish and English fields are required!')
            return
        }

        setErrorMessage('')

        // Add the new word
        await addWord(finnish, english)

        // Clear form fields
        setFinnish('')
        setEnglish('')

        // Re-fetch words list to include the new word
        fetchWords(setWords)
    }

    return (
        <div className="add-word-wrapper">
            <h2>Add a word</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={finnish}
                    onChange={(e) => setFinnish(e.target.value)}
                    placeholder="Finnish word"
                />
                <input
                    type="text"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                    placeholder="English word"
                />
                <button className='add-word-button btn' type="submit">Add Word</button>

            </form>
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
        </div>
    )
}
