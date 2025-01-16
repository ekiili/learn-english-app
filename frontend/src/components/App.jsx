import { useState, useEffect } from 'react'
import '../stylesheets/App.css'
import { fetchWords } from './ApiConnections/FetchWords'
import { addWord } from './ApiConnections/AddWord'
import { AdminPage } from './AdminOnly/AdminPage'
import { Quiz } from './Features/Quiz/Quiz'

const App = () => {
    const [words, setWords] = useState([])
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')

    // Fetch words list on component mount
    useEffect(() => {
        fetchWords(setWords)
    }, [])

    // Handle form submission to add a new word
    const handleAddWord = async (e) => {

        // Prevent React from refreshing the page
        e.preventDefault()

        // Add the new word
        await addWord(finnish, english)

        // Clear form fields
        setFinnish('')
        setEnglish('')

        // Re-fetch words list to include the new word
        fetchWords(setWords)
    }

    // Props for the admin page
    const adminProps = {
        setWords,
        words,
        finnish,
        setFinnish,
        english,
        setEnglish,
        handleAddWord
    }

    return (
        <div className="app">

            <h1>Learn English!</h1>

            {/* Admin page */}
            <AdminPage {...adminProps} />
            <Quiz words={words} />
        </div>
    )
}

export default App
