import { defineStore } from 'pinia';

export interface UiState {
  isSidebarOpen: boolean;
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    isSidebarOpen: false,
  }),
  getters: {},
  actions: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    openSidebar() {
      if (this.isSidebarOpen) return;
      this.isSidebarOpen = true;
    },
    closeSidebar() {
      if (!this.isSidebarOpen) return;
      this.isSidebarOpen = false;
    },
  },
});
