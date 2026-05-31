"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { InfoPageResponse } from "@/interfaces/resume";
import { getInfoPage } from "@/api";
import { useLanguage } from "./LanguageContext";

interface ResumeContextType {
  data: InfoPageResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<InfoPageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { language } = useLanguage();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getInfoPage();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error loading resume data"));
      console.error("Error fetching resume data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ResumeContext.Provider value={{ data, loading, error, refetch: fetchData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
