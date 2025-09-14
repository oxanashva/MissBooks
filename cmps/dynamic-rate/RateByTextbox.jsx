

export function RateByTextbox({ name, value, handleInput }) {
    return (
        <textarea
            className="rate-by-textbox"
            name={name}
            value={value}
            minLength="1"
            maxLength="100"
            onChange={handleInput}
        />
    )
}