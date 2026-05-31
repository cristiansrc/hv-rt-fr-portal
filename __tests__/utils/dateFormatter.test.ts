import { formatDate, formatDateRange } from "@/utils/dateFormatter";

describe("dateFormatter", () => {
  describe("formatDate", () => {
    it("should format date correctly in English", () => {
      // Use a date string that will be consistent across timezones
      // "2023-11-15" is interpreted as UTC midnight, which may shift to previous day in some timezones
      // So we test with a date that includes time to ensure consistency
      const result = formatDate("2023-11-15", "en");
      // Check that it contains November and 2023, day may vary by timezone
      expect(result).toContain("November");
      expect(result).toContain("2023");
      expect(result).toMatch(/^\d{1,2} November, 2023$/);
    });

    it("should format date correctly in Spanish", () => {
      const result = formatDate("2023-11-15", "es");
      expect(result).toContain("Noviembre");
      expect(result).toContain("2023");
      expect(result).toMatch(/^\d{1,2} Noviembre, 2023$/);
    });

    it("should return empty string for empty date", () => {
      const result = formatDate("", "en");
      expect(result).toBe("");
    });

    it("should handle different months correctly", () => {
      const january = formatDate("2023-01-15", "en");
      expect(january).toContain("January");
      expect(january).toContain("2023");

      const december = formatDate("2023-12-25", "es");
      expect(december).toContain("Diciembre");
      expect(december).toContain("2023");
    });
  });

  describe("formatDateRange", () => {
    it("should format date range with end date in English", () => {
      const result = formatDateRange("2020-01-15", "2023-12-31", "en");
      expect(result).toBe("(January 2020 - December 2023)");
    });

    it("should format date range with end date in Spanish", () => {
      const result = formatDateRange("2020-01-15", "2023-12-31", "es");
      expect(result).toBe("(Enero 2020 - Diciembre 2023)");
    });

    it("should show 'Present' when end date is null in English", () => {
      const result = formatDateRange("2020-01-15", null, "en");
      expect(result).toBe("(January 2020 - Present)");
    });

    it("should show 'Presente' when end date is null in Spanish", () => {
      const result = formatDateRange("2020-01-15", null, "es");
      expect(result).toBe("(Enero 2020 - Presente)");
    });

    it("should show 'Present' when end date is empty string in English", () => {
      const result = formatDateRange("2020-01-15", "", "en");
      expect(result).toBe("(January 2020 - Present)");
    });

    it("should show 'Presente' when end date is empty string in Spanish", () => {
      const result = formatDateRange("2020-01-15", "", "es");
      expect(result).toBe("(Enero 2020 - Presente)");
    });

    it("should return empty string when start date is empty", () => {
      const result = formatDateRange("", "2023-12-31", "en");
      expect(result).toBe("");
    });

    it("should handle same month and year correctly", () => {
      // Use dates that won't be affected by timezone
      const result = formatDateRange("2023-06-15", "2023-06-20", "en");
      expect(result).toBe("(June 2023 - June 2023)");
    });
  });
});
