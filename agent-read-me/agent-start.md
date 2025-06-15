# Agents Start Here

Welcome to the starting guide for your workflow! This document will help you determine whether the task involves **creating a ticket** or **actioning on an existing ticket**. Follow the steps below to get started.

---

## Step 1: Understand the Prompt

Carefully read the prompt provided. The prompt is probably coming from voice to text so try infer maybe through spelling errors. Identify whether the focus is on:

- **Creating a Ticket**: The prompt describes a new feature, enhancement, or issue that needs to be documented for future work.
- **Actioning on a Ticket**: The prompt refers to an existing ticket or task that requires implementation, debugging, or further action.

---

## Step 2: Decision Framework

Use the following questions to guide your decision:

### For Creating a Ticket

- Does the prompt describe a new user story, feature, or problem?
- Is there a need to document acceptance criteria, user stories, or context for future work?
- Are there placeholders or loose ideas that need to be formalized into a ticket?

If **yes**, proceed to create a ticket using the [User Experience Ticket Template](./README.md).

### For Actioning on a Ticket

- Does the prompt reference an existing ticket or task?
- Are there specific instructions or requirements to implement, debug, or complete?
- Is the focus on delivering a solution rather than documenting a new idea?

If **yes**, proceed to action on the ticket by following the provided instructions.

### For Failed Tickets

- if the ticket has a previous failed section assume we we are already on a feature branch and we don't need to check out a new branch

### For Completing Tickets

- When all acceptance criteria are met and implementation is complete:
  - Move the ticket from `work-tickets/` to `done-tickets/` folder
  - Update the ticket to mark acceptance criteria as completed (checkbox format)
  - Add implementation summary with completion date and changes made
  - **Check out to a branch based on the ticket name if not already on it**
    - Example: `git checkout -b remove-touch-mouse-firefly-events` if the branch does not exist
  - Commit changes to the feature branch with a descriptive commit message
  - Push the branch to the remote repository: `git push origin <branch-name>`
  - **Note**: Do not run `npm run dev`, `npm test`, or other development commands unless specifically required. **Do not run any test commands (e.g., `npm test`, `npm run test`) as this project does not use tests.**

---

## Step 3: Next Steps

- **For Creating a Ticket**: Use the template in the `ticket-creation.md` file to draft a clear and concise ticket.
- **For Actioning on a Ticket**: Begin work on the task as described, ensuring all requirements are met.
- **For Failed Tickets**: If a ticket does not meet the acceptance criteria or has unresolved issues following the workflow outlined in `ticket-fail.md`.
- **For Completing Tickets**: When work is finished, move ticket to `done-tickets/` folder, update completion status, and commit changes and push to the feature branch.

---
