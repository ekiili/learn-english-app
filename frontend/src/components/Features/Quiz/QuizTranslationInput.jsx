import React from "react"

export const QuizTranslationInput = ({ userAnswer, setUserAnswer }) => {
    return (
        <div className="quiz-translation-input">
            <input
                type="text"
                placeholder="Type the English translation"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
            />
        </div>
    )
}