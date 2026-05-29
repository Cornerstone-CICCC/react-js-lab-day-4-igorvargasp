import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export const usePostStore = create(
  persist(
    (set) => ({
      posts: [],
      
      addPost: (title, content) => set((state) => ({
        posts: [
          ...state.posts,
          {
            id: uuidv4(),
            title,
            content,
            isDeleted: false,
          },
        ],
      })),
      
      updatePost: (id, title, content) => set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, title, content } : post
        ),
      })),
      
      deletePost: (id) => set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, isDeleted: true } : post
        ),
      })),
      
      recoverPost: (id) => set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, isDeleted: false } : post
        ),
      })),
      
      permanentlyDeletePost: (id) => set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      })),
      
      getPost: (id, state) => state.posts.find((post) => post.id === id),
    }),
    {
      name: 'posts-store',
    }
  )
);
