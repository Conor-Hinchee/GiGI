# Social Links Consolidation and Dance Mode Sync

**Ticket ID**: social-links-consolidation-and-dance-sync
**Created**: June 14, 2025
**Type**: Enhancement
**Priority**: Medium
**Status**: In Progress

## User Story

As a user visiting the Gigi D'Agostino website, I want the social links area to be more streamlined and synchronized with dance mode so that I have a consistent and cohesive experience when interacting with social media links.

## Description

The social links area needs to be updated with three main changes:

1. Consolidate YouTube links down to just one main YouTube channel
2. Add the Gigi D'Agostino Casa DAG homepage link to the main social links section
3. Sync dance mode effects with all social icons by componentizing individual social icons

## Acceptance Criteria

- [x] **YouTube Consolidation**: Reduce the three YouTube channel links to just one primary YouTube channel link
- [x] **Casa DAG Integration**: Move the Casa DAG forum link from the separate section to the main social links grid alongside other platforms
- [x] **Dance Mode Sync**: Create a componentized social icon that responds to dance mode consistently across all social links
- [x] **Visual Consistency**: All social icons should have the same dance mode animations and effects
- [x] **Layout Optimization**: Maintain a clean grid layout with the consolidated social links
- [x] **Responsive Design**: Ensure the updated layout works well on all screen sizes

## Technical Requirements

### Components to Update

- `src/components/SocialLinks.tsx` - Main social links component
- Consider creating a reusable `SocialIcon` component for dance mode synchronization

### Implementation Details

1. **YouTube Link Selection**: Keep the main Gigi D'Agostino channel (determine which is primary)
2. **Casa DAG Integration**: Move Casa DAG link from separate section to main grid
3. **Dance Mode Componentization**: Extract social icon logic into reusable component with consistent dance animations
4. **Layout Restructuring**: Remove the separate YouTube channels section and Casa DAG section

## Definition of Done

- [x] Only one YouTube link remains in the main social links grid
- [x] Casa DAG link is integrated into the main social links section
- [x] All social icons use a shared component for dance mode effects
- [x] Dance mode animations are synchronized across all social links
- [x] Layout is responsive and visually consistent
- [x] Code is clean and maintainable with proper component separation
- [x] No console errors or warnings
- [x] Visual testing confirms proper dance mode synchronization

## Implementation Summary

**Completed**: June 14, 2025

### Changes Made:

1. **YouTube Consolidation**: Reduced three YouTube channels (Gigi Dag, Gigi D'Agostino, Lento Violento) to just the main "Gigi D'Agostino" official channel
2. **Casa DAG Integration**: Moved the Casa DAG forum link from its separate section into the main social links grid
3. **Layout Optimization**: Updated grid layout from `grid-cols-3 md:grid-cols-6` to `grid-cols-2 md:grid-cols-4 lg:grid-cols-8` to accommodate 8 social links
4. **Structure Cleanup**: Removed the separate "YouTube Channels" section and standalone "Casa DAG Forum" section
5. **Dance Mode Sync**: All social icons now use the existing `SocialLinkCard` component which already had proper dance mode synchronization with `isPlaying` prop

### Final Social Links Layout:
- Official Website (Gold)
- Facebook (Blue) 
- Instagram (Pink)
- Twitter (Sky)
- YouTube (Red)
- Spotify (Green)
- Apple Music (Gray)
- Casa DAG (Purple)

The implementation maintains all existing dance mode animations and effects while providing a cleaner, more unified social links experience.

## Notes

- Determine which YouTube channel should be the primary one to keep
- Ensure the Casa DAG link maintains its distinctive styling while fitting into the main grid
- Consider the color scheme and icon consistency for the consolidated layout
- Dance mode effects should be identical across all social icons

## Files Affected

- `src/components/SocialLinks.tsx`
- Potentially new component: `src/components/SocialIcon.tsx` or similar

## Branch

Create feature branch: `feature/social-links-consolidation-dance-sync`
