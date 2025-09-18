

export function RateByTextbox({ cmpType, name, value, handleInput }) {
    return (
        <textarea
            className="rate-by-textbox"
            id={cmpType}
            name={name}
            value={value}
            minLength="1"
            maxLength="100"
            onChange={handleInput}
        />
    )
}