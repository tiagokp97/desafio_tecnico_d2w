import { configureStore } from '@reduxjs/toolkit';
import taskReducer from "../actions/task/taskSlice"

export const store = configureStore({
    reducer: {
        task: taskReducer,
    },
});
