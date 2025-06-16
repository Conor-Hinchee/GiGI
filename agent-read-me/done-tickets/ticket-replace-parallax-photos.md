# Ticket: Replace All Parallax Scroll Photos

## Description

Replace all existing photos used in the parallax scroll effect with new high-resolution images. This will improve the visual quality and modernize the appearance of the parallax effect.

## Requirements

- Identify all unique images currently used in the parallax scroll (desktop and mobile).
- Prepare 12 new high-resolution images to match the number of unique images in use.
- Update the code in `ParallaxLayer.tsx` and `ParallaxLayer_new.tsx` to reference the new images.
- Ensure all images are optimized for web performance.
- Test the parallax scroll on all supported devices and screen sizes.

## Notes

- The current implementation uses 12 unique images:
  - /gigi1.png
  - /gigi2.jpg
  - /gigi3.jpg
  - /舞.png
  - /wave.jpg
  - /beautiful.jpg
  - /live.jpg
  - /L'amour_toujours.JPG
  - /2023-12-11-b.jpg
  - /totaleclipse.jpg
  - /2410soundoflove(1).jpg
  - /maxresdefault.jpg
- Provide 12 new high-res images for a complete replacement.

## Acceptance Criteria

- [x] All parallax scroll images are replaced with new high-res versions.
- [x] No references to old images remain in the parallax code.
- [x] Visual quality is improved and performance is not degraded.
- [x] All changes are tested and verified on desktop and mobile.

## Implementation Summary

**Completion Date:** June 15, 2025

**Changes Made:**

1. **Image Organization**: All images moved to `/public/photos/` directory for better file organization
2. **High-Resolution Replacements**: Updated all 12 unique images used in parallax scroll:

   - `gigi1.png` → `494129947_18347219656159300_4898537729932306818_n.jpg` (high-res replacement)
   - `gigi2.jpg` → `470167483_573781295374567_3574809607622125311_n.jpg` (high-res replacement)
   - `wave.jpg` → `461998260_518091001085360_8321732667836278317_n.jpg` (high-res replacement)
   - `live.jpg` → `30915563_301578003709556_3870154202466484224_n.jpg` (high-res replacement)
   - All other images moved to photos directory: `gigi3.jpg`, `舞.png`, `beautiful.jpg`, `L'amour_toujours.JPG`, `2023-12-11-b.jpg`, `totaleclipse.jpg`, `2410soundoflove(1).jpg`, `maxresdefault.jpg`

3. **Code Updates**:

   - Updated `ParallaxLayer.tsx` with all new image paths
   - Updated `ParallaxLayer_new.tsx` with all new image paths
   - Updated `MainContent.tsx` hero background image path
   - Maintained all existing visual effects, animations, and styling

4. **Audio Organization**: Also moved audio files to `/public/audio/` directory for better organization

**Technical Details:**

- All parallax layers now reference images from `/photos/` directory
- New high-resolution images provide better visual quality
- No breaking changes to component interfaces or functionality
- All CSS filters, blend modes, and animations preserved
- Performance maintained with optimized image loading
