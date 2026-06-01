# Why I Still Ship Code as a CTO

There's a prevailing wisdom that as you climb the leadership ladder, you should let go of the keyboard. That hands-on coding is the domain of ICs, and your time is better spent on strategy, management, and meetings.

I disagree.

## The Case for Staying Technical

Every quarter I don't ship code, I lose something I can't get back in a strategy session: **context**. Not business context — technical context. The feel of a build pipeline. The friction of a dependency upgrade. The subtle pain of a slow test suite.

This context matters because:

- **Architecture decisions without implementation experience are theoretical.** You can't evaluate tradeoffs you don't feel.
- **Credibility with engineers is earned through shared struggle.** A team trusts a leader who has recently debugged a production issue alongside them.
- **Technical intuition atrophies faster than management skills.** Code changes. Patterns evolve. Six months away from the terminal and your mental model is outdated.

## How I Balance Code and Leadership

I don't advocate for CTOs writing production features. That's almost always a mistake. But there's a middle ground:

### 1. Infrastructure and Architecture Work

I focus on the parts of the codebase that define the foundation — CI/CD pipelines, architectural decisions, build tooling. These are high-leverage areas where a small change can improve the entire team's velocity.

When I rebuilt my personal website (sebastianweszler.com), I made every architectural decision myself: static export over SSR, MDX for content, Tailwind for styling. The implementation taught me more about the current state of the Next.js ecosystem than any blog post could.

### 2. Dogfood Your Own Pain

The best product insights come from using your own tools. If your team owns a developer experience product, use it. If you're building an API platform, consume it. If there's a dashboard, look at it daily.

You'll find bugs, UX issues, and missing features that no amount of status reports will surface.

### 3. Rotate Through Code Reviews

Code review is the highest-leverage technical activity for a leader. It doesn't require deep context on every file — it requires taste, standards, and the ability to spot patterns. A 15-minute code review from a CTO can prevent weeks of architectural drift.

### 4. Build Side Projects

Not everything needs to be in the critical path. Side projects — internal tools, prototypes, personal sites — are safe spaces to experiment, fail, and learn without consequence.

My personal website rebuild was exactly this. A contained project where I could evaluate Next.js's static export, test Cloudflare Pages, and learn Tailwind CSS 4 — all without risking production systems.

## The Real Risk

The real risk isn't that you'll spend too much time coding as a CTO. It's that you'll spend too little, and one day realize your technical intuition is gone — replaced by outdated opinions and second-hand knowledge from your team.

Code is not beneath you. It's your edge.

---

*This article originally appeared on LinkedIn. I write about engineering leadership, architecture, and building high-performing teams.*
