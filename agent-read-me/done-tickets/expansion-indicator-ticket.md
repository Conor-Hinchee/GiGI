# [Enhancement] Ensure Expansion Indicator Only Shows on First Play and During Expansion

## Description

- **User Story**: As a user, I want the expansion indicator to only appear ONCE during the expansion of the dance area, which only plays on desktop. This ensures a clean and distraction-free user experience.

## Acceptance Criteria

- [x] The expansion indicator is hidden on initial render.
- [x] The expansion indicator displays when the user hits the play button and the dance area is expanding (desktop only).
- [x] The expansion indicator hides automatically after the expansion animation completes roughly and does not reappear unless explicitly reset.

## Implementation Summary

**Completed**: June 14, 2025

### Changes Made:

- Added state management to track if the expansion indicator has been shown before (`hasShownExpansionIndicator`)
- Added state to control when to show the indicator (`showExpansionIndicator`)
- Implemented logic to show the indicator only once during the first play on desktop
- Added automatic hiding after 1 second (expansion animation duration)
- Replaced complex scroll-based visibility logic with simple state-based logic

### Files Modified:

- `src/components/DanceArea.tsx` - Updated expansion indicator logic

## Additional Notes

- **Context**: The `ExpansionIndicator` component is located in `src/components/ExpansionIndicator.tsx`.
