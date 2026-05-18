export type AnalyticsData = {
  visits: number;
  chatMessages: number;
  projectAnalyses: number;
  resumeReviews: number;
  adminReports: number;
  pdfDownloads: number;
};

export const ANALYTICS_KEY = "shazee-ai-analytics";

export const defaultAnalytics: AnalyticsData = {
  visits: 0,
  chatMessages: 0,
  projectAnalyses: 0,
  resumeReviews: 0,
  adminReports: 0,
  pdfDownloads: 0,
};

export function getAnalytics(): AnalyticsData {
  if (typeof window === "undefined") return defaultAnalytics;

  try {
    const saved = localStorage.getItem(ANALYTICS_KEY);
    if (!saved) return defaultAnalytics;

    return {
      ...defaultAnalytics,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultAnalytics;
  }
}

export function saveAnalytics(data: AnalyticsData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function trackAnalytics(eventName: keyof AnalyticsData) {
  if (typeof window === "undefined") return;

  const current = getAnalytics();
  const updated = {
    ...current,
    [eventName]: current[eventName] + 1,
  };

  saveAnalytics(updated);
}

export function resetAnalytics() {
  if (typeof window === "undefined") return;
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(defaultAnalytics));
}
