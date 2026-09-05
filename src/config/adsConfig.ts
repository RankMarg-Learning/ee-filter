/**
 * Central Ads Manager Configuration
 * Controls site-wide ad delivery, slot enablement, and global pause controls.
 */
export const ADS_CONFIG = {
  // Global Pause Switch (set to true to enable ads, false to pause all ads site-wide)
  ADS_ENABLED: false,

  // Slot-level enablement switches (applicable when ADS_ENABLED is true)
  SLOTS: {
    headerBanner: true,    // 970x90 header banner
    sidebarTop: true,      // 300x250 sidebar top ad
    sidebarMiddle: true,   // 300x250 sidebar middle ad
    sidebarSkyscraper: true, // 300x600 sidebar skyscraper
    articleInline: true,   // 728x280 inline article ad
    nativeFeed: true,      // Native story feed ad
    sponsorStrip: true,    // 160x50 footer sponsor strip
  },
};

export type AdSlotType =
  | "970x90"
  | "728x90"
  | "300x250"
  | "300x600"
  | "728x280"
  | "160x50"
  | "native";

