# Ticket: Add Flourish Animation to Audio Status Indicator (Chinese Dancing Symbol)

## Context

The Audio Status Indicator component has a state where it displays a Chinese dancing symbol. Currently, this symbol is static. To enhance user experience, we want to add a small flourish animation when the audio is played or paused.

## User Story

As a user, when I interact with the play/pause button (or when audio playback state changes) and the Audio Status Indicator is showing the Chinese dancing symbol, I want to see the symbol animate in a fun way so that the interface feels more lively and responsive.

## Acceptance Criteria

- When the Audio Status Indicator is in the Chinese dancing symbol state:
  - On play or pause (either by button or programmatically), the symbol should animate by moving to the right and then looping back around to the left, as if circling within its area.
  - The symbol should not change size during the animation.
  - The animation should be smooth and visually pleasing, giving a sense of the symbol making a full circle.
  - The animation should not interfere with other states or symbols of the Audio Status Indicator.

## Notes

- The animation should only trigger on play/pause events while in the Chinese dancing symbol state.
- The symbol should return to its original position at the end of the animation.
- No scaling or resizing should occur during the animation.
- The animation should be quick and feel like a playful flourish (e.g., like saying "weeeee, ya knooooow").

---

Please refer to the Audio Status Indicator component for implementation details.
