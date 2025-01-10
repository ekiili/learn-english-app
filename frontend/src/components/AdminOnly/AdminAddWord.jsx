import React from 'react';

export const AdminAddWord = ({ finnish, setFinnish, english, setEnglish, handleAddWord }) => {
    return (
        <div className="add-word-wrapper">
            <h2>Add a new word</h2>
            <form onSubmit={handleAddWord}>
                <input
                    type="text"
                    placeholder="Finnish word"
                    value={finnish}
                    onChange={(e) => setFinnish(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="English translation"
                    value={english}
                    onChange={(e) => setEnglish(e.target.value)}
                />
                <button className='add-word-button btn' type="submit">Add Word</button>
            </form>
        </div>
    )
}