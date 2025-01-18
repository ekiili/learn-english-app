import React from 'react'

export const WordsList = ({ words }) => {
    return (
        <div className="words-list-wrapper">
            <h2>Words List</h2>
            <ul className='words-list'>
                {words.length === 0 ? (
                    <li>No words found.</li>
                ) : (
                    words.map((word) => (
                        <div className='words-list-element' key={word.id}>
                            <li>
                                <strong>{word.finnish_version} - {word.english_version}</strong>
                            </li>
                        </div>
                    ))
                )}
            </ul>
        </div>
    )
}
