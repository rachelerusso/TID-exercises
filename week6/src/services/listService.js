//this file is what connect the lists UI in the database
import Parse from "parse";

const List = Parse.Object.extend("List"); //List is the table name in the DB

//NB we need to convert parse object into js object to be understandable by the program. to do so
//I take the parse object from the db owner
function toPlainObject(parseObject) {
  const owner = parseObject.get("owner");

  return {
    id: parseObject.id,
    name: parseObject.get("name"),
    owner: owner ? owner.id : null, //the owner in line 10 is the same owner dopo : quello prima dei : è js
  };
}

export async function createList(name) {
  const list = new List();
  const user = Parse.User.current();

  list.set("name", name);
  list.set("owner", user);
  list.setACL(new Parse.ACL(user));

  return await list.save();
}

export async function fetchLists() {
  const query = new Parse.Query(List);
  query.equalTo("owner", Parse.User.current());

  return await query.find();
}
