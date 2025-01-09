import React from 'react';

export const AdminLogin = ({ password, setAdmin }) => {
    return (
        <div className="admin-form-wrapper">
            <form className='admin-form'>
                <h3>Enter admin password to edit word list:</h3>
                <input
                    className='admin-password'
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        if (e.target.value === password) {
                            setAdmin(true)
                        }
                    }}
                />
            </form>
        </div>
    )
}