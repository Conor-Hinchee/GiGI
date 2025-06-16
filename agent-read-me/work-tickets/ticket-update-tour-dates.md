# Ticket: Update Tour Dates in Main Content

**Created:** June 16, 2025
**Type:** Content/Data Update
**Priority:** High
**Status:** In Progress

## User Story

As a visitor to the Gigi D'Agostino website, I want to see the most accurate and up-to-date list of tour dates, so I can plan to attend upcoming shows.

## Description

Replace the current tour dates in the `tourDates` data file with the latest list from Songkick, as marked down in the current work ticket. Ensure all relevant details (date, city, venue, country) are included and formatted for display in the main content section.

## Acceptance Criteria

- [ ] All tour dates in `src/data/tourDates.ts` are replaced with the new list from the Songkick markdown
- [ ] Each date includes city, venue, date, and country (if available)
- [ ] The main content section displays the updated tour dates
- [ ] No old/fake tour dates remain
- [ ] All formatting and color-coding is preserved

## Technical Requirements

- Update `src/data/tourDates.ts` with the new tour dates
- Ensure the `TourCard` and `MainContent` components render the new data correctly
- Double-check for typos or missing venues/cities

## Definition of Done

- [ ] All new tour dates are visible on the site
- [ ] No console errors or warnings
- [ ] Data matches the Songkick markdown list

---

### Source: Songkick Markdown (see work ticket)

---

**Next step:** Update `src/data/tourDates.ts` with the new tour dates.
