import { useState, useEffect } from 'react'
import './App.css'
const URL = 'http://localhost:3000/words'
const password = 'admin'

const App = () => {
    const [words, setWords] = useState([])
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')
    const [translations, setTranslations] = useState({})
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        fetchWords()
    }, [])

    // Fetch words from backend
    const fetchWords = async () => {
        try {
            const hr = await fetch(URL)
            const data = await hr.json() // Get the response
            setWords(data.data) // Access the data key which has the array of words
        } catch (error) {
            console.error('Error fetching words:', error)
        }
    }

    // Handle form submission to add a new word
    const addWord = async (e) => {
        e.preventDefault()
        if (!finnish || !english) {
            alert('Both Finnish and English words are required')
            return
        }

        try {
            const hr = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    finnish_version: finnish,
                    english_version: english,
                }),
            })

            const data = await hr.json() // Get the response
            console.log('Word added:', data)

            // Clear form fields
            setFinnish('')
            setEnglish('')

            // Re-fetch words list to include the new word
            fetchWords()
        } catch (error) {
            console.error('Error adding word:', error)
        }
    }

    // Update the status of a word (0: not learned, 1: learned)
    const updateStatus = async (id, status) => {
        try {
            const hr = await fetch(`${URL}/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status, // Send status
                })
            })

            const data = await hr.json() // Get the response
            console.log('Status updated', data)

            // Refresh the words list
            setWords((prevWords) =>
                prevWords.map((word) => {
                    if (word.id === id) {
                        return { ...word, status: status }
                    }
                    return word
                })
            )

        } catch (error) {
            console.error('Error updating status:', error)
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
            {!admin ? (
                <form>
                    <h3>Enter admin password to edit word list</h3>
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            if (e.target.value === password) {
                                setAdmin(true)
                            }
                        }}
                    />
                </form>
            ) : null}

            {/* If admin is logged in, display the add word form */}
            {admin ? (
                <form onSubmit={addWord}>
                    <input
                        type="text"
                        placeholder="Finnish word"
                        value={finnish}
                        onChange={(e) => setFinnish(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="English word"
                        value={english}
                        onChange={(e) => setEnglish(e.target.value)}
                    />
                    <button type="submit">Add Word</button>
                </form>
            ) : null}

            <h2>Words List</h2>
            <ul>
                {words.length === 0 ? (<li>No words found.</li>)
                    :
                    (words.map((word) => (
                        <div key={word.id}>
                            <li>
                                <strong>{word.finnish_version}</strong>
                            </li>

                            {/* If the word is learned (status is 1), display the correct translation */}
                            {word.status === 1 ? (
                                <p className='correct-translation'>
                                    <strong>Correct Translation:</strong> {word.english_version}
                                </p>
                            ) : (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Type the English translation"
                                        value={translations[word.id] || ""}
                                        onChange={(e) => translationHandler(e, word.id)}
                                    />
                                    <button onClick={() => checkTranslation(word)}>Check answer</button>
                                </>
                            )}
                        </div>
                    ))
                    )}
            </ul>
        </div>
    )
}

export default App
