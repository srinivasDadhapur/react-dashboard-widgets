function Sri({ name, onEvent }) {
    const handleClick = () => {
        onEvent(name);
    }
    return (
        <>
           <input type="checkbox" value={name}  onChange={handleClick} />
        </>
    )
}
export default Sri
