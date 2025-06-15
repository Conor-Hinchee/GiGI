{{Update DanceArea bottom border to gold when scrolling in dance mode}}

### Title

Update DanceArea Bottom Border Color to Gold During Scroll in Dance Mode

- **[Enhancement]**: Align the `DanceArea` bottom border color with the scroll indicator color when the user is scrolling within the dance mode.

### Description

- **User Story**: As a user, when I scroll down into the `DanceArea` and enter dance mode, I want the bottom border of the `DanceArea` to change to gold, so that it matches the gold color of the scroll resistance indicator, providing a cohesive visual experience.
- **Problem Statement**: Currently, the `DanceArea` bottom border is purple when music is playing. When the user scrolls down while in the `DanceArea` (triggering the scroll hijack and dance mode), the scroll resistance indicator turns gold, but the `DanceArea` bottom border remains purple. This creates a visual inconsistency.
- **Proposed Solution**: Modify the `DanceArea` component to update its bottom border color to gold when the `scrollHijackState.isScrollHijacked` is true and `scrollHijackState.scrollResistance` is greater than 0 (indicating the user is actively scrolling against resistance in dance mode). The border should revert to its default purple color when not in this specific scroll state.

### Acceptance Criteria

- [x] When the `DanceArea` is active (music playing) and the user is not scrolling down against resistance, the bottom border of the `DanceArea` should be purple.
- [x] When the user scrolls down within the `DanceArea`, and `scrollHijackState.isScrollHijacked` is true and `scrollHijackState.scrollResistance` > 0, the bottom border of the `DanceArea` should change to gold.
- [x] The gold color should match the gold color used in the `ScrollResistanceIndicator`.
- [x] When the user stops scrolling against resistance or scrolls back up, the border color should revert to purple (if music is still playing) or its default state.

**Note**: Focus on implementation requirements only. Do not include testing, UAT, or validation criteria as these are handled separately.

### Additional Notes

- **Context**: The relevant files are primarily `/Users/moarwaffles/dev/GiGi/src/components/DanceArea.tsx` and potentially `/Users/moarwaffles/dev/GiGi/src/app/globals.css` if new CSS classes are needed. The `ScrollResistanceIndicator` at `/Users/moarwaffles/dev/GiGi/src/components/ScrollResistanceIndicator.tsx` can be referenced for the gold color styling.
  The current behavior in `DanceArea.tsx` sets the border to purple when `isPlaying` is true:
  `isPlaying ? "h-[100vh] border-b-8 border-purple-400/80 shadow-purple-400/40 shadow-2xl"`
  This logic will need to be updated to conditionally apply a gold border based on `scrollHijackState`.
- **Dependencies**: None.
- **Attachments**: None.
- **Failure**: N/A

### Implementation Summary

**Completion Date**: June 14, 2025

**Changes Made**:

1. **Modified `DanceArea.tsx`**:
   - Created a new `getBorderClasses()` function to handle dynamic border color logic
   - Added conditional logic to apply yellow-400/80 border and shadow when `scrollHijackState.isScrollHijacked` is true and `scrollHijackState.scrollResistance > 0`
   - Maintained existing purple border behavior when not in scroll resistance mode
   - Preserved all existing border states for fullscreen and non-playing modes

**Technical Details**:

- Used `border-yellow-400/80` and `shadow-yellow-400/40` classes to match the gold color scheme used in `ScrollResistanceIndicator`
- The border color dynamically switches between purple (`border-purple-400/80`) and gold (`border-yellow-400/80`) based on scroll hijack state
- No CSS file changes were needed as yellow-400 classes are already available in Tailwind

**Files Modified**:

- `/Users/moarwaffles/dev/GiGi/src/components/DanceArea.tsx`

The implementation successfully addresses all acceptance criteria, providing a cohesive visual experience where the DanceArea bottom border color aligns with the scroll resistance indicator during dance mode scrolling.
