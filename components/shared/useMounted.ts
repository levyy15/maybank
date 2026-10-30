import { useEffect, useState } from 'react';

// Swiper uses Date.now() internally, so render it only after mounting in the browser
export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}