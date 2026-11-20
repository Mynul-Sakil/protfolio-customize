---
name: today-summary
description: "Summarizes the tasks accomplished today, displaying each task concisely on a single line."
---

# Instructions

When triggered, your goal is to provide a very brief summary of all the tasks accomplished today. 

Follow these strict rules for the output:
1. **Source of Truth**: Review your conversation history, agent logs, or recent git commits to determine what was worked on today. **Crucially**, run `git log --since="18 hours ago" --oneline` on the backend and frontend repositories (and check their `walkthrough.md` files) to catch any work done by the AI in parallel or past chat windows. This 18-hour rolling window accommodates night-shift schedules better than a strict midnight cutoff, while preventing overlap with yesterday's work session. **HOWEVER**, you MUST filter this log to ONLY include work authored by the current user or the AI. Do NOT include work from other developers, remote PRs, or other branches (e.g., "Merge pull request #X from...") unless the user explicitly worked on them today. Focus strictly on the user's active work.
2. **High-Level Context**: Always explicitly mention the overarching features, APIs, or UI areas that were worked on (e.g., "Worked on Reporting API and UI").
3. **One Line Per Task**: Output exactly one line per completed task. 
4. **Be Extremely Concise**: Do not include code snippets, long explanations, or details about how the bug was fixed. Focus only on the 'what'.
5. **Format**: Use a simple bulleted list. You may optionally group bullets under the high-level feature areas.

Example Output:
- Fixed the filter option layout issue on the reports dashboard so it no longer goes behind the text.
- Calculated and added percentage change data for the previous 6-month period comparison on the metric cards.
- Fixed a bug where the 'Appointments' icon was overflowing the metric card boundary.
- Added a hover tooltip to the metric card titles to show truncated text.
