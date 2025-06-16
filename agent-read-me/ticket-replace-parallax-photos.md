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

- All parallax scroll images are replaced with new high-res versions.
- No references to old images remain in the parallax code.
- Visual quality is improved and performance is not degraded.
- All changes are tested and verified on desktop and mobile.
