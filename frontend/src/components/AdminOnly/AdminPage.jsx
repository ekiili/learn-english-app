import React, { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminAddWord } from './AdminAddWord'
import { AdminDeleteWord } from './AdminDeleteWord'
import { WordsList } from '../Features/WordsList'

// import { AdminResetButton } from './AdminResetButton'

export const AdminPage = ({ setWords, words }) => {

    const password = "admin"
    const [admin, setAdmin] = useState(false)
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
                    <AdminAddWord setWords={setWords} />
                    <AdminDeleteWord {...adminDeleteWordProps} />
                    <WordsList {...wordsListProps} />
                </div>
            ) : null}
        </div>
    )
}
