# AGENTS.md

## Project Overview

This is a **hackathon project** — a web application built with Next.js 15, React 19, and TypeScript. The goal is to deliver a polished, functional demo as fast as possible. The proposed solution may include backend services, databases, S3 storage, observability stacks, and other infrastructure — but due to time constraints, we **mock all of these** rather than integrating them for real. The demo should feel as if those systems exist behind the scenes.

### Domain

The target audience is the **UK healthcare system (NHS)**. Mock data, terminology, workflows, and UI copy should reflect UK healthcare conventions (e.g., NHS Trusts, GP surgeries, NHS Number, care pathways, referrals, A&E, etc.).

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript

## Core Rules

### Mock Everything — No Real Integrations

The solution we propose may reference databases, APIs, S3 buckets, observability tools, and other backend systems. However, we do **not** actually integrate any of them. Instead, we mock their existence so the demo tells a convincing story.

- All data comes from **local mock data files** — never from real databases or external APIs
- Never install database drivers, ORMs, cloud SDKs, or observability agents
- Never use `fetch()` to call real external services
- Mock data should live alongside the feature that uses it (e.g., `app/tab-1/data.ts`)
- When the UI references an external system (e.g., "Last synced from S3 at 14:32"), use hardcoded/mock timestamps and values — sell the illusion
- API routes (`app/api/...`) may be used as **lightweight mock endpoints** if needed, but must only return static/mock data

### App Structure

- The app uses a dashboard layout with a sidebar and 5 tab pages (`tab-1` through `tab-5`)
- Shared UI components go in `app/components/`
- Each tab page is a route under `app/tab-{n}/`

### Speed Over Perfection

This is a hackathon — prefer working code over perfect code. Skip unit tests, skip exhaustive error handling. Focus on the demo-able happy path.

### Visual Impact First

Prioritize UI polish and visual storytelling over edge cases. The demo should look impressive at a glance — judges evaluate what they can see.
