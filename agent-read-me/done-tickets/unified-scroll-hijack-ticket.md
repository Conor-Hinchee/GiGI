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

- [x] The scroll hijack logic is unified for desktop and mobile.
- [x] Resistance and border feedback are applied in dance mode within the dance area.
- [x] The scroll "jumps" after resistance is overcome.
- [x] No device-specific code paths remain in the hook.
- [x] The implementation is documented in the ticket upon completion.
- [x] The dancer rave feel and energy is preserved in the scroll hijack experience.

## Implementation Summary

**Completed:** 2025-06-15

### Changes Made:

1. **Removed device-specific logic**: Eliminated the `isMobile` parameter and all device-specific code paths from the `useScrollHijack` hook.

2. **Unified scroll behavior**: All users (desktop and mobile) now experience the same scroll hijacking logic:
   - When in dance mode and within the dance area (first 100vh)
   - Scrolling applies resistance effect with visual feedback
   - Border indication shows when scroll resistance is active
   - After resistance threshold is met, the scroll "jumps" to the next section

3. **Maintained rave energy**: Preserved the existing dramatic resistance effects and smooth snapping behavior that maintains the dancer rave feel.

4. **Updated component usage**: Modified `src/app/page.tsx` to use the simplified hook signature without the `isMobile` parameter.

### Files Modified:
- `/src/hooks/useScrollHijack.ts` - Unified scroll hijack logic
- `/src/app/page.tsx` - Updated hook usage

### Technical Details:
- Resistance threshold: 150px of accumulated scroll
- Resistance factor: 0.2 for dramatic effect
- Unified event handling for scroll, wheel, touch, and keyboard events
- Keyboard navigation available for all users (Arrow Up/Down keys)
- Smooth scrolling with 800ms transition for section snapping

## Notes

- Refer to the original `useScrollHijack` for any edge cases or additional requirements.
- Ensure the user experience is smooth, visually clear, and matches the rave/dancer energy of the rest of the page.

---

**Created:** 2025-06-15
