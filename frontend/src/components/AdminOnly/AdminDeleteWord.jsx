import React, { useState } from "react"
import { deleteWord } from "../ApiConnections/DeleteWord"
import { fetchWords } from '../ApiConnections/FetchWords'


export const AdminDeleteWord = ({ setWords, words }) => {
    const [deleteTarget, setDeleteTarget] = useState('')

    const handleDelete = async () => {
        const wordToDelete = words.find(word => word.finnish_version === deleteTarget)

        if (!wordToDelete) {
            return alert('Word not found')
        }

        // Delete the word using the id
        await deleteWord(wordToDelete.id)

        // Fetch the updated words list
        fetchWords(setWords)

        // Clear the input field
        setDeleteTarget('')
    }

    return (
        <div className="delete-word-wrapper">
            <h2>Delete a word</h2>
            <input
                type="text"
                className="delete-word-input"
                placeholder="Finnish word to delete"
                value={deleteTarget}
                onChange={(e) => setDeleteTarget(e.target.value)}
            />
            <button className="delete-word-button btn" onClick={handleDelete}>
                Delete Word
            </button>
        </div>
    )
}
