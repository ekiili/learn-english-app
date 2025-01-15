import React, { useEffect, useState } from 'react'
import { getRandomWord } from './QuizLogic/getRandomWord'

export const Quiz = ({ words }) => {

    const [randomWord, setRandomWord] = useState(null)

    useEffect(() => {
        setRandomWord(getRandomWord(words))
    }, [words])

    return (
        <div className="quiz-wrapper">
            <h2>Translation Quiz</h2>

            {randomWord ? (
                <div className="quiz-item">
                    <strong className='random-word'>{randomWord.finnish_version}:</strong>

                    <input
                        type="text"
                        className="quiz-input"
                        placeholder="Type the English translation"
                    />
                </div>
            ) : (
                // Show loading message while randomWord is null
                <p>Loading quiz...</p>
            )}
        </div>
    )
}
