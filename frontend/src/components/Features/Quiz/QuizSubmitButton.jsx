import React from 'react'

export const QuizSubmitButton = ({ handleSubmit }) => {
    return (
        <button className="quiz-submit-button" onClick={handleSubmit}>
            Submit Answer
        </button>
    )
}
