import { useState, useEffect } from 'react'
import '../stylesheets/App.css'
import { fetchHelper } from './FetchHelper'
import { fetchWords } from './ApiConnections/FetchWords'
import { AdminLogin } from './AdminLogin'
const URL = 'http://localhost:3000/words'
const password = 'admin'

const App = () => {
    const [words, setWords] = useState([])
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')
    const [translations, setTranslations] = useState({})
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        fetchWords(setWords)
    }, [])

    // Handle form submission to add a new word
    const addWord = async (e) => {
        e.preventDefault()  // Prevent React from refreshing the page
        if (!finnish || !english) {
            alert('Both Finnish and English words are required')
            return
        }

        try {
            const data = await fetchHelper(URL, 'POST',
                {
                    finnish_version: finnish,
                    english_version: english,
                }
            )
            console.log('Word added:', data)

            // Clear form fields
            setFinnish('')
            setEnglish('')

            // Re-fetch words list to include the new word
            fetchWords(setWords)
        } catch (error) {
            console.error('Error adding word:', error)
        }
    }

    // Update the status of a word (0: not learned, 1: learned)
    const updateStatus = async (id, status) => {
        try {
            const data = await fetchHelper(
                `${URL}/${id}/status`,
                'PUT',
                { status: status }
            )
            console.log('Status updated', data)

            // Refresh the words list
            fetchWords(setWords)

        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    // Reset all statuses to 0 (not learned)
    const resetStatuses = async () => {
        try {
            const data = await fetchHelper(
                `${URL}/reset-status`,
                'PUT'
            )
            console.log('Statuses reset:', data)

            // Refresh the words list
            fetchWords(setWords)
        } catch (error) {
            console.error('Error resetting statuses:', error)
        }
    }

    // Checking the users answer
    const checkTranslation = (word) => {
        const translation = translations[word.id]
        if (translation.toLowerCase() === word.english_version.toLowerCase()) {
            // If correct, update the status to "learned"
            updateStatus(word.id, 1) // Call updateStatus with word.id and status 1 (learned)
            alert('Correct translation!')
        } else {
            alert('Incorrect translation! Try again.')
            // Reset the translation input field
            setTranslations({
                ...translations,
                [word.id]: ''
            })
        }
    }

    // Update the state with the users translations
    const translationHandler = (e, id) => {
        setTranslations({
            ...translations,
            [id]: e.target.value
        })
    }


    return (
        <div className="app">

            <h1>Learn English!</h1>

            {/* Admin login */}
            {!admin ? <AdminLogin setAdmin={setAdmin} password={password} /> : null}

            {/* If admin is logged in, display the add word form */}
            {admin ? (
                <div className="admin-wrapper">
                    <div className="add-word-wrapper">
                        <form
                            onSubmit={addWord}>
                            <input
                                type="text"
                                placeholder="Finnish word"
                                value={finnish}
                                onChange={(e) => setFinnish(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="English translation"
                                value={english}
                                onChange={(e) => setEnglish(e.target.value)}
                            />
                            <button className='add-word-button btn' type="submit">Add Word</button>
                        </form>
                    </div>
                    <button className='reset-button btn'
                        onClick={() => resetStatuses()}>Reset all progress</button>
                </div>
            ) : null}

            <div className="words-list-wrapper">
                <h2>Words List</h2>
                <ul className='words-list'>
                    {words.length === 0 ? (<li>No words found.</li>)
                        :
                        (words.map((word) => (
                            <div key={word.id}>
                                <li>
                                    <strong>{word.finnish_version}:</strong>
                                </li>

                                {/* If the word is learned (status is 1), display the correct translation */}
                                {word.status === 1 ? (
                                    <p className='correct-translation'>
                                        <strong>Correct Translation:</strong> {word.english_version}
                                    </p>
                                ) : (
                                    <>
                                        <input className='translation-input'
                                            type="text"
                                            placeholder="Type the English translation"
                                            value={translations[word.id] || ""}
                                            onChange={(e) => translationHandler(e, word.id)}
                                        />
                                        <button className='check-button btn'
                                            onClick={() => checkTranslation(word)}>Check answer</button>
                                    </>
                                )}
                            </div>
                        ))
                        )}
                </ul>
            </div>
        </div>
    )
}

export default App
