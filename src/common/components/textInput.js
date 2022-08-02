
import React from 'react'

const TextInput = ({ label, value, onChange }) => {
    return (
        <div>
            <p>{label}</p>
            <input value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

export default TextInput