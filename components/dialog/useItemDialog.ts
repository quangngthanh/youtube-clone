import { useState } from "react";

export function useItemDialog<T>() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    
    const openWith = (item: T) => {
      setSelectedItem(item);
      setIsOpen(true);
    };
    
    const close = () => {
      setIsOpen(false);
      setSelectedItem(null);
    };
    
    return {
      isOpen,
      selectedItem,
      openWith,
      close,
      onOpenChange: (open: boolean) => {
        if (!open) close();
      }
    };
  }
  