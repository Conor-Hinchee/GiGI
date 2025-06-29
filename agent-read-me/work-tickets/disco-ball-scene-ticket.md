# Ticket: Replace Firefly Scene with Disco Ball Scene

## Title

Replace Firefly Scene with Disco Ball Scene and Integrate Disco Lights Around Play Button

## Description

- **User Story**: As a user, when I enter dance mode and see the play button in the center of the DanceArea, I want a disco ball scene to appear instead of the fireflies, with animated disco lights radiating around the play button, creating a vibrant dance floor effect.
- **Problem Statement**: The current implementation uses a firefly scene for visual effects in the DanceArea. The interaction model is being simplified, and the firefly events have been removed. To enhance the dance experience, a disco ball scene with animated lights should replace the fireflies, focusing the effect around the play button.
- **Proposed Solution**:
  1. Remove the FirefliesScene component and all related logic from the DanceArea and codebase.
  2. Create a new DiscoBallScene component that renders a disco ball effect, centered on the play button.
  3. When the play button is pressed (music starts), animate disco lights (colored beams, sparkles, or rotating light spots) radiating from the button, simulating a disco dance floor.
  4. Ensure the effect is visually appealing on both desktop and mobile, and performance is optimized.
  5. The play button remains fully functional and visually integrated with the disco ball effect.

## Acceptance Criteria

- [ ] FirefliesScene and all firefly-related logic are removed from the codebase.
- [ ] A new DiscoBallScene component is created and rendered in the DanceArea, centered on the play button.
- [ ] Pressing the play button triggers animated disco lights around the button, with a clear disco ball effect.
- [ ] The effect is responsive and works on both desktop and mobile.
- [ ] The play button remains functional and visually integrated with the new scene.
- [ ] No errors or regressions are introduced.

## Additional Notes

- Reference the current play button implementation in DanceArea for integration.
- Consider using CSS animations, SVG, or Canvas/WebGL for the disco ball and light effects, depending on performance and design needs.
- Ensure accessibility and keyboard navigation for the play button are preserved.

---

**Context**: This ticket replaces the firefly scene with a disco ball scene, focusing on a cohesive and interactive dance experience centered around the play button.
