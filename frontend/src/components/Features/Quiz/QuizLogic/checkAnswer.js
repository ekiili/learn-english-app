import { updateStatus } from '../../../ApiConnections/UpdateStatus'

export const checkAnswer = (userAnswer, randomWord) => {
    if (!randomWord) return

    if (userAnswer.toLowerCase() === randomWord.english_version.toLowerCase()) {
        alert("Correct!")
        updateStatus(randomWord.id, 1)
        return
    } else {
        alert("Incorrect!")
        return
    }
}