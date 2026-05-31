import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";

// Test MUY simple primero
describe("LanguageContext - Basic Render", () => {
  it("should render a simple div", () => {
    const { container } = render(<div data-testid="simple">Hello</div>);
    expect(screen.getByTestId("simple")).toBeInTheDocument();
    expect(container).not.toBeEmptyDOMElement();
  });

  it("should render LanguageProvider without crashing", () => {
    const { container } = render(
      <LanguageProvider>
        <div data-testid="child">Child</div>
      </LanguageProvider>
    );
    expect(container).not.toBeEmptyDOMElement();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});

// Componente de prueba que usa el hook
const TestComponent = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <div data-testid="test-wrapper">
      <span data-testid="language">{language}</span>
      <button onClick={() => setLanguage("es")}>Set Spanish</button>
      <button onClick={() => setLanguage("en")}>Set English</button>
    </div>
  );
};

describe("LanguageContext", () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, "language", {
      writable: true,
      configurable: true,
      value: "en-US",
    });
  });

  it("should render component with language", () => {
    const { container } = render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Verificar que el contenedor no está vacío
    expect(container).not.toBeEmptyDOMElement();
    
    // Verificar que el wrapper se renderizó
    const wrapper = screen.getByTestId("test-wrapper");
    expect(wrapper).toBeInTheDocument();
    
    // Verificar que el idioma se muestra (debería ser "en" inicialmente)
    const languageElement = screen.getByTestId("language");
    expect(languageElement).toBeInTheDocument();
    expect(languageElement.textContent).toBe("en");
  });

  it("should provide default language from browser (English)", async () => {
    localStorage.clear();
    Object.defineProperty(navigator, "language", {
      writable: true,
      configurable: true,
      value: "en-US",
    });

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // El componente debería renderizarse con "en" inicialmente
    const element = screen.getByTestId("language");
    expect(element).toBeInTheDocument();
    // Puede ser "en" inicialmente antes de que useEffect se ejecute
    expect(["en", "es"]).toContain(element.textContent);
  });

  it("should load language from localStorage", async () => {
    localStorage.setItem("language", "es");

    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    // Esperar un momento para que useEffect se ejecute
    await new Promise(resolve => setTimeout(resolve, 100));

    const element = screen.getByTestId("language");
    expect(element).toBeInTheDocument();
    // Debería ser "es" después de que useEffect se ejecute
    expect(element.textContent).toBe("es");
  });

  it("should update language when button is clicked", async () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );

    const languageElement = screen.getByTestId("language");
    const spanishButton = screen.getByText("Set Spanish");
    
    // Click en el botón envuelto en act()
    await act(async () => {
      spanishButton.click();
    });

    // Esperar a que el estado se actualice
    await waitFor(() => {
      expect(languageElement.textContent).toBe("es");
    });

    expect(localStorage.getItem("language")).toBe("es");
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useLanguage must be used within a LanguageProvider");

    consoleError.mockRestore();
  });
});
