import { writable } from "svelte/store";

const alertStore = () => {
    const { subscribe, set, update } = writable(null)

    return {
        subscribe,
        reset: () => set(null),

        success: (text, link) => set({ text, link, type: 'success' }),

        error: (text) => set({ text, type: 'error' })
    }
}
export const alert = alertStore()