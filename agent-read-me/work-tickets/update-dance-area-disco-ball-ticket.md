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
    - Features a realistic disco ball with mirror-like surface using:
      - Small reflective mirror squares placed across the ball's surface
      - Matcap texture or similar technique for realistic mirror reflections
      - Dark inner ball core with instanced mirror geometry for authentic disco ball appearance
    - Golden Chinese dance character (舞) in the center of the disco ball.
    - Clicking/tapping the disco ball or the Chinese character toggles music play/pause (same as current Dance Button behavior).
    - In dance mode:
      - Disco ball mirrors maintain realistic reflections but add reddish gold tint
      - Chinese dance character changes from gold to silver.
      - Mirror squares can show subtle audio-reactive color variations while maintaining reflective quality

## Acceptance Criteria

- Dance Area is fullscreen on desktop and mobile on load.
- No `isExpanding` state or related components remain.
- Dance Area Button and Firefly Scene are fully replaced by the new Disco Ball Scene.
- Disco Ball Scene has realistic mirror-like surface with small reflective squares.
- Mirror surface uses matcap texture or similar technique for authentic reflections.
- Disco ball has dark inner core with instanced mirror geometry for proper depth.
- Chinese dance character is properly positioned and toggles music as described.
- Visual state changes correctly in dance mode while maintaining realistic mirror reflections.
- Audio-reactive effects enhance the mirror reflections without compromising realism.

---

_Created: 2025-06-29_
