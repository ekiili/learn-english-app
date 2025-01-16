import React from 'react'

export const QuizSubmitButton = ({ handleSubmit }) => {
    return (
        <button className="quiz-submit-button btn" onClick={handleSubmit}>
            Submit Answer
        </button>
    )
}
