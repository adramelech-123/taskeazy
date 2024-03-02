import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./models/model";
import { useState } from "react";


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("")
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination} = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add
    const active = todos 
    const complete = completedTodos  

    // Source Logic
    if(source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }


    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete)
    setTodos(active)

  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TaskEazy</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
