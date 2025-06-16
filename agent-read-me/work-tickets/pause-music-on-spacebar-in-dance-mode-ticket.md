# Ticket: Pause Music on Spacebar in Dance Mode

## User Story

As a user, when I am in Dance Mode, pressing the spacebar should pause the currently playing music. The spacebar should always be listened for, but only pause the music if the page is in Dance Mode. The spacebar should **not** play/resume music—only pause it if it is already playing.

## Acceptance Criteria

- [ ] The app listens globally for the spacebar keydown event.
- [ ] If the user is in Dance Mode and music is playing, pressing the spacebar pauses the music.
- [ ] Pressing the spacebar does **not** play or resume music if it is already paused.
- [ ] This behavior works on both desktop and mobile (if possible).
- [ ] No other keyboard shortcuts are affected.

## Context

This feature is to improve user control and accessibility in Dance Mode. It should not interfere with other controls or modes.

## Implementation Notes

- Consider adding the event listener at the top-level (e.g., in a layout or context provider).
- Ensure the event is cleaned up on unmount.
- Only act if Dance Mode is active.
- Do not preventDefault unless necessary for accessibility.

---

_Created: 2025-06-16_
