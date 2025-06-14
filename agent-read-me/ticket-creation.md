# Getting started with User Experience Tickets Creation and Refinement

This documents serves as a guide for AI models to take rough prompts from users and refining them into full definitions of user experience tickets. The goal is to ensure being able to make a rough prompt iterate over a few times to define boundaries and requirements so that the subsequent code implementation is done effectively and suss out any potential issues early in the process.

As you are creating the ticket heres some things to keep in mind:

You should start with identifying the underlying ask of the prompt and the ticket title should reflect that ask clearly.

You should reference sections of the code that are relevant to the ticket and identify both what the current behavior is and what the expected behavior should be.

You should not hesitate to breaking up complicated tasks into multiple tickets if needed this is could be your discretion

You should ensure that each ticket is written in perspective of the user and the goal of the ticket should be that it is the smallest incremental improvement for the user experience possible

You should also check the `work-tickets` and `done-tickets` directories for any tickets that might be related to the current one. Use the ticket titles as a quick reference to identify potential connections; there is no need to read the entire ticket unless necessary.

you should reference any previous tickets that are related or could be related to the current one at the bottom of the ticket

## Ticket Template

{{raw prompt here for reference}}

### Title

{{title here}}

- **[Feature/Enhancement/Issue]**: [Brief description of the user experience goal]

### Description

- **User Story**: As a [type of user], I want [what the user wants to achieve], so that [why the user wants it].
- **Problem Statement**: [Describe the problem or gap in the current experience.]
- **Proposed Solution**: [Outline the proposed solution or feature.]

### Acceptance Criteria

- [ ] [Specific, measurable criteria for the ticket to be considered complete.]
- [ ] [Additional criteria as needed.]

**Note**: Focus on implementation requirements only. Do not include testing, UAT, or validation criteria as these are handled separately.

### Additional Notes

- **Context**: [Any relevant background information or links.]
- **Dependencies**: [List any dependencies or related tickets.]
- **Attachments**: [Include any mockups, screenshots, or other assets.]
- **Failure**: [Adds the failure reason for documentation purposes - only used when moving from failed-tickets]

**Important**: Do not include testing requirements, UAT steps, or validation procedures in tickets. Focus on implementation and behavioral requirements only.
