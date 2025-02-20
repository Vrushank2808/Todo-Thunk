import { createSlice } from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        status: "idle",
        filter: "all",
        searchTerm: "",
        error: null
    },
    reducers: {
        addTodoStart: (state) => {
            state.status = "loading";
            state.error = null;
        },
        addTodoSuccess: (state, action) => {
            state.status = "success";
            state.todos.push(action.payload);
        },
        addTodoError: (state, action) => {
            state.status = "idle";
            state.error = action.payload;
        },
        toggleTodoSuccess: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setfilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    }
})

export const { addTodoStart, addTodoSuccess, addTodoError, toggleTodoSuccess, setfilter, setSearchTerm, clearError } = todoSlice.actions;

export const addTodo = (text) => (dispatch) =>{
    if(!text.trim()){
        return dispatch(addTodoError("Todo cannot be empty"));
    }
    dispatch(addTodoStart());
    try{
        dispatch(addTodoSuccess({
            id: Date.now(),
            text,
            completed: false
        }))
    }catch(error){
        dispatch(addTodoError(error.message));
    }
}

export const toggleTodo = (id) => (dispatch) => {
    dispatch(toggleTodoSuccess(id));
}

export const settodoFilter = (filter) => (dispatch) => {
    dispatch(setfilter(filter));
}

export const searchTodo = (term) => (dispatch) => {
    dispatch(setSearchTerm(term));
}

export default todoSlice.reducer;