# Work Ticket: Update Parallax Scroll

## Description

The parallax scroll effect should be updated to move slightly even when the user is not actively scrolling the page. This will create a more dynamic and engaging visual experience.

## Failure / Issue

- The current implementation does not make the parallax images feel like they are falling when the page is stalled (not scrolling).
- The subtle idle movement is not enough to create a falling effect; the images should continue to move downward, simulating gravity, even when the user is not scrolling.

## Updated Requirements

1. Modify the parallax scroll behavior so that parallax images continue to move downward (fall) when the page is idle, creating a sense of gravity.
2. The falling effect should be smooth and visually appealing, not distracting.
3. The effect should pause or reset appropriately if the user resumes scrolling.
4. Test the updated behavior on both desktop and mobile devices to ensure compatibility.

## Implementation Notes

- The `ParallaxLayer` component in `src/components/ParallaxLayer.tsx` and `src/components/ParallaxLayer_new.tsx` should be reviewed and updated.
- Consider using a `requestAnimationFrame` loop to implement the idle movement.
- Ensure performance is optimized to avoid unnecessary CPU/GPU usage.

## Testing

- Verify the parallax effect works as expected when the user is scrolling.
- Verify the subtle movement is present and smooth when the page is idle.
- Test on various screen sizes and devices.

## References

- [MDN: Using requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- Existing `useScrollDance` and `useScrollPosition` hooks in `src/hooks/` may provide useful context.

## Status

- [ ] Not Started
- [ ] In Progress
- [x] Completed

## Implementation Summary

**Completion Date:** June 15, 2025

**Changes Made:**

1. Enhanced `useScrollPosition` hook to create a continuous falling effect when the page is idle (after 500ms of no scrolling)
2. Implemented falling motion with 15 pixels per second speed plus subtle side-to-side drift variations
3. Updated `ParallaxLayer_new.tsx` to give each parallax image individual falling characteristics:
   - Different falling speeds (0.15x to 0.28x scroll multipliers)
   - Varied drift directions (left/right horizontal movement)
   - Some images include rotation and scaling effects
   - Each image maintains its unique visual identity while participating in the falling motion

**Technical Details:**

- Falling effect activates 500ms after user stops scrolling
- Uses `requestAnimationFrame` for smooth animation performance
- Each image layer has different transform properties for varied falling behavior
- Maintains existing scroll-based parallax when user is actively scrolling
