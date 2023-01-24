import { writable, type Writable } from 'svelte/store';
export const storeSidebarOpen: Writable<boolean> = writable(true);
