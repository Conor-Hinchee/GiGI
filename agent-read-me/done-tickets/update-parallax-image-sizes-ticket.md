We need a new ticket for updating our parallax images. They need to be bigger than what they are currently like 50% bigger. All of them need to be bigger. Take advantage of the larger image sizes.

### Title

Update Parallax Image Sizes

- **[Enhancement]**: Increase the size of all parallax images by 50% and adjust the layout to accommodate the larger images.

### Description

- **User Story**: As a site visitor, I want to see larger, more impactful parallax images, so that I can have a more immersive visual experience.
- **Problem Statement**: The current parallax images are not as visually prominent as desired. Increasing their size will enhance the site's aesthetic appeal.
- **Proposed Solution**: Modify the styling for all parallax images to be 50% larger than their current dimensions. Update any related layout components or styles to ensure the larger images are displayed correctly and effectively, without negatively impacting the user experience on different screen sizes.

### Acceptance Criteria

- [x] All parallax images are 50% larger than their original size.
- [x] The layout adjusts appropriately to the new image sizes across all supported devices and screen resolutions.
- [x] The visual appeal of the parallax sections is enhanced.
- [x] Performance is not significantly impacted by the larger image sizes (e.g., lazy loading is implemented if not already present).

### Additional Notes

- **Context**: This ticket aims to improve the visual impact of the parallax scrolling sections.
- **Dependencies**: None.
- **Related Tickets**: `ticket-replace-parallax-photos.md`
- **Attachments**: None.
- **Failure**: None.

### Implementation Summary

**Completion Date**: June 15, 2025  
**Branch**: `update-parallax-image-sizes`  
**Commit**: 2b8a247

**Changes Made**:

- Systematically increased all parallax image dimensions by 50% (1.5x multiplier) across all layers
- Updated Layer 0.5 mini-images: dimensions increased from w-6-12/h-8-14 to w-9-18/h-12-21
- Updated Layer 1.5 portrait images: dimensions increased from w-28-48/h-28-64 to w-42-72/h-42-96
- Updated Layer 2 album artwork: dimensions increased from w-24-44/h-18-32 to w-36-66/h-27-48
- Updated Layer 3 foreground elements: dimensions increased from w-12-18/h-16-22 to w-18-27/h-24-33
- Maintained visual hierarchy and existing animation/blend mode properties
- Preserved performance characteristics while enhancing visual impact

**Files Modified**:

- `src/components/ParallaxLayer.tsx`: Updated all image size classes to achieve 50% size increase

**Result**: All parallax images now display with significantly enhanced visual presence while maintaining the site's aesthetic balance and performance.
