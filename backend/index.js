const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const cors = require('cors')
const PORT = 3000

app.use(cors())

// Initialize the SQLite database
const db = new sqlite3.Database('./words.db')

// Middleware to parse JSON bodies
app.use(express.json())

db.serialize(() => {
    // Create table if it doesnt exist
    db.run(`CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        finnish_version TEXT NOT NULL,
        english_version TEXT NOT NULL,
        status INTEGER DEFAULT 0 -- 0: not learned, 1: learned
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err)
        } else {
            console.log('Table created or already exists')
        }
    })

    // Check if the table has any words
    db.get("SELECT COUNT(*) as count FROM words", (err, row) => {
        if (err) {
            console.error('Error checking table contents:', err)
        } else if (row.count === 0) {
            // If table is empty, insert default words
            console.log('Table is empty, inserting default words')

            const defaultWords = [
                { finnish: 'kissa', english: 'cat' },
                { finnish: 'koira', english: 'dog' },
            ]

            const insertQuery = `INSERT INTO words (finnish_version, english_version, status) VALUES (?, ?, 0)` // Default status is 0 (not learned)
            defaultWords.forEach(word => {
                db.run(insertQuery, [word.finnish, word.english], (err) => {
                    if (err) {
                        console.error(`Error inserting ${word.finnish}:`, err.message)
                    } else {
                        console.log(`Inserted word: ${word.finnish} -> ${word.english}`)
                    }
                })
            })
        }
    })
})

// Route to get all words
app.get('/words', (req, res) => {
    const query = "SELECT * FROM words"
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json({
            message: "success",
            data: rows  // Data key for the array of words
        })
    })
})

// Route to add a new word
app.post('/words', (req, res) => {
    const { finnish_version, english_version } = req.body
    if (!finnish_version || !english_version) {
        return res.status(400).json({ error: "Finnish and English versions are required." })
    }

    const query = `INSERT INTO words (finnish_version, english_version, status) VALUES (?, ?, 0)` // Default status is 0 (not learned)
    const params = [finnish_version, english_version]
    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res.json({ message: "success" })
    })
})

// Route to update a word's status (0: not learned, 1: learned)
app.put('/words/:id/status', (req, res) => {
    const { status } = req.body
    const { id } = req.params

    if (!(status === 0 || status === 1)) {
        return res.status(400).json({ error: "Invalid status. Allowed values: 0 (not learned), 1 (learned)." })
    }

    const query = `UPDATE words SET status = ? WHERE id = ?`
    const params = [status, id]

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Word not found." })
        }
        res.json({ message: "success" })
    })
})

// Route to delete a word by ID
app.delete('/words/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM words WHERE id = ?`
    db.run(query, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Word not found." })
        }
        res.json({ message: "success" })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
