import Parse from "parse";

const TodoItem = Parse.Object.extend("TodoItem");

function toPlainObject(parseObject) {
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    done: parseObject.get("done"),
  };
}

export async function fetchTodos() {
  const query = new Parse.Query(TodoItem);
  query.ascending("createdAt");
  const results = await query.find();
  return results.map(toPlainObject);
}

export async function createTodo(text) {
  const item = new TodoItem();
  item.set("text", text);
  item.set("done", false);
  return toPlainObject(await item.save());
}

export async function setTodoDone(id, done) {
  //we have the id, so we don't need to fetch the object before changing it
  const item = TodoItem.createWithoutData(id);
  item.set("done", done);
  return toPlainObject(await item.save());
}

export async function deleteTodo(id) {
  const item = TodoItem.createWithoutData(id);
  await item.destroy();
}
