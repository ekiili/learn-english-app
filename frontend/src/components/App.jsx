import { useState, useEffect } from 'react'
import '../stylesheets/App.css'
import { fetchWords } from './ApiConnections/FetchWords'
import { addWord } from './ApiConnections/AddWord'
import { updateStatus } from './ApiConnections/UpdateStatus'
import { AdminPage } from './AdminOnly/AdminPage'

const App = () => {
    const [words, setWords] = useState([])
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')
    const [translations, setTranslations] = useState({})

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

    // Checking the users answer
    const checkTranslation = async (word) => {
        const translation = translations[word.id]
        // If correct, update the status to "learned"¨
        if (translation.toLowerCase() === word.english_version.toLowerCase()) {

            // Call updateStatus with word.id and status 1 (learned)
            await updateStatus(word.id, 1)
            alert('Correct translation!')

            // Refresh the words list
            fetchWords(setWords)

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

    // Props for the admin page
    const adminProps = {
        setWords,
        words,
        finnish,
        setFinnish,
        english,
        setEnglish,
        handleAddWord,
        setTranslations
    }

    return (
        <div className="app">

            <h1>Learn English!</h1>

            {/* Admin page */}
            <AdminPage {...adminProps} />

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
