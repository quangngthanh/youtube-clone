import { useState } from "react";

export function useDialog() {
    const [isOpen, setIsOpen] = useState(false);
    
    return {
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      onOpenChange: setIsOpen
    };
  }