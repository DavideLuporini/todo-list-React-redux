import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { sys } from "typescript";
import { RootState } from "../../app/store";
import { findUnvalidTodo, updateCompleted } from "../../client/client";
import { filterArrayXTag } from "../../utils/FilterXTag";
import { Visibility } from "../Filters/Filters";
import { Todo } from "./Todo";

interface Categories {
  categoryName: string;
  id: string;
  color: string;
}

interface TodosState {
  todos: Todo[];
  currentId: number;
  loading: boolean;
  categories: Categories[];
}

export const fetchCategories: any = createAsyncThunk(
  "todos/fetchCategories",
  async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer -jRruvA3CsxCUxk7wyucX_3wKv5EuAXQEZdVCw8WREY"
    );
    myHeaders.append("Content-Type", "application/json");

    let graphql = JSON.stringify({
      query:
        "\r\nquery{\r\n  tagCollection {\r\n    items{\r\n      categoryName\r\n  color\r\n     sys{\r\n        id\r\n      }\r\n    }\r\n  }\r\n}",
    });
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };
    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/q0yf94d7v33c/environments/master",
      requestOptions
    );
    return await response.json();
  }
);
export const fetchTodos: any = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer kR495deqUK8aKMDNTb_BiIAE5kBW19uLGVQPyz-lr1E"
    );
    myHeaders.append("Content-Type", "application/json");

    let graphql = JSON.stringify({
      query:
        "query{\r\n  productCollection(limit:30){\r\n    items{\r\n      productName\r\n      productDescription\r\n      price\r\n      categoriesCollection{\r\n        items{\r\n          title\r\n          icon{\r\n            url\r\n          }\r\n          \r\n        }\r\n      }\r\n      imageCollection{\r\n        items{\r\n          url\r\n        }\r\n      }\r\n      amountPerSize\r\n    }\r\n  }\r\n}",
    });
    let requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: graphql,
      redirect: "follow",
    };
    const response = await fetch(
      "https://graphql.contentful.com/content/v1/spaces/q0yf94d7v33c/environments/master",
      requestOptions
    );
    return await response.json();
  }
);

const initialState: TodosState = {
  todos: [],
  currentId: 1,
  loading: false,
  categories: [],
};

const getFilteredTodosXVisibility = (visibility: Visibility, todos: Todo[]) => {
  return visibility === Visibility.ALL
    ? todos
    : todos.filter((todo) =>
        visibility === Visibility.NOT_DONE ? todo.completed : !todo.completed
      );
};

const getFilteredTodosXSearchText = (search: string, todos: Todo[]) => {
  return search === ""
    ? todos
    : todos.filter((todo: Todo) => todo.text.includes(search));
};
export const getFilteredTodosXTag = (tag: any, todos: Todo[]) => {
  return tag.length === 0 ? todos : filterArrayXTag(tag, todos);
  //todos.filter((todo: Todo) => todo.tag === tag);
};

function sortArray(todos: any) {
  let finalArray = [];
  let newArrayCompleted = todos
    .filter((a: any) => a.completed)
    .sort((a: any, b: any) => b.sys.id - a.sys.id);
  let newArrayUncompleted = todos
    .filter((a: any) => !a.completed)
    .sort((a: any, b: any) => b.sys.id - a.sys.id);

  finalArray = [...newArrayUncompleted, ...newArrayCompleted];
  return finalArray;
}

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<any>) {
      const todo: Todo = {
        text: action.payload.text,
        completed: false,
        sys: action.payload.sys,
        tag: action.payload.tag,
      };
      state.currentId++;
      state.todos.push(todo);
    },

    removeTodo(state, action: PayloadAction<number>) {
      const indexOfObject = state.todos.findIndex((object: any) => {
        return object.sys.id === action.payload;
      });

      state.todos.splice(indexOfObject, 1);
    },

    editTodo(state, action: PayloadAction<any>) {
      const indexOfObject = state.todos.findIndex((object: any) => {
        return object.sys.id === action.payload.sys.id;
      });
      state.todos[indexOfObject] = {
        text: action.payload.text,
        completed: action.payload.completed,
        sys: action.payload.sys,
        tag: action.payload.tag,
      };
    },

    toggleCompleted(state, action: PayloadAction<number>) {
      const indexOfObject = state.todos.findIndex((object: any) => {
        return object.sys.id === action.payload;
      });
      state.todos[indexOfObject].completed =
        !state.todos[indexOfObject].completed;
      updateCompleted(action.payload, state.todos[indexOfObject].completed);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      if (action.payload.data.todoCollection) {
        let item = action.payload.data.todoCollection.items;
        let realArray = findUnvalidTodo(item);
        state.loading = false;
        state.todos = realArray;
      } else {
        state.loading = false;
        state.todos = [];
      }
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchCategories.pending, (state) => {});
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      let item = action.payload.data.tagCollection.items;
      state.categories = item;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      console.log(action.payload.error);
    });
  },
});
export const { addTodo, removeTodo, toggleCompleted, editTodo } =
  todosSlice.actions;
export default todosSlice.reducer;

export const getFilteredTodos = createSelector(
  (state: RootState) => state.todo.todos,
  (state: RootState) => state.filters.visibility,
  (state: RootState) => state.filters.searchText,
  (state: RootState) => state.filters.categories,

  (todos, visibility, search, categories) => {
    let filteredTodos = getFilteredTodosXVisibility(visibility, todos);
    filteredTodos = getFilteredTodosXSearchText(search, filteredTodos);
    filteredTodos = getFilteredTodosXTag(categories, filteredTodos);
    // filteredTodos = sortArray(filteredTodos);
    return filteredTodos;
  }
);
