# ManuscriptCMS Studio

- [ManuscriptCMS Studio](#manuscriptcms-studio)
  - [Setup](#setup)

## Setup

1. Clone the repo https://github.com/manuscriptcms/manuscript-studio
2. Run `pnpm i` to install all dependencies
3. Note that we can't run `dev` processes in topological order because they are infinite-running. Therefore, run `pnpm setup-project` once first from the workspace root (which just calls `pnpm build`).
4. Run `pnpm dev` from the workspace root to run everything
