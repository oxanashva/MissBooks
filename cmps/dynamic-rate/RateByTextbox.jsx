

export function RateByTextbox({ name, handleInput }) {
    return (
        <textarea className="rate-by-textbox" name={name} minLength="1" maxLength="100" onChange={handleInput} />
    )
}