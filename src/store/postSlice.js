import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload.$id)
            state.posts[index] = action.payload
        },
        deletePost: (state, action) => {
            const index = state.posts.findIndex(post => post.$id === action.payload)
            state.posts.splice(index, 1)
        },
        deleteAllPosts: (state) => {
            state.posts = []
        },

    }
})

export const { getPost, getAllPosts, addPost, updatePost, deletePost, deleteAllPosts } = postSlice.actions

export default postSlice.reducer