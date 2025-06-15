# Ticket: Unified Scroll Hijack Logic Rewrite

## Context

The current `useScrollHijack` hook has separate logic for desktop and mobile. This ticket is for a complete rewrite to unify the scroll hijacking logic so that all users (desktop and mobile) experience the same behavior.

## Requirements

- The scroll hijack logic should be the same for all users, regardless of device.
- When a user is in dance mode and within the dance area:
  - Scrolling should apply a resistance effect.
  - A border should be shown to indicate scroll resistance is active.
  - After resistance, the scroll should "jump" (i.e., allow the scroll to proceed after a threshold is met).
- The hook should maintain all current functionality, but with unified logic.
- The scroll hijacking should maintain the dancer rave feel that we have on the rest of the page (visuals, feedback, and energy should match the established style).

## Acceptance Criteria

- [ ] The scroll hijack logic is unified for desktop and mobile.
- [ ] Resistance and border feedback are applied in dance mode within the dance area.
- [ ] The scroll "jumps" after resistance is overcome.
- [ ] No device-specific code paths remain in the hook.
- [ ] The implementation is documented in the ticket upon completion.
- [ ] The dancer rave feel and energy is preserved in the scroll hijack experience.

## Notes

- Refer to the original `useScrollHijack` for any edge cases or additional requirements.
- Ensure the user experience is smooth, visually clear, and matches the rave/dancer energy of the rest of the page.

---

**Created:** 2025-06-15
