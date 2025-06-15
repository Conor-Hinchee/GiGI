# [Enhancement] Update Social Buttons to Use SVGs with Dance Mode Animations

### Title

Update Social Buttons to take advantage of using SVGs to improve the dance mode animations and aesthetics.

### Description

- **User Story**: As a user, I want the social media buttons to resemble the floating audio status indicator and in dance mode the outsie button that kinda bubbles around the icon is visually hidden but the icon svgs are updated so that they have the pulsing color and trnasitions that match the "rave" aesthetic of the project.

- **Problem Statement**: The current social buttons lack the dynamic animations and thematic consistency seen throughout the rest of the project. They do not fully utilize the "rave" aesthetic.

- **Proposed Solution**: Replace the existing social button icons with SVGs that support animations. Add dynamic color transitions and hover effects to align with the project's theme.

### Acceptance Criteria

- [ ] Replace all social button icons with new SVGs.
- [ ] Add animations to SVGs for "dance mode" (e.g., pulsing, glowing, or spinning effects).
- [ ] Ensure hover and active states reflect the "rave" aesthetic (e.g., color transitions, gradients).
- [ ] Maintain responsiveness and accessibility (e.g., ARIA labels, keyboard navigation).
- [ ] Ensure consistency with the project's color palette and themes.

### Refinement

- **Circular Design**: Update the social buttons to have a circular shape, similar to the "Dance Button" in dance mode.
- **SVG Placement**: Place the SVG icons inside the circular buttons, ensuring they are centered.
- **Animation**: Add a "bouncing" animation to the buttons, making them move up and down dynamically.
- **Rave Mode Outlines**: Apply the "Rave Mode" color effects to the SVG outlines, including glowing and pulsing animations.

### Updated Acceptance Criteria

- [x] Social buttons are circular, with SVG icons centered inside.
- [x] Buttons feature enhanced rave mode animations with pulsing, glowing effects.
- [x] SVG icons have dynamic color transitions and enhanced glow effects in rave mode.
- [x] Container becomes nearly invisible in dance mode, focusing attention on the SVG icons.
- [x] Maintain responsiveness and accessibility (ARIA labels, keyboard navigation).
- [x] Ensure consistency with the project's color palette and themes.
- [x] **FIXED**: SVG icons are now properly centered within the circular button containers.

### Additional Notes

- **Context**: The relevant file is `/src/components/SocialLinks.tsx`. The `getColorClasses` function can be extended to include new styles for "dance mode."
- **Dependencies**: None.
- **Attachments**: None.
- **Failure**: ✅ RESOLVED - SVG icons are now properly centered within the circular button containers

### Failure Analysis

**Issue**: ✅ RESOLVED - The SVG icons were not properly centered within the circular button containers. The icons appeared misaligned due to:

- Size mismatch between SVG icons (`w-8 h-8`) and their wrapper container (`w-10 h-10`)
- Missing nested centering container for precise alignment

**Resolution Applied**:

- Added an additional centering wrapper div (`w-8 h-8 flex items-center justify-center`) inside the icon container
- Updated all SVG elements to use `w-full h-full` to properly fill their allocated space
- Maintained the outer container's flexbox centering (`flex items-center justify-center`)

**Impact**: Fixed visual consistency and professional appearance of the social buttons, ensuring they align properly with other UI elements in the project.

### Implementation Summary

**Completion Date**: June 14, 2025
**Fix Applied**: June 14, 2025

**Changes Made**:

- Updated `SocialLinks.tsx` to focus on SVG icons with minimal container visibility in dance mode
- Modified container styling to be nearly transparent (`bg-black/20`) when in rave mode
- Enhanced SVG icons with larger size (`w-10 h-10`) and dynamic rave effects
- Added custom CSS animations in `globals.css`:
  - `social-icon-rave`: Enhanced hue rotation, brightness, saturation, and drop-shadow effects
  - `social-button-glow-pulse`: Simplified glow animation focused on opacity and scale
- Implemented color-based particle effects with randomized timing for organic feel
- Maintained responsive grid layout with proper spacing

**SVG Centering Fix**:

- Added nested centering container (`w-8 h-8 flex items-center justify-center`) for precise icon alignment
- Updated all SVG elements from `w-8 h-8` to `w-full h-full` for proper container filling
- Maintained outer container flexbox centering properties

**Files Modified**:

- `/src/components/SocialLinks.tsx`
- `/src/app/globals.css`

The implementation successfully transforms social buttons to resemble the floating audio status indicator style, with emphasis on SVG icons that pulse and glow with the project's rave aesthetic while keeping the container minimal and unobtrusive in dance mode. **The SVG centering issue has been resolved with proper nested alignment containers.**
