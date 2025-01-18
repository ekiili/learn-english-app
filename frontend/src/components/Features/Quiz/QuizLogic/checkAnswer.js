import { updateStatus } from '../../../ApiConnections/UpdateStatus'

export const checkAnswer = (userAnswer, randomWord) => {
    if (!randomWord) return null

    if (userAnswer.toLowerCase() === randomWord.english_version.toLowerCase()) {
        updateStatus(randomWord.id, 1)
        return true
    } else {
        return false
    }
}