import React, { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminAddWord } from './AdminAddWord'
import { AdminDeleteWord } from './AdminDeleteWord'
import { WordsList } from '../Features/WordsList'

// import { AdminResetButton } from './AdminResetButton'

export const AdminPage = ({ setWords, words, finnish, setFinnish,
    english, setEnglish }) => {

    const password = "admin"
    const [admin, setAdmin] = useState(false)

    const adminAddWordProps = {
        finnish,
        setFinnish,
        english,
        setEnglish,
        setWords
    }

    const adminResetButtonProps = { setWords }

    const adminDeleteWordProps = {
        setWords,
        words
    }

    const wordsListProps = { words }

    return (
        <div className="admin-page">
            {!admin ? <AdminLogin password={password} setAdmin={setAdmin} />
                : null}

            {/* If admin is logged in, display the admin functions */}
            {admin ? (
                <div className="admin-wrapper">
                    {/*<AdminResetButton {...adminResetButtonProps} />*/}
                    <AdminAddWord {...adminAddWordProps} />
                    <AdminDeleteWord {...adminDeleteWordProps} />
                    <WordsList {...wordsListProps} />
                </div>
            ) : null}
        </div>
    )
}
