import "./App.css";
import Home from "./pages/Todos/Todos";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./app/store";
import {
  createTodoInContentfull,
  getEntriesByContentType,
} from "./client/client";
import { fetchCategories, fetchTodos } from "./features/Todo/todosSlice";

function App() {
  const view = useSelector((state: RootState) => state.app.viewMode);
  const dispatch = useDispatch();
  dispatch(fetchTodos());
  dispatch(fetchCategories());

  return (
    <div className={`App ${view}`}>
      <header className="App-header">
        <Home />
      </header>
      <div className={`blur ${view}`}></div>
    </div>
  );
}

export default App;
