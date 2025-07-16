# Rhythm Music Game: Replace Firefly Scene

## User Story

As a user, I want to play a rhythm-based music game where I press a dance button in time with the beat of the music. The game should provide visual feedback for success and failure, keep score, and allow me to pause or restart the game.

## Context

Currently, the `FirefliesScene` provides a visual background for the dance area. This ticket proposes replacing it with a minimal rhythm game experience focused on functionality.

## Current Failures & New Work Cycle

The following issues were identified in the previous implementation and are the focus for this work cycle:

- [x] **Floating dance button in 3JS/game layer:** The dance symbol is missing. Add the correct dance symbol to the button.
- [x] **Music start on dance button press:** Music should start when the dance button is pressed (not just the audio status indicator). Also, move the audio status indicator to the left side so it does not cover the scorecard.
- [x] **Button beat indication:** The button flashes to the beat, but the visual cue is not clear enough. Enhance the animation so it is obvious when to press.
- [x] **Success/Failure feedback:** When the user presses the button on the beat, the button should flash gold (success). If missed, it should flash red (failure). This is not currently working or reproducible.
- [x] **Scorekeeping:** The game should keep score based on successful/failed presses. Ensure this is visible and updates correctly.

All other previously completed acceptance criteria remain in place. All failures have been addressed in this cycle.

## Implementation Notes

- Use the existing music files and play them in sync with the game.
- Use audio analysis (e.g., Web Audio API) to detect beats or use a fixed BPM for simplicity.
- The dance button should be interactive and visually animated in sync with the beat.
- Score and timer should be visible but unobtrusive.
- Controls for pause/restart should be accessible.

## Out of Scope

- Advanced UI/UX polish
- Multiple difficulty levels or song selection
- Mobile-specific optimizations (unless trivial)

## Completion Checklist

- [ ] All acceptance criteria are met
- [ ] Code is committed to a feature branch
- [ ] Ticket is moved to `work-tickets/` when work begins
- [ ] Ticket is moved to `done-tickets/` with completion summary when finished

---

**Created:** 2025-07-14
**Author:** GitHub Copilot
