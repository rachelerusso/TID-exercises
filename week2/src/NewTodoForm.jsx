function NewTodoForm({ onAdd }) {
    const [text, setText] = useState("");

function handleSubmit(e) {
    e.preventDefault();
    onAdd(text);
    setText("");
}
    return (<form onSubmit={handleSubmit}> </form>);
}