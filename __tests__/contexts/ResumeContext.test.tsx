import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { ResumeProvider, useResume } from "@/contexts/ResumeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getInfoPage } from "@/api";
import { InfoPageResponse } from "@/interfaces/resume";

// Mock the API
jest.mock("@/api", () => ({
  getInfoPage: jest.fn(),
}));

// Componente de prueba que usa el hook
const TestComponent = () => {
  const { data, loading, error } = useResume();
  
  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error.message}</div>;
  if (data) return <div data-testid="data">{data.basicData?.firstName || "No firstName"}</div>;
  
  return <div data-testid="no-data">No data</div>;
};

const mockResumeData: InfoPageResponse = {
  home: {
    id: 1,
    greeting: "Hola",
    greetingEng: "Hello",
    imageUrl: { id: 1, name: "test", nameEng: "test", url: "test.jpg" },
    buttonWorkLabel: "Ver trabajo",
    buttonWorkLabelEng: "View work",
    buttonContactLabel: "Contactar",
    buttonContactLabelEng: "Contact",
    labels: [],
  },
  basicData: {
    id: 1,
    firstName: "Test",
    othersName: "",
    firstSurName: "User",
    othersSurName: "",
    dateBirth: "1990-01-01",
    located: "Bogotá",
    locatedEng: "Bogota",
    startWorkingDate: "2010-01-01",
    greeting: "Hola",
    greetingEng: "Hello",
    email: "test@test.com",
    instagram: "",
    linkedin: "",
    x: "",
    github: "",
    description: "Test",
    descriptionEng: "Test",
    descriptionPdf: [],
    descriptionPdfEng: [],
    wrapper: [],
    wrapperEng: [],
  },
  skills: [],
  experiences: [],
  educations: [],
};

describe("ResumeContext", () => {
  jest.setTimeout(15000);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state initially", async () => {
    (getInfoPage as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    render(
      <LanguageProvider>
        <ResumeProvider>
          <TestComponent />
        </ResumeProvider>
      </LanguageProvider>
    );

    // Esperar a que el componente se renderice
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toBeInTheDocument();
    });
  });

  it("should fetch and display data", async () => {
    (getInfoPage as jest.Mock).mockResolvedValue(mockResumeData);

    render(
      <LanguageProvider>
        <ResumeProvider>
          <TestComponent />
        </ResumeProvider>
      </LanguageProvider>
    );

    // Wait for data to load (component starts with loading, then shows data)
    await waitFor(() => {
      expect(screen.getByTestId("data")).toBeInTheDocument();
      expect(screen.getByTestId("data")).toHaveTextContent("Test");
    }, { timeout: 10000 });

    expect(getInfoPage).toHaveBeenCalledTimes(1);
  });

  it("should handle errors", async () => {
    const errorMessage = "Failed to fetch";
    (getInfoPage as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(
      <LanguageProvider>
        <ResumeProvider>
          <TestComponent />
        </ResumeProvider>
      </LanguageProvider>
    );

    // Wait for error to be displayed (component starts with loading, then shows error)
    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
      expect(screen.getByTestId("error")).toHaveTextContent(errorMessage);
    }, { timeout: 10000 });
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useResume must be used within a ResumeProvider");

    consoleError.mockRestore();
  });
});
