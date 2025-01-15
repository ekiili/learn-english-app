export const getRandomWord = (words) => {
    // Pick a random word when words are available
    if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length)
        return words[randomIndex]
    }
    // Return null if no words are available (triggers the loading text to render)
    return null
}