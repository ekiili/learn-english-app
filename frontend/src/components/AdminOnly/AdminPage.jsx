import React, { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminAddWord } from './AdminAddWord'
import { AdminResetButton } from './AdminResetButton'
import { AdminDeleteWord } from './AdminDeleteWord'

export const AdminPage = ({ setWords, words, finnish, setFinnish,
    english, setEnglish, handleAddWord }) => {

    const password = "admin"
    const [admin, setAdmin] = useState(false)

    const adminAddWordProps = {
        finnish,
        setFinnish,
        english,
        setEnglish,
        handleAddWord
    }

    const adminResetButtonProps = { setWords }

    const adminDeleteWordProps = {
        setWords,
        words
    }

    return (
        <div className="admin-page">
            {!admin ? <AdminLogin password={password} setAdmin={setAdmin} />
                : null}

            {/* If admin is logged in, display the admin functions */}
            {admin ? (
                <div className="admin-wrapper">
                    <AdminResetButton {...adminResetButtonProps} />
                    <AdminAddWord {...adminAddWordProps} />
                    <AdminDeleteWord {...adminDeleteWordProps} />
                </div>
            ) : null}
        </div>
    )
}
