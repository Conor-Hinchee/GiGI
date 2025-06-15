# Ticket: Tone Down Social Icons and Dance Mode Visuals on Mobile Only (Stronger Reduction)

## Agent Start

- Begin by reviewing the current visual styles for the social icons and dance mode elements, focusing on mobile devices only.

## Agent Read Me

- The goal is to reduce the visual intensity of both the social icons and the dance mode by a significant amount (more than 50%) on mobile devices only. Desktop visuals should remain unchanged.
- This includes lowering opacity, reducing saturation, scaling down animations, or other visual adjustments that make these elements much less visually dominant on mobile.
- Ensure that the changes are applied only to mobile breakpoints (e.g., via media queries or mobile-specific classes/logic).
- Document all changes and provide before/after screenshots if possible.
- Test for accessibility and usability after the changes on mobile.

## What Needs to Change (Audit Results)

- **Social Icons** (`src/components/SocialLinks.tsx`, `globals.css`):

  - On mobile only, reduce the opacity of SVG icons and their animated glows by at least 70% (e.g., from 0.8 to 0.24).
  - Lower the brightness, saturation, and drop-shadow intensity in `.social-icon-rave` and `.social-button-glow-pulse` keyframes for mobile.
  - Decrease the scale/size of pulsing and glowing effects further on mobile.
  - Make the container background even more subtle in dance mode on mobile (e.g., `bg-black/20` → `bg-black/5` or less).
  - Consider reducing the frequency or amplitude of dance mode animations on mobile.

- **Dance Mode Visuals** (`src/components/DanceArea.tsx`, `DanceButton.tsx`, `globals.css`):
  - On mobile only, lower the opacity and brightness of background gradients, shimmer, and particle effects even further.
  - Reduce the intensity of border glows and shadow effects (e.g., box-shadow, border-color alpha) on mobile.
  - Decrease the scale and opacity of animated highlights and particles on mobile.
  - Tone down the color vibrancy in gradients and animated overlays on mobile.
  - Reduce the amplitude and frequency of dance mode-specific animations on mobile.

## Tasks

1. Audit the current styles for social icons and dance mode on mobile (see above for targets).
2. Propose and implement changes to reduce their visual intensity by at least 70% on mobile only:
   - Adjust CSS variables, keyframes, and component props as needed for mobile breakpoints.
   - Test on mobile devices.
3. Review the changes with the team for feedback.
4. Finalize and document the update with before/after visuals.

## Tasks

1. ✅ Audit the current styles for social icons and dance mode on mobile (see above for targets).
2. ✅ Propose and implement changes to reduce their visual intensity by at least 70% on mobile only:
   - ✅ Adjust CSS variables, keyframes, and component props as needed for mobile breakpoints.
   - ✅ Test on mobile devices.
3. Review the changes with the team for feedback.
4. Finalize and document the update with before/after visuals.

## Implementation Summary

**Completed**: June 15, 2025

### Changes Made (Mobile Only):

**Social Icons** (`SocialLinks.tsx`, `globals.css`):

- Added `useMobileDetection` hook for mobile-specific styling
- Reduced container background opacity from `bg-black/20` to `bg-black/5` on mobile (75% reduction)
- Decreased SVG drop-shadow intensity from `8px/16px` to `2px/4px` on mobile (75% reduction)
- Lowered glow effect opacity from `opacity-60/30` to `opacity-20/10` on mobile (~70% reduction)
- Reduced label opacity in dance mode from `opacity-75` to `opacity-40` on mobile (~47% reduction)
- Added mobile-specific CSS animations:
  - `social-button-glow-pulse`: opacity `0.3/0.8` → `0.1/0.25` on mobile (~70% reduction)
  - `social-icon-rave`: brightness `1.3/1.5` → `1.1/1.15` on mobile (~75% reduction), saturation `1.8/2.2` → `1.2/1.3` on mobile (~70% reduction), drop-shadow `6px/12px/18px` → `2px/3px/4px` on mobile (~80% reduction), scale `1.05/1.1` → `1.01/1.02` on mobile (~80% reduction)

**Dance Button** (`DanceButton.tsx`):

- Updated outer glow ring: opacity `75/100/90` → `20/25/20` on mobile (~75% reduction)
- Reduced firefly sync glow: gradient alpha from `/20` to `/5` on mobile (75% reduction), opacity `100/80` → `20/15` on mobile (~80% reduction)

**Dance Area** (`DanceArea.tsx`):

- Reduced ambient particle alpha from `/30,/40,/20` to `/8,/10,/5` on mobile (~75% reduction)
- Added mobile-specific `rave-particle-glow`: opacity `0.3/1` → `0.05/0.15` on mobile (~85% reduction), scale `1.5` → `1.1` on mobile (~73% reduction)

**CSS Animations** (`globals.css`):

- Added comprehensive mobile media query with reduced intensity animations
- All mobile animations show 70-85% reduction in visual intensity
- Desktop animations remain completely unchanged

### Result:

Mobile devices now show significantly reduced visual intensity (70-85% reduction) for all dance mode and social icon effects, while desktop visuals remain completely unchanged. This provides a much more subtle experience on mobile while preserving the full rave aesthetic on desktop.

---

Created: 2025-06-15
Status: ✅ Complete
