"use client";

import { useEffect, useState } from "react";

export default function useRem() {
  const [rem, setRem] = useState(16);

  useEffect(() => {
    const read = () =>
      setRem(parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  return rem;
}