import React, { useEffect, useState } from 'react'
import { checkAnswer } from './QuizLogic/checkAnswer'
import { QuizTranslationInput } from './QuizTranslationInput'
import { QuizSubmitButton } from './QuizSubmitButton'
import { QuizNextWordButton } from './QuizNextWordButton'
import { getShuffledWords } from './QuizLogic/getShuffledWords'
import { QuizAnswerFeedback } from './QuizAnswerFeedback'

export const Quiz = ({ words }) => {

    const [shuffledWords, setShuffledWords] = useState([])
    const [currentWordIndex, setCurrentWordIndex] = useState(0)
    const [userAnswer, setUserAnswer] = useState("")
    const [answerStatus, setAnswerStatus] = useState(null)

    const currentWord = shuffledWords[currentWordIndex]
    // Set currentWord if shuffledWords is ready
    const correctAnswer = shuffledWords.length > 0 ? currentWord.english_version : null

    useEffect(() => {
        // Shuffle words when words is ready
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
        setAnswerStatus(null)
    }

    const handleSubmit = () => {
        setAnswerStatus(checkAnswer(userAnswer, currentWord))
        setUserAnswer("")
    }

    const translationInputProps = {
        userAnswer,
        setUserAnswer
    }

    const answerFeedbackProps = {
        answerStatus,
        correctAnswer
    }

    return (
        <div className='quiz-wrapper'>
            <h2>Quiz</h2>

            {shuffledWords.length > 0 ? (
                <div className='quiz-element'>
                    <p className='random-word'>{currentWord.finnish_version}:</p>
                    <QuizTranslationInput {...translationInputProps} />
                    <QuizAnswerFeedback {...answerFeedbackProps} />
                    <QuizSubmitButton handleSubmit={handleSubmit} />
                    <QuizNextWordButton getNextWord={getNextWord} />
                </div>
            ) : (
                <p>No words available</p>
            )}
        </div>
    )
}
