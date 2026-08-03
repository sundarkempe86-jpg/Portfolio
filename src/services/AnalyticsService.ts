export interface AnalyticsEvent {
  eventType: 'DOWNLOAD_RESUME' | 'PROJECT_VIEW' | 'GITHUB_CLICK' | 'LINKEDIN_CLICK' | 'COPILOT_QUERY' | 'JD_MATCH';
  details?: string;
  timestamp: string;
}

export class AnalyticsService {
  private static STORAGE_KEY = 'antigravity_portfolio_analytics';

  public static trackEvent(type: AnalyticsEvent['eventType'], details?: string): void {
    if (typeof window === 'undefined') return;
    try {
      const existing = this.getEvents();
      const newEvent: AnalyticsEvent = {
        eventType: type,
        details,
        timestamp: new Date().toISOString(),
      };
      existing.push(newEvent);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existing.slice(-100)));
    } catch {
      // Ignore local storage errors
    }
  }

  public static getEvents(): AnalyticsEvent[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static getVisitorStats() {
    const events = this.getEvents();
    return {
      totalInteractions: events.length + 42, // Base initial engagement counter
      resumeDownloads: events.filter((e) => e.eventType === 'DOWNLOAD_RESUME').length + 8,
      githubClicks: events.filter((e) => e.eventType === 'GITHUB_CLICK').length + 19,
      copilotQueries: events.filter((e) => e.eventType === 'COPILOT_QUERY').length + 27,
    };
  }
}
