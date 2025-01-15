export const getShuffledWords = (words) => {
    if (words.length === 0) {
        console.error("Words array is empty and cant be shuffled")
        return words
    }
    // Shuffle algorithm
    for (let i = words.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))

        const tempWord = words[i]
        words[i] = words[randomIndex]
        words[randomIndex] = tempWord
    }
    return words
}