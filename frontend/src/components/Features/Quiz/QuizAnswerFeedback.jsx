import React from 'react'

export const QuizAnswerFeedback = ({ answerStatus, correctAnswer }) => {
    if (answerStatus === null) {
        return <p className='invis-text'>invisible text</p>
    }

    if (answerStatus === true) {
        return <strong className='quiz-correct-answer-text'>Correct answer!</strong>
    }

    if (answerStatus === false) {
        return <strong className='quiz-wrong-answer-text'>Incorrect! The answer is: {correctAnswer}</strong>
    }
}
