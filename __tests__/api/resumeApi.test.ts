import { getInfoPage, getCurriculumPdf, downloadCurriculumPdf } from "@/api/resumeApi";
import { InfoPageResponse } from "@/interfaces/resume";

// Mock fetch
global.fetch = jest.fn();

describe("resumeApi", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_RESUME_API_BASE_URL = "http://localhost:8080/v1/ms-resume";
  });

  describe("getInfoPage", () => {
    it("should fetch and return info page data", async () => {
      const mockData: InfoPageResponse = {
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
          description: "Test description",
          descriptionEng: "Test description",
          descriptionPdf: [],
          descriptionPdfEng: [],
          wrapper: [],
          wrapperEng: [],
        },
        skills: [],
        experiences: [],
        educations: [],
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await getInfoPage();

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8080/v1/ms-resume/public/info-page",
        expect.objectContaining({
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
      );
      expect(result).toEqual(mockData);
    });

    it("should throw error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(getInfoPage()).rejects.toThrow("Error fetching info page: 404 Not Found");
    });
  });

  describe("getCurriculumPdf", () => {
    it("should fetch PDF blob for english", async () => {
      const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        blob: async () => mockBlob,
      });

      const result = await getCurriculumPdf("english");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8080/v1/ms-resume/public/curriculum/english",
        expect.objectContaining({
          method: "GET",
          headers: {
            "Accept": "application/pdf",
          },
        })
      );
      expect(result).toBeInstanceOf(Blob);
    });

    it("should fetch PDF blob for spanish", async () => {
      const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        blob: async () => mockBlob,
      });

      const result = await getCurriculumPdf("spanish");

      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8080/v1/ms-resume/public/curriculum/spanish",
        expect.objectContaining({
          method: "GET",
        })
      );
      expect(result).toBeInstanceOf(Blob);
    });

    it("should throw error for invalid language", async () => {
      await expect(getCurriculumPdf("invalid" as any)).rejects.toThrow(
        'Invalid language: invalid. Must be "english" or "spanish"'
      );
    });

    it("should throw error when fetch fails", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      await expect(getCurriculumPdf("english")).rejects.toThrow(
        "Error fetching curriculum: 500 Internal Server Error"
      );
    });
  });

  describe("downloadCurriculumPdf", () => {
    it("should download PDF and trigger browser download", async () => {
      const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        blob: async () => mockBlob,
      });

      const createElementSpy = jest.spyOn(document, "createElement");
      const appendChildSpy = jest.spyOn(document.body, "appendChild");
      const removeChildSpy = jest.spyOn(document.body, "removeChild");

      await downloadCurriculumPdf("english");

      expect(createElementSpy).toHaveBeenCalledWith("a");
      expect(appendChildSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
      expect(global.URL.revokeObjectURL).toHaveBeenCalled();
    });

    it("should use custom filename when provided", async () => {
      const mockBlob = new Blob(["pdf content"], { type: "application/pdf" });
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        blob: async () => mockBlob,
      });

      await downloadCurriculumPdf("english", "my-resume.pdf");

      const linkElement = (document.createElement as jest.Mock).mock.results[0].value;
      expect(linkElement.download).toBe("my-resume.pdf");
    });
  });
});
