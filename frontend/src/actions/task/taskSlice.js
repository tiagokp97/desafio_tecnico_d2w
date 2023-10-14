import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { firstRender } from "../../api/ItemApi";

export const loadItemsThunk = createAsyncThunk('task/loadItems', async (_, { dispatch }) => {
    try {
        const data = await firstRender();
        dispatch(loadInitialItems(data));
    } catch (error) {
        console.error('Error loading items:', error);
    }
});

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        allItems: [],
        completedItems: [],
        incompletedItems: [],
        originalCompletedItems: [],
        originalIncompletedItems: [],
        searchTerm: ''
    },
    reducers: {
        addTask: (state, action) => {
            state.allItems.push(action.payload);
            if (action.payload.completed === 1) {
                state.completedItems.push(action.payload);
            } else {
                state.incompletedItems.push(action.payload);
            }
        },
        updateSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        removeTask: (state, action) => {
            state.allItems = state.allItems.filter((item) => item.id !== action.payload.id);
            state.completedItems = state.completedItems.filter((item) => item.id !== action.payload.id);
            state.incompletedItems = state.incompletedItems.filter((item) => item.id !== action.payload.id);
        },
        loadInitialItems: (state, action) => {
            if (state.searchTerm) {
                state.completedItems = action.payload.filter((item) =>
                    item.completed === 1 && item.title.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
                state.incompletedItems = action.payload.filter((item) =>
                    item.completed === 0 && item.title.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            } else {
                state.allItems = action.payload;
                state.completedItems = action.payload.filter((item) => item.completed === 1);
                state.incompletedItems = action.payload.filter((item) => item.completed === 0);
                state.originalCompletedItems = [...state.completedItems];
                state.originalIncompletedItems = [...state.incompletedItems];
            }
        },
        filterItems: (state, action) => {
            const searchTerm = action.payload.toLowerCase();
            state.completedItems = state.originalCompletedItems.filter(item =>
                item.title.toLowerCase().includes(searchTerm)
            );

            state.incompletedItems = state.originalIncompletedItems.filter(item =>
                item.title.toLowerCase().includes(searchTerm)
            );
        },
        extraReducers: (builder) => {
            builder.addCase(loadItemsThunk.fulfilled, (state, action) => {
            });
        },
    },
});
export const { addTask, removeTask, loadInitialItems, filterItems, updateSearchTerm } = taskSlice.actions;
export default taskSlice.reducer;

