"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function Providers({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && children}
    </>
  );
}