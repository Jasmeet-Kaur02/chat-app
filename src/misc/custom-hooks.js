import React, { useState } from "react";

export function useModalState(defaultVal = false) {
  const [isOpen, setOpen] = useState(defaultVal);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  return [isOpen, open, close];
}
