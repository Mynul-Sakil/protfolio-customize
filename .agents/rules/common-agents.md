---
trigger: always_on
---

# Agent Orchestration

## Available Subagents

Invoke specialized subagents in Antigravity using `invoke_subagent` with `TypeName`:

| Subagent | Purpose | When to Use |
|-------|---------|-------------|
| `planner` | Implementation planning | Complex features, multi-file refactoring |
| `architect` | System design | Architectural trade-offs and scalability |
| `tdd-guide` | Test-driven development | Writing tests first for new features or bug fixes |
| `code-reviewer` | Code review | Reviewing code quality and maintainability after edits |
| `security-reviewer` | Security analysis | Auditing auth, user input, SQL/API, or secrets |
| `build-error-resolver` | Fix build/type errors | Resolving compilation or TypeScript failures with minimal diffs |
| `e2e-runner` | End-to-end testing | Verifying critical user flows |
| `refactor-cleaner` | Dead code cleanup | Removing unused code and duplicates |

## Parallel Subagent Execution

Launch independent subagent reviews or research tasks in parallel rather than sequentially when their scopes do not overlap. After launching asynchronous subagents, rely on Antigravity's reactive wakeup rather than polling in a loop, and synthesize all subagent findings before delivering the final conclusion.
