# [Enhancement] Ensure Expansion Indicator Only Shows on First Play and During Expansion

## Description

- **User Story**: As a user, I want the expansion indicator to only appear during the first play of the dance area and the dance button, so that it does not distract me during subsequent interactions.
- **Problem Statement**: Currently, the expansion indicator may appear multiple times or in scenarios where it is not necessary, leading to a less polished user experience.
- **Proposed Solution**: Update the `ExpansionIndicator` component to ensure it only displays:
  - On the first play of the dance area.
  - When the dance button is actively expanding.

## Acceptance Criteria

- [ ] The expansion indicator is displayed only during the first play of the dance area.
- [ ] The expansion indicator is displayed only when the dance button is actively expanding.
- [ ] The indicator does not reappear on subsequent plays or interactions unless explicitly reset.
- [ ] Add tests to verify the behavior of the expansion indicator under these conditions.

## Additional Notes

- **Context**: The `ExpansionIndicator` component is located in `src/components/ExpansionIndicator.tsx`.
- **Dependencies**: Ensure this behavior aligns with the logic in the `DanceButton` and any related components.
- **Attachments**: None.
