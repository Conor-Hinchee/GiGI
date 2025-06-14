# Agent Guide: Working on Tickets

This guide outlines the process for agents to effectively work on tickets. Follow these steps to ensure clarity, efficiency, and alignment with the ticket's goals.

---

## Step 1: Read the Ticket Completely

- Carefully read the ticket to understand its requirements and goals.
- Pay attention to:
  - The **title** and **description**.
  - The **acceptance criteria**.
  - Any **context** or **dependencies** provided.

---

## Step 2: Ensure Understanding

- Identify the sections of the codebase that are relevant to the ticket.
- Determine what the current behavior is and what the expected behavior should be.
- If anything is unclear, **ask questions** to the prompter before proceeding.

---

## Step 3: Start the Work

- **Create a new branch in Git** for the ticket:
  ```bash
  git checkout -b feature/<ticket-name>
  ```
- Begin implementing the changes as described in the ticket.

---

## Step 4: Handle Git Issues

- If you encounter any Git-related issues (e.g., merge conflicts, branch permissions), **escalate the issue to the prompter** for resolution.

---

## Step 5: Deliver the Work

- Ensure all acceptance criteria are met.
- Test the changes thoroughly.
- Submit the work for review as per the project's workflow.

---

## Step 6: Working on a Failed Ticket

- **Move the Ticket**: Locate the failed ticket in the `failed-tickets` directory and move it to the `work-tickets` directory.
- **Read the Failure**: Carefully review the failure reason and steps to reproduce documented in the ticket.
- **Start the Work**: Follow the standard workflow for working on tickets, ensuring the failure is addressed and the acceptance criteria are met.

---

By following this guide, agents can ensure that tickets are handled efficiently and effectively, with clear communication and minimal roadblocks.
