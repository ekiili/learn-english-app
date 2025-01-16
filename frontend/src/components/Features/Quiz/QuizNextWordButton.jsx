import React from 'react'

export const QuizNextWordButton = ({ getNextWord }) => {
    return (
        <button className="quiz-next-word-button btn" onClick={getNextWord}>
            Next Word
        </button>
    )
}
