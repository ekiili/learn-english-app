import React, { useEffect, useState } from 'react'
import { getRandomWord } from './QuizLogic/getRandomWord'
import { QuizTranslationInput } from './QuizTranslationInput'
import { QuizSubmitButton } from './QuizSubmitButton'
import { checkAnswer } from './QuizLogic/checkAnswer'

export const Quiz = ({ words }) => {

    const [randomWord, setRandomWord] = useState(null)
    const [userAnswer, setUserAnswer] = useState('')

    useEffect(() => {
        setRandomWord(getRandomWord(words))
    }, [words])

    const handleSubmit = () => {
        checkAnswer(userAnswer, randomWord)
    }

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
                    <QuizSubmitButton handleSubmit={handleSubmit} />
                </div>
            ) : (
                // Show loading message while randomWord is null
                <p>Loading quiz...</p>
            )}
        </div>
    )
}
