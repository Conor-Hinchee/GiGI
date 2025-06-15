# Ticket: Remove Touch and Mouse Firefly Events

## Summary

The `DanceArea` and `FirefliesScene` components currently include touch and mouse event handlers for creating fireflies. These events need to be removed to simplify the interaction model and avoid unintended behaviors.

## Details

### Identified Event Handlers

#### In `DanceArea.tsx`:

1. **`handleTouchStart`**

   - Spawns fireflies at the touch location.
   - Triggered on `onTouchStart`.

2. **`handleTouchEnd`**

   - Spawns a burst of fireflies on touch release.
   - Triggered on `onTouchEnd`.

3. **`handleClick`**
   - Spawns a small burst of fireflies on desktop click.
   - Triggered on `onClick`.

#### In `FirefliesScene.tsx`:

1. **`spawnFirefliesAtTouch`**

   - Exposed via a ref to create fireflies at specific screen coordinates.
   - Used by `DanceArea` for touch and click events.

2. **`createTouchFirefly`**
   - Handles the creation of individual fireflies.

### Tasks

1. Remove the `handleTouchStart`, `handleTouchEnd`, and `handleClick` functions from `DanceArea.tsx`.
2. Remove the `onTouchStart`, `onTouchEnd`, and `onClick` props from the `div` in `DanceArea`.
3. Remove the `spawnFirefliesAtTouch` and `createTouchFirefly` functions from `FirefliesScene.tsx`.
4. Ensure no other components or functions depend on these handlers.
5. Test the application to confirm the removal does not introduce regressions.

## Acceptance Criteria

- All touch and mouse event handlers related to firefly creation are removed.
- The application functions correctly without these interactions.
- No errors or warnings are introduced.

## Notes

- This change is part of simplifying the interaction model for the `DanceArea` and `FirefliesScene` components.
- Ensure thorough testing, especially on mobile devices, to confirm no unintended side effects.

## Additional Context

### Git History Analysis

After reviewing the last 10 commits in the git history, the following relevant commits were identified:

1. `f3a3174` - **feat**: consolidate social links and sync dance mode
2. `6b651c0` - **feat**: update DanceArea border color to gold during scroll resistance

### Rollback Feasibility

- Rolling back to `f3a3174` would undo the social links consolidation and dance mode sync.
- Rolling back to `6b651c0` would undo the DanceArea border color update.

Given the scope of this ticket, rolling back these commits is not recommended as they are unrelated to the touch and mouse firefly events. Instead, proceed with the planned removal tasks outlined above.

## Completion Status

- [x] All touch and mouse event handlers related to firefly creation have been removed.
- [x] The application functions correctly without these interactions.
- [x] No errors or warnings are introduced.

## Implementation Summary

### Changes Made
1. Removed `handleTouchStart`, `handleTouchEnd`, and `handleClick` functions from `DanceArea.tsx`.
2. Removed `onTouchStart`, `onTouchEnd`, and `onClick` props from the `div` in `DanceArea`.
3. Removed `spawnFirefliesAtTouch` and `createTouchFirefly` functions from `FirefliesScene.tsx`.
4. Fixed related errors and cleaned up unused code.

### Completion Date
June 15, 2025
