import { create } from 'zustand';

interface CreateCollectionStore {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

const useCreateCollectionStore = create<CreateCollectionStore>((set) => ({
    open: false,
    onOpenChange: (isOpen: boolean) => set({ open: isOpen })
}))

export { useCreateCollectionStore };