import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [], // Initialize posts as an array
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload.$id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deleteOnePost: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload);
            if (index !== -1) {
                state.posts.splice(index, 1);
            }
        },
    
    }
});

export const { addPost, updatePost, deleteOnePost } = postSlice.actions;

export default postSlice.reducer;
