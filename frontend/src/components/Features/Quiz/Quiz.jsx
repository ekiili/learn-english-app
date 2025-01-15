import React, { useEffect, useState } from 'react'
import { getRandomWord } from './QuizLogic/getRandomWord'
import { checkAnswer } from './QuizLogic/checkAnswer'
import { QuizTranslationInput } from './QuizTranslationInput'
import { QuizSubmitButton } from './QuizSubmitButton'
import { QuizNextWordButton } from './QuizNextWordButton'

export const Quiz = ({ words }) => {

    const [randomWord, setRandomWord] = useState(null)
    const [userAnswer, setUserAnswer] = useState("")

    useEffect(() => {
        getNextWord()
    }, [words])

    const handleSubmit = () => {
        checkAnswer(userAnswer, randomWord)
        setUserAnswer("")
    }

    const getNextWord = () => {
        setRandomWord(getRandomWord(words))
        setUserAnswer("")
    }

    const translationInputProps = {
        userAnswer,
        setUserAnswer
    }

    return (
        <div className='quiz-wrapper'>
            <h2>Translation Quiz</h2>

            {randomWord ? (
                <div className='quiz-element'>
                    <p className='random-word'>{randomWord.finnish_version}:</p>
                    <QuizTranslationInput {...translationInputProps} />
                    <QuizSubmitButton handleSubmit={handleSubmit} />
                    <QuizNextWordButton getNextWord={getNextWord} />
                </div>
            ) : (
                // Show loading message while randomWord is null
                <p>Loading quiz...</p>
            )}
        </div>
    )
}
