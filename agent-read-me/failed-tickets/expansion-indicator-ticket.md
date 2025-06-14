# [Enhancement] Ensure Expansion Indicator Only Shows on First Play and During Expansion

## Description

- **User Story**: As a user, I want the expansion indicator to only appear ONCE during the expansion of the dance area, which only plays on desktop. This ensures a clean and distraction-free user experience.

## Acceptance Criteria

- [ ] The expansion indicator is hidden on initial render.
- [ ] The expansion indicator displays when the user hits the play button and the dance area is expanding (desktop only).
- [ ] The expansion indicator hides automatically after the expansion animation completes and does not reappear unless explicitly reset.
- [ ] The behavior is consistent across all desktop browsers.

## Additional Notes

- **Context**: The `ExpansionIndicator` component is located in `src/components/ExpansionIndicator.tsx`.
- **Dependencies**: Ensure this behavior aligns with the logic in the `DanceButton` and any related components.
- **Attachments**: None.

### UAT

- Test the behavior on desktop browsers to ensure the indicator appears and hides as expected.
- Verify that the indicator does not reappear on subsequent interactions unless reset.

### Failure Reason

- The `ExpansionIndicator` component displays again if the user scrolls up and re-enters the dance area. It should only display once during the first expansion.

### Steps to Reproduce

1. Navigate to the dance area on desktop.
2. Click the play button to trigger the expansion.
3. Scroll up and re-enter the dance area.
4. Observe that the `ExpansionIndicator` displays again.

### Suggested Fix

- Ensure the `ExpansionIndicator` component does not reappear after the first expansion, even if the user scrolls up and re-enters the dance area.
