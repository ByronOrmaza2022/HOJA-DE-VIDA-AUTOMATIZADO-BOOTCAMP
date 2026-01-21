import { useState } from "react";

export default function useModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const openModal = (payload = null) => {
    setData(payload);
    setOpen(true);
  };

  const closeModal = () => {
    setData(null);
    setOpen(false);
  };

  return {
    open,
    data,
    openModal,
    closeModal
  };
}
