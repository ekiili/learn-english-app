import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../stylesheets/App.css'
import { fetchWords } from './ApiConnections/FetchWords'
import { addWord } from './ApiConnections/AddWord'
import { Quiz } from './Features/Quiz/Quiz'
import { AdminPage } from './AdminOnly/AdminPage'
import { Header } from './Features/Header'

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
        <BrowserRouter>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Quiz words={words} />} />
                    <Route path="/admin" element={<AdminPage {...adminProps} />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
