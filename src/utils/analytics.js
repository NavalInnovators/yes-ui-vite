// Core utilities and user management
export {
  getISTISOString,
  formatDuration,
  generateEventId,
  getSessionId,
  getUserId,
  initializeUserTracking,
  debugUmamiStatus,
  reidentifyUserAfterAuth,
  schedulePopupAbandonment,
  cancelPopupAbandonment,
  clearPopupTimersForCartItems,
} from "./analyticsCore";

// All tracking functions
export {
  trackCartEvent,
  trackPopupOpen,
  trackPopupClosed,
  trackBookDashboardActivity,
  trackQnAStudied,
  trackNotesStudied,
  trackSummariserUsed,
  trackRephraserUsed,
  trackSocialLinkClicked,
  trackQuerySubmitted,
  trackReviewSubmitted,
  trackContactFormSubmitted,
  trackUserLogout,
  trackProfileEdited,
} from "./analyticsTrackers";
