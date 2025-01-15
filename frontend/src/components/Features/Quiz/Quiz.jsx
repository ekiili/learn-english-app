import React, { useEffect, useState } from 'react'
import { checkAnswer } from './QuizLogic/checkAnswer'
import { QuizTranslationInput } from './QuizTranslationInput'
import { QuizSubmitButton } from './QuizSubmitButton'
import { QuizNextWordButton } from './QuizNextWordButton'
import { getShuffledWords } from './QuizLogic/getShuffledWords'

export const Quiz = ({ words }) => {

    const [shuffledWords, setShuffledWords] = useState([])
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    const currentWord = shuffledWords[currentWordIndex]

    useEffect(() => {
        if (words.length > 0) {
            const shuffled = getShuffledWords(words)
            setShuffledWords(shuffled)
            setCurrentWordIndex(0)
        }
    }, [words])

    const getNextWord = () => {
        const nextIndex = currentWordIndex + 1
        if (nextIndex < shuffledWords.length) {
            setCurrentWordIndex(nextIndex)
        } else setCurrentWordIndex(0)
        setUserAnswer("")
    }

    const handleSubmit = () => {
        checkAnswer(userAnswer, currentWord)
        setUserAnswer("")
    }

    const translationInputProps = {
        userAnswer,
        setUserAnswer
    }

    return (
        <div className='quiz-wrapper'>
            <h2>Translation Quiz</h2>

            {shuffledWords.length > 0 ? (
                <div className='quiz-element'>
                    <p className='random-word'>{currentWord.finnish_version}:</p>
                    <QuizTranslationInput {...translationInputProps} />
                    <QuizSubmitButton handleSubmit={handleSubmit} />
                    <QuizNextWordButton getNextWord={getNextWord} />
                </div>
            ) : (
                <p>No words available</p>
            )}
        </div>
    )
}
