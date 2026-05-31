import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import Experience from "@/components/Experience";
import { ResumeProvider } from "@/contexts/ResumeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Experience as ExperienceType } from "@/interfaces/resume";

// Mock the API before importing
jest.mock("@/api", () => ({
  getInfoPage: jest.fn(),
  downloadCurriculumPdf: jest.fn(),
  sendContactMessage: jest.fn(),
}));

import { getInfoPage } from "@/api";

const mockExperienceData: ExperienceType[] = [
  {
    id: 1,
    yearStart: "2020-01-01",
    yearEnd: "2023-12-31",
    company: "Tech Corp",
    location: "Bogotá",
    locationEng: "Bogota",
    position: "Desarrollador Senior",
    positionEng: "Senior Developer",
    summary: "<p>Desarrollé aplicaciones web complejas.</p>",
    summaryEng: "<p>Developed complex web applications.</p>",
    summaryPdf: "",
    summaryPdfEng: "",
    descriptionItemsPdf: [],
    descriptionItemsPdfEng: [],
    skillSons: [
      { id: 1, name: "React", nameEng: "React" },
      { id: 2, name: "TypeScript", nameEng: "TypeScript" },
    ],
  },
];

const mockResumeData = {
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
  experiences: mockExperienceData,
  educations: [],
};

describe("Experience Component", () => {
  jest.setTimeout(15000);

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    Object.defineProperty(navigator, "language", {
      writable: true,
      configurable: true,
      value: "es-ES",
    });
    (getInfoPage as jest.Mock).mockResolvedValue(mockResumeData);
  });

  const renderWithProviders = (language: "en" | "es" = "es") => {
    Object.defineProperty(navigator, "language", {
      writable: true,
      configurable: true,
      value: language === "es" ? "es-ES" : "en-US",
    });
    
    return render(
      <LanguageProvider>
        <ResumeProvider>
          <Experience />
        </ResumeProvider>
      </LanguageProvider>
    );
  };

  it("should render experience items", async () => {
    renderWithProviders();
    
    await waitFor(() => {
      expect(screen.getByText(/Tech Corp/i)).toBeInTheDocument();
    }, { timeout: 15000 });
  });

  it("should display skills section when skillSons exist", async () => {
    renderWithProviders("es");
    
    // Wait for data to load and component to render
    await waitFor(() => {
      expect(screen.getByText(/Habilidades:/i)).toBeInTheDocument();
    }, { timeout: 15000 });
    expect(screen.getByText(/React y TypeScript/i)).toBeInTheDocument();
  });

  it("should format date range correctly", async () => {
    renderWithProviders("es");
    
    // Wait for data to load and component to render
    await waitFor(() => {
      expect(screen.getByText(/Enero 2020 - Diciembre 2023/i)).toBeInTheDocument();
    }, { timeout: 15000 });
  });
});
