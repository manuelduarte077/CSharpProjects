import { create } from "zustand";

// Creamos un store con Zustand para gestionar el usuario seleccionado
export const useUserStore = create((set) => ({
  selectedUser: null, // Estado inicial: ningún usuario seleccionado
  setSelectedUser: (user) => set({ selectedUser: user }), // Función para actualizar el usuario seleccionado
}));
