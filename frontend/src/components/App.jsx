import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '../stylesheets/App.css'
import { fetchWords } from './ApiConnections/FetchWords'
import { Quiz } from './Features/Quiz/Quiz'
import { AdminPage } from './AdminOnly/AdminPage'
import { Header } from './Features/Header'

const App = () => {
    const [words, setWords] = useState([])

    // Fetch words list on component mount
    useEffect(() => {
        fetchWords(setWords)
    }, [])

    // Props for the admin page
    const adminProps = {
        setWords,
        words
    }

    return (
        <BrowserRouter>
            <div className="app">
                <Header />
                <main className="app-content">
                    <Routes>
                        <Route path="/" element={<Quiz words={words} />} />
                        <Route path="/admin" element={<AdminPage {...adminProps} />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
