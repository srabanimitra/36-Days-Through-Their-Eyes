# 36 Days Through Their Eyes

**An interactive narrative that lets you live through the July 2024 uprising in Bangladesh — through the eyes of ordinary people — with choices grounded in real, cited history.**

Built for Hackathon 2026 — Track B: Spirit of July.

---

## What this is

36 Days Through Their Eyes is not an archive and not a game in the traditional sense. It's a short interactive story where you make decisions as one of several ordinary people living through the 36 days between the quota-reform protests and the fall of the Hasina government in August 2024. Every day you pass through is a real, documented event. Your character's specific choices are fiction, and every major beat is cited to a public source.

> No matter what you choose, **the story always leads back to the same real history.**
> That single rule is what separates this from a branching game — you can change how a moment is lived, never what actually happened.

At the end, your character's story dissolves into a short, sourced account of what really happened — because the goal isn't to invent an alternate history, it's to make a well-documented one easier to feel and remember.

## Why we built it this way

Several strong archival and evidence-verification projects already exist for this movement — most notably the [Bangladesh Protest Archive](https://www.thedailystar.net/news/bangladesh/news/1500-videos-photos-july-atrocities-collected-3813956), a collective effort with thousands of hours of documented footage. We didn't want to build a smaller, weaker version of something that already exists and is done well. Instead, we built the thing an archive can't be on its own: something that makes people *feel* the timeline, not just look it up.

**A note on sensitivity:** every character in this project is a composite, built from publicly reported patterns of experience — not a real named individual, and not anyone's private testimony. Every historical beat is drawn from and cited to public sources (see below). We made this choice deliberately: using real people's private stories without consent isn't something a hackathon weekend gives us the ability to do responsibly.

## Try it

- **Live Demo:** [add your Vercel URL here]
- **GitHub:** [github.com/srabanimitra/36-Days-Through-Their-Eyes](https://github.com/srabanimitra/36-Days-Through-Their-Eyes)
- **Demo Video (3 min):** [add your YouTube/Drive unlisted link here]

## Screenshots

| Home | Character Selection | Journey |
|---|---|---|
| [add image] | [add image] | [add image] |

| Reality Lens | Memorial |
|---|---|
| [add image] | [add image] |

## Goals

- Encourage historical understanding through empathy, not just information.
- Preserve factual accuracy through verifiable, publicly cited sources.
- Present multiple lived perspectives without rewriting or inventing history.
- Create an experience that remains accessible on low-bandwidth, low-end devices.

## Features

- Multiple playable perspectives representing ordinary people living through the movement — the same 12 historical turning points, from the June 2024 quota verdict to Sheikh Hasina's resignation on August 5, 2024
- Every major event cited to a public source, shown inline as you play
- A closing memorial screen connecting each character's fictional arc to real documented events
- Works fully offline once loaded (progressive web app)
- No backend, no accounts, no tracking — a static site that runs entirely in your browser

## Tech stack

- React + Vite
- Static JSON data layer (no database)
- Deployed on Vercel
- Service worker for offline support (`vite-plugin-pwa`)

## Getting started

Clone the repository:

```bash
git clone https://github.com/srabanimitra/36-Days-Through-Their-Eyes.git
cd 36-Days-Through-Their-Eyes
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

Build for production:

```bash
npm run build
```

## Project structure

```
36-Days-Through-Their-Eyes/
├── src/
│   ├── data/
│   │   └── events.json      # the historical timeline + character variants
│   ├── components/
│   │   ├── CharacterSelect.jsx
│   │   ├── Scene.jsx
│   │   └── Ending.jsx
│   └── App.jsx
├── public/
├── README.md
└── LICENSE
```

## Narrative Architecture

```
User
  ↓
Choose Perspective
  ↓
Historical Event
  ↓
Decision
  ↓
Reality Lens
  ↓
Next Event
  ↓
Memorial
```

The story is driven entirely by `src/data/events.json`. Historical beats (dates, events, sources) are defined once; each character has their own scene text and choices layered on top of the same beats. This means the timeline itself never changes between playthroughs — only whose eyes you're seeing it through.

## Sources

The historical timeline is built primarily from:

- July Mass Uprising Memorial Museum — official chronology: [july36.gov.bd/chronology](https://july36.gov.bd/chronology)
- OHCHR Fact-Finding Report: Human Rights Violations and Abuses related to the Protests of July and August 2024 in Bangladesh
- The Daily Star, contemporary reporting
- Wikipedia, "July Uprising" and "July massacre" (cross-reference only, not a primary source)

Full citations for individual events are shown in-app at the point where they're used.

## Team

| Name | Responsibilities |
|---|---|
| [Name 1] | Application architecture, React development, narrative engine, deployment |
| [Name 2] | Historical research, narrative writing, UI/UX, content integration |

## License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

## Acknowledgements

Built with respect for everyone who lived through, documented, and did not survive the events of July–August 2024. Corrections to factual content are welcome via issue or pull request.