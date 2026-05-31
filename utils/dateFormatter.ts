/**
 * Formats a date string to "DD Month, YYYY" format
 * @param dateString - Date string in format "YYYY-MM-DD"
 * @param language - "en" or "es"
 * @returns Formatted date string
 */
export function formatDate(dateString: string, language: "en" | "es"): string {
  if (!dateString) return "";

  // Parse the date string directly to avoid timezone issues
  // Format: "YYYY-MM-DD"
  const parts = dateString.split("-");
  if (parts.length !== 3) {
    // Fallback to Date parsing if format is different
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    
    const monthsEn = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const monthsEs = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const monthName = language === "es" ? monthsEs[month] : monthsEn[month];
    return `${day} ${monthName}, ${year}`;
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
  const day = parseInt(parts[2], 10);

  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthsEs = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const monthName = language === "es" ? monthsEs[month] : monthsEn[month];

  return `${day} ${monthName}, ${year}`;
}

/**
 * Formats a date range for experience section
 * @param startDate - Start date string in format "YYYY-MM-DD"
 * @param endDate - End date string in format "YYYY-MM-DD" or null/empty
 * @param language - "en" or "es"
 * @returns Formatted date range string like "(MM YYYY - MM YYYY)" or "(MM YYYY - Present)"
 */
export function formatDateRange(
  startDate: string,
  endDate: string | null | undefined,
  language: "en" | "es"
): string {
  if (!startDate) return "";

  // Parse the date string directly to avoid timezone issues
  const startParts = startDate.split("-");
  let startMonth: number;
  let startYear: number;

  if (startParts.length === 3) {
    startYear = parseInt(startParts[0], 10);
    startMonth = parseInt(startParts[1], 10) - 1; // Month is 0-indexed
  } else {
    // Fallback to Date parsing if format is different
    const start = new Date(startDate);
    startMonth = start.getUTCMonth();
    startYear = start.getUTCFullYear();
  }

  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthsEs = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const monthNames = language === "es" ? monthsEs : monthsEn;
  const startMonthName = monthNames[startMonth];

  if (!endDate || endDate.trim() === "") {
    const presentText = language === "es" ? "Presente" : "Present";
    return `(${startMonthName} ${startYear} - ${presentText})`;
  }

  // Parse end date
  const endParts = endDate.split("-");
  let endMonth: number;
  let endYear: number;

  if (endParts.length === 3) {
    endYear = parseInt(endParts[0], 10);
    endMonth = parseInt(endParts[1], 10) - 1; // Month is 0-indexed
  } else {
    // Fallback to Date parsing if format is different
    const end = new Date(endDate);
    endMonth = end.getUTCMonth();
    endYear = end.getUTCFullYear();
  }

  const endMonthName = monthNames[endMonth];

  return `(${startMonthName} ${startYear} - ${endMonthName} ${endYear})`;
}
