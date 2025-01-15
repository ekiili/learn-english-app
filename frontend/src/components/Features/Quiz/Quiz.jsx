import React, { useEffect, useState } from 'react'
import { getRandomWord } from './QuizLogic/getRandomWord'
import { QuizTranslationInput } from './QuizTranslationInput'

export const Quiz = ({ words }) => {

    const [randomWord, setRandomWord] = useState(null)
    const [userAnswer, setUserAnswer] = useState('')


    useEffect(() => {
        setRandomWord(getRandomWord(words))
    }, [words])

    const translationInputProps = {
        userAnswer,
        setUserAnswer
    }

    return (
        <div className="quiz-wrapper">
            <h2>Translation Quiz</h2>

            {randomWord ? (
                <div className='quiz-element'>
                    <p className='random-word'>{randomWord.finnish_version}:</p>
                    <QuizTranslationInput {...translationInputProps} />
                </div>
            ) : (
                // Show loading message while randomWord is null
                <p>Loading quiz...</p>
            )}
        </div>
    )
}
