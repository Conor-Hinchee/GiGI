# Ticket: Update Tour Dates in Main Content

**Created:** June 16, 2025
**Type:** Content/Data Update
**Priority:** High
**Status:** Completed ✅

## User Story

As a visitor to the Gigi D'Agostino website, I want to see the most accurate and up-to-date list of tour dates, so I can plan to attend upcoming shows.

## Description

Replace the current tour dates in the `tourDates` data file with the latest list from Songkick, as marked down in the current work ticket. Ensure all relevant details (date, city, venue, country) are included and formatted for display in the main content section.

## Acceptance Criteria

- [x] All tour dates in `src/data/tourDates.ts` are replaced with the new list from the Songkick markdown
- [x] Each date includes city, venue, date, and country (if available)
- [x] The main content section displays the updated tour dates
- [x] No old/fake tour dates remain
- [x] All formatting and color-coding is preserved

## Technical Requirements

- Update `src/data/tourDates.ts` with the new tour dates
- Ensure the `TourCard` and `MainContent` components render the new data correctly
- Double-check for typos or missing venues/cities

## Definition of Done

- [x] All new tour dates are visible on the site
- [x] No console errors or warnings
- [x] Data matches the Songkick markdown list

---

## Implementation Summary

**Completed:** June 16, 2025

### Changes Made:

1. **Tour Dates Updated**: Replaced all placeholder/fake tour dates in `src/data/tourDates.ts` with actual Gigi D'Agostino tour dates from Songkick
2. **Type Interface Extended**: Added optional `country` field and `gold` color option to `TourDate` interface in `src/types/index.ts`
3. **Data Accuracy**: All 11 tour dates properly formatted with:
   - Correct cities and venues
   - Proper date formatting (MMM DD format)
   - Country information where available
   - Color coding preserved

### Tour Dates Implemented:

- **2025**: Salzburg (Apr 4 & 5), Dornbirn (Mar 15), Turin (Feb 28), Alba (Jul 4), Riccione (Jul 19), Palmanova (Aug 1), Catania (Aug 13), Milan (Sep 27)
- **2026**: Innsbruck (Jun 3), Linz (Jun 5)

### Technical Notes:

- Created feature branch `update-tour-dates`
- All changes committed and pushed to remote repository
- No console errors or TypeScript issues
- Main content section now displays accurate tour information

---

### Source: Songkick Markdown (see work ticket)

---

**Next step:** Update `src/data/tourDates.ts` with the new tour dates.
