"use client";
import React from "react";
import { useLoading } from "@/contexts/LoadingContext";

const Loading = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loader-container w-100 d-flex align-items-center justify-content-center position-fixed" style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
