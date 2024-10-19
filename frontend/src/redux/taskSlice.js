import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tasksAPI = import.meta.env.VITE_TASKS_ENDPOINT;

const initialState = {
  tasks: [],
  filter: "all",
  searchQuery: "",
  form:"hidden",
  taskToEdit:null,
  loading:false,
  error:"",
  status:200,
};
export const getTasks = createAsyncThunk('tasks/getTasks',async (token,thunkAPI)=>{
  try{
    const tasks = await axios({
      method: "get",
      headers: {
        Authorization:token,
      },
      url: tasksAPI,
    });
    console.log(tasks)
    return tasks.data.data;
  } catch(error){
    console.log(error);
    return thunkAPI.rejectWithValue(
      error
    );
  }
});

export const addTaskAPI = createAsyncThunk('tasks/addTaskAPI',async ({token,addtask},thunkAPI)=>{
    console.log(addtask); 
    try{
      const res = await axios({
        method: "post",
        headers:{
          Authorization:token
        },
        url: tasksAPI,
        data:addtask
      });
      const task = res.data.data;
      console.log(task);
      return task;
    }catch(error){
      return thunkAPI.rejectWithValue(
        error
      );
    }
});
export const updateTaskAPI = createAsyncThunk('tasks/updateTaskAPI',async ({token,updatedTask},thunkAPI)=>{
    try{
      const res = await axios({
      method: "put",
      headers:{
        Authorization:token
      },
      url: `${tasksAPI}/${updatedTask._id}`,
      data:updatedTask
    });
    const task = res.data.newTask;
    console.log(task);
    return task;
  }catch(error){
    return thunkAPI.rejectWithValue(
      error
    );
  }
});
export const deleteTaskAPI = createAsyncThunk('tasks/deleteTaskAPI',async ({token,_id},thunkAPI)=>{
    try{
      const res = await axios({
        method: "delete",
        headers:{
          Authorization:token
        },
        url: `${tasksAPI}/${_id}`,
      });
      const task = res.data.deletedTask;
      console.log(task);
      return task;
    }catch(error){
      return thunkAPI.rejectWithValue(
        error
      );
    }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setUpdateTask: (state, action) => {
      state.taskToEdit = action.payload;
    },
    displayForm:(state)=>{
      state.form = "fixed";
    },
    hideForm:(state)=>{
      state.form = 'hidden';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 200;
        state.tasks = action.payload;
        state.loading = false;
        state.error = "";
      })
      
      .addCase(updateTaskAPI.fulfilled,(state,action)=>{
        console.log("Task Added To The Array")
        state.taskToEdit = null;
        state.tasks = [...state.tasks.map((task) => task._id == action.payload._id ? action.payload:task)];
        console.log(state.tasks);
      })
      .addCase(deleteTaskAPI.fulfilled,(state,action)=>{
        console.log("Task Deleted From The Array")
        state.tasks = [...state.tasks.filter((task) => task._id != action.payload._id )];
        console.log(state.tasks);
      })
      .addCase(addTaskAPI.fulfilled,(state,action)=>{
        console.log("Task Added To The Array")
        state.tasks.push(action.payload);
      })

  }
});
// Export all necessary actions
export const { setTasks, setFilter, setSearchQuery, setUpdateTask,displayForm,hideForm } = tasksSlice.actions;
export default tasksSlice.reducer;
