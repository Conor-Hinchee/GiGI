# Ticket: Add Flourish Animation to Audio Status Indicator (Chinese Dancing Symbol)

## Context

The Audio Status Indicator component has a state where it displays a Chinese dancing symbol. Currently, this symbol is static. To enhance user experience, we want to add a small flourish animation when the audio is played or paused.

## User Story

As a user, when I interact with the play/pause button (or when audio playback state changes) and the Audio Status Indicator is showing the Chinese dancing symbol, I want to see the symbol animate in a fun way so that the interface feels more lively and responsive.

## Acceptance Criteria

- [x] When the Audio Status Indicator is in the Chinese dancing symbol state:
  - [x] On play or pause (either by button or programmatically), the symbol should animate by moving to the right and then looping back around to the left, as if circling within its area.
  - [x] The symbol should not change size during the animation.
  - [x] The animation should be smooth and visually pleasing, giving a sense of the symbol making a full circle.
  - [x] The animation should not interfere with other states or symbols of the Audio Status Indicator.

## Implementation Summary

**Completed on:** June 15, 2025
**Branch:** audio-status-indicator-flourish
**Commit:** 3f7351a

**Changes Made:**

- Added `isFlourishing` state and `useRef` to track previous playing state in AudioStatusIndicator component
- Created `useEffect` to trigger flourish animation only when play state changes in compact mode
- Added `animate-spin-once` CSS class with custom `@keyframes spin-once` animation
- Animation combines horizontal translation (0→8px→12px→8px→0) with full rotation (0→360deg) over 0.8s
- Used `ease-in-out` timing for smooth, playful motion that feels like "weeeee"
- Animation is additive and doesn't interfere with existing bounce animation or other states

## Notes

- The animation should only trigger on play/pause events while in the Chinese dancing symbol state.
- The symbol should return to its original position at the end of the animation.
- No scaling or resizing should occur during the animation.
- The animation should be quick and feel like a playful flourish (e.g., like saying "weeeee, ya knooooow").

---

Please refer to the Audio Status Indicator component for implementation details.
