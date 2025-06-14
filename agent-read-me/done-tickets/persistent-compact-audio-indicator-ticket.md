# [Enhancement] Make Audio Status Indicator Permanently Compact After First Scroll

{{Raw prompt: "Claude, help us create a new ticket for updating the audio status indicator after a user Scroll down and we're just displaying the small audio status indicator with the small uh dance Chinese dance symbol. They should never go back to a scrolling. You should always just be that small button. That small round button please."}}

### Title

- **[Enhancement]**: Make Audio Status Indicator Permanently Compact After First Scroll

### Description

- **User Story**: As a user, I want the audio status indicator to remain as a small compact button with just the dance symbol (舞) once I have scrolled down, so that it doesn't revert back to the full-size button when I scroll back up, providing a consistent and unobtrusive interface.

- **Problem Statement**: Currently, the audio status indicator toggles between a full-size button (with text and dot indicator) and a compact button (with just the dance symbol) based on scroll position. When users scroll back up, the button expands again, which can be distracting and takes up unnecessary space after the user has already seen the full interface.

- **Proposed Solution**: Implement a "sticky" compact mode where once the user scrolls down past the threshold (50px), the audio status indicator permanently switches to the compact mode with just the dance symbol (舞) and never reverts to the full-size version, regardless of subsequent scroll position changes.

### Acceptance Criteria

- [x] Audio status indicator starts in full-size mode on initial page load (current behavior)
- [x] When user scrolls down past 50px threshold, indicator switches to compact mode showing only the dance symbol (舞)
- [x] Once switched to compact mode, the indicator remains compact even when user scrolls back up to the top
- [x] Compact mode maintains all existing functionality (click to toggle audio, visual state changes for playing/paused)
- [x] Compact mode maintains all existing styling (animations, colors, hover effects) for the dance symbol
- [x] State persists throughout the session - no reset back to full-size mode

## Implementation Summary

**Completed**: June 14, 2025

### Changes Made:

- Added React `useState` and `useEffect` imports to manage component state
- Introduced `hasScrolledOnce` state to track if user has ever scrolled past the 50px threshold
- Added `useEffect` hook to monitor scroll position and set the persistent state when threshold is reached
- Replaced `isScrolled` logic with `isCompact` logic that remains true once user has scrolled
- Maintained all existing styling, animations, and functionality for both full-size and compact modes
- Ensured smooth transitions and proper state management throughout the session

### Files Modified:

- `src/components/AudioStatusIndicator.tsx` - Updated to implement persistent compact mode after first scroll

### Technical Implementation:

The solution uses React's `useState` to track whether the user has scrolled past the threshold at least once. Once `hasScrolledOnce` is set to `true`, the component permanently stays in compact mode, showing only the dance symbol (舞) regardless of subsequent scroll position changes. This provides a cleaner, more consistent user experience after the initial interaction.

### Additional Notes

- **Context**: The current `AudioStatusIndicator` component is located in `src/components/AudioStatusIndicator.tsx` and uses `useScrollPosition` hook to detect scroll changes.
- **Dependencies**: May need to add state management to track whether the user has scrolled past the threshold at least once.
- **Related Components**:
  - Current implementation uses `scrollY > 50` to determine display mode
  - Component uses CSS transitions for smooth animation between modes
- **Related Tickets**:
  - `expansion-indicator-ticket.md` (completed) - Similar pattern of showing UI elements only once during user interaction
