import React from 'react'

export const QuizNextWordButton = ({ getNextWord }) => {
    return (
        <button className="quiz-next-word-button" onClick={getNextWord}>
            Next Word
        </button>
    )
}
