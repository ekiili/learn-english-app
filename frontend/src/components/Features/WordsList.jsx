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
                        <div key={word.id}>
                            <li>
                                <strong>{word.finnish_version}:</strong>
                            </li>

                            {/* If the word is learned (status is 1), display the correct translation */}
                            {word.status === 1 ? (
                                <p className='correct-translation'>
                                    <strong>Correct Translation:</strong> {word.english_version}
                                </p>
                            ) : (
                                <p>Status: Not Learned</p>
                            )}
                        </div>
                    ))
                )}
            </ul>
        </div>
    )
}
