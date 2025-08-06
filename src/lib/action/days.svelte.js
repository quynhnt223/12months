import { schema } from "$lib/schema.js";

class Days {
  data = $state(schema);

  add(text) {
    if (typeof text !== "string") return;
    text = text.trim();
    if (!text) return;

    this.data.todos.push({
      id: Date.now(),
      text,
      completed: false,
      editing: false,
      date: new Date().toISOString(),
    });
  }

  remove(id) {
    this.data.todos = this.data.todos.filter((todo) => todo.id !== id);
  }

  edit(id) {
    const todo = this.data.todos.find((t) => t.id === id);
    if (todo) todo.editing = true;
  }

  stopEditing(id) {
    const todo = this.data.todos.find((t) => t.id === id);
    if (todo) {
      todo.text = todo.text.trim();
      todo.editing = false;
    }
  }
}
export const days = new Days();
