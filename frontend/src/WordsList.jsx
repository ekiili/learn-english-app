import { useState, useEffect } from 'react'

const URL = 'http://localhost:3000/words'

const WordsList = () => {
    const [words, setWords] = useState([])
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')
    const [translations, setTranslations] = useState({})

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
        <>
            <h1>Learn English!</h1>

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

            <h2>Words List</h2>
            <ul>
                {words.length === 0 ? (<li>No words found.</li>)
                    :
                    (words.map((word) => (
                        <div key={word.id}>
                            <li>
                                <strong>{word.finnish_version}</strong>
                            </li>
                            <input
                                type="text"
                                placeholder="In English:"
                                value={translations[word.id] || ""}
                                onChange={(e) => translationHandler(e, word.id)}
                            />
                            <button onClick={() => checkTranslation(word)}>Check answer</button>
                        </div>
                    ))
                    )}
            </ul>
        </>
    )
}

export default WordsList
