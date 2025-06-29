# Ticket: Update Dance Area to Fullscreen Disco Ball Scene

## Summary

Update the Dance Area so that it is fullscreen on desktop on load (matching mobile behavior). Remove the `isExpanding` state and related components. Replace the Dance Area Button and Firefly Scene with a new Disco Ball Scene.

## Details

- **Fullscreen Dance Area:**

  - On desktop, the Dance Area should be fullscreen immediately on load, just like on mobile.
  - Remove any `isExpanding` state and related logic/components.

- **Replace Dance Area Button & Firefly Scene:**
  - Remove the current Dance Area Button and Firefly Scene components.
  - Add a new Disco Ball Scene component:
    - Features a silver disco ball with a golden Chinese dance character (舞) in the center.
    - Clicking/tapping the disco ball or the Chinese character toggles music play/pause (same as current Dance Button behavior).
    - In dance mode:
      - Disco ball changes from silver to reddish gold.
      - Chinese dance character changes from gold to silver.

## Acceptance Criteria

- Dance Area is fullscreen on desktop and mobile on load.
- No `isExpanding` state or related components remain.
- Dance Area Button and Firefly Scene are fully replaced by the new Disco Ball Scene.
- Disco Ball Scene has correct visuals and toggles music as described.
- Visual state changes correctly in dance mode.

---

_Created: 2025-06-29_
