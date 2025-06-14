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

- The `ExpansionIndicator` component is not receiving all required props, leading to unexpected behavior.

### Steps to Reproduce

1. Navigate to the dance area on desktop.
2. Trigger the expansion indicator by starting the dance mode.
3. Observe that the indicator does not behave as expected due to missing props.

### Suggested Fix

- Ensure all required props are passed to the `ExpansionIndicator` component in `DanceArea.tsx`.
- Verify the `isExpanding` prop is correctly implemented and passed.
