import { useState, useEffect } from 'react'

const URL = 'http://localhost:3000/words'

const WordsList = () => {
    const [words, setWords] = useState([])
    const [finnish, setFinnish] = useState('')
    const [english, setEnglish] = useState('')

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
                        <div>
                            <li key={word.id}>
                                {word.finnish_version} - {word.english_version} ({word.status === 1 ? 'Learned' : 'Not Learned'})
                            </li>
                            <button onClick={() => updateStatus(word.id, 1)}>Learn word</button>
                        </div>
                    ))
                    )}
            </ul>
        </>
    )
}

export default WordsList
