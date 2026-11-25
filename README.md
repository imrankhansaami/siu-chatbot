# Sylhet International University — Static Website

A one-page static site modelled on [siu.edu.bd](https://siu.edu.bd), built with
**Tailwind CSS v4** and vanilla JavaScript. Includes an AI assistant that answers
questions about the university.

No framework, no build step for the page itself — the HTML is served as-is and
only the Tailwind stylesheet is compiled.

## Quick start

```bash
npm install      # install the Tailwind CLI (dev dependency)
npm run build    # compile src/input.css -> public/assets/app.css
npm run serve    # serve the repo root on http://localhost:5173
```

`npm run dev` rebuilds the CSS automatically whenever `src/input.css` or the
HTML/JS sources change.

Open `index.html` through a local server (e.g. `npm run serve`). Opening the file
directly with `file://` also works, since everything is relative and local.

## Project layout

```
index.html            the whole one-page site (all sections + chatbot markup)
src/input.css         Tailwind v4 theme, components and utilities (source)
public/assets/
  app.css             generated stylesheet — do not edit by hand
  img/                local images (logo, campus, Vice-Chancellor, hero slides)
assets/js/
  i18n.js             English / Bangla UI switch — page chrome + assistant keys
  kb.js               knowledge base: 64 Q&A entries, 15 programmes, fees, waivers,
                      plus programme-detail content for the drawer
  chatbot.js          hybrid assistant: offline retrieval + optional LLM layer,
                      feedback, handoff, insights
  main.js             header, mega-menus, drawer, hero slider, tabs, accordions,
                      fee calculator, programme drawer
package.json          build / dev / serve scripts
```

Script load order matters and is already set in `index.html`:
`i18n.js` → `kb.js` → `chatbot.js` → `main.js` (all `defer`). `i18n.js` must load
first so `window.SIUi18n` exists when the assistant boots.

## Fee calculator and programme drawer

Both features read `window.SIU_KB` and invent no figures.

**Fee calculator** (`#fee-calculator`, in the `#fees` section)

- Pick a programme (undergraduate / graduate groups) and a waiver, and you get
  the itemised breakdown, the estimated total, the per-semester average and the
  amount payable at admission.
- The **published `→ X BDT` total always wins**. A percentage is used only for
  rows that have no such figure, applied to the tuition component (or the
  admission fee for "off admission fee" rows). A row that cannot be priced —
  a limited-quota waiver with no separable tuition line — is shown as
  *quota-limited* instead of guessing a number.
- Where the published line items do not add up to the official programme total,
  a labelled **"Published total adjustment"** line reconciles them, so the
  arithmetic on screen always equals the total.

**Programme drawer** (`[data-prog-drawer]`)

- Opens from any element carrying `data-programme`: every fee-table row, the
  *Details* button on each department card, the *Find a Program* results, the
  drawer's own related-programme chips and the calculator's
  "See the itemised breakdown" link.
- Shows the overview, key facts, the full fee breakdown, per-semester charges,
  every waiver row priced against that programme, eligibility, study areas,
  indicative career paths, facilities and related programmes.
- Actions: **Calculate fees** (syncs the calculator and scrolls to it),
  **Ask the assistant** (opens the chat with a programme question) and
  **Contact admission**.
- Accessible: `role="dialog"`, `aria-modal`, focus moves to the close button and
  is restored on close, Tab is trapped inside the panel, Escape and the backdrop
  both close it, and the background scroll is locked.

Detail content is keyed by *family* (`cse`, `csi`, `ece`, `ba-english`,
`ba-islamic`, `law`, `business`, `ma-english`) so a day/evening pair or a
graduate variant shares one entry. Curricula, credit counts and placement
statistics are deliberately **not** invented; career lists are labelled
indicative.

## The AI assistant

The assistant is **hybrid** and works with zero setup:

- **Offline knowledge base (default).** A BM25-style retriever searches 64
  hand-written entries covering admission, fees, waivers, programmes, departments,
  hostels, the library, labs, exams, grading, authorities and contact details.
  Follow-up questions ("and waivers?") are understood in context.
- **Optional LLM layer.** Add an API key in the assistant's **Settings** and the
  same retrieved knowledge is sent to a large language model, which phrases the
  answer and can combine several topics. If the LLM call fails for any reason,
  the assistant silently falls back to the offline answer and tells you why.

### Enabling AI mode

The assistant runs on the offline knowledge base by default. To upgrade it:

1. Click the assistant bubble (bottom-right). A one-time **"Optional: add
   your own AI"** card appears — click **Enable AI**. (You can also click the
   **"Knowledge base"** badge in the chat header, or the gear icon.)
2. Pick a provider and paste your API key. The key is stored only in your
   browser's `localStorage` and is sent only to the provider you chose.

**Which providers work from this static page**

| Provider | Works in a browser? | Notes |
| --- | --- | --- |
| Google Gemini | ✅ recommended | Free API key works instantly; key passed in the request URL |
| Groq | ✅ | Free tier, very fast, allows browser access |
| OpenRouter | ✅ | **Defaults to a free model** (`…:free`), so any key works out of the box |
| OpenAI | ❌ | **OpenAI's API blocks direct browser requests (CORS)** — an OpenAI key cannot work here |
| Custom (OpenAI-compatible) | ⚠️ | Depends on that server's CORS config (Ollama, LM Studio, VLLM…) |

The settings panel shows a one-line hint per provider, warns you when you
pick OpenAI, and any failed request shows the real reason in the chat
(e.g. `401 — Invalid API Key`).

**Why did my OpenRouter key "not work"?** OpenRouter's default model was
previously a *paid* model (`openai/gpt-4o-mini`), which needs account
credits — a free-tier key gets a quota error. It now defaults to a **free**
model, so it works with any key. If you prefer a paid model, type its ID
(e.g. `openai/gpt-4o-mini`) into the Model field.

## Assistant upgrades

Five features make the assistant feel embedded in the page rather than bolted on:

### 1. Proactive handoff to the Admission Office

After an answer about admission, the assistant offers a **"Talk to the
Admission Office"** card. The visitor enters a name and mobile number, and
clicking **Open WhatsApp** opens `wa.me/8801754313182` with a prefilled
message quoting what they asked. Nothing is sent to a server — WhatsApp opens
in a new tab and the visitor sends the message themselves. It shows once per
session. A **Call instead** link dials the published mobile number directly.

### 2. Answer feedback + demand logging

Every bot answer gets **👍 / 👎** ("Was this helpful?") underneath. Choosing
👎 opens a short "What was missing?" note box. Both votes and any unanswered
(or low-confidence) questions are logged to `localStorage` under
`siu-assistant.feedback` and `siu-assistant.unanswered` (each capped at 200
rows, repeats bump a counter). Open the assistant **Settings** → **Insights**
to see counts, download `siu-assistant-insights.json`, or clear everything.

### 3. Bangla (বাংলা) UI toggle

A globe icon + "বাংলা"/"English" switch sits in the top brand bar, in the
mobile drawer, and inside the assistant **Settings**. Switching it translates
all UI chrome — navbar, mega-menu, eyebrows, section titles, buttons,
calculator/drawer labels, and assistant controls — via `assets/js/i18n.js`.
The knowledge base and paragraphs stay in English. Choice is stored in
`localStorage` key `siu.lang` and applied to `document.documentElement.lang`.

### 4. Contextual asks

Every "Ask" button (`data-ask`) on department, lab, hostel and facility cards
now also carries `data-context`, so when clicked the chat opens with an
**"Asking about …"** pill showing the card's topic. The card's context nudges
retrieval toward that topic without hijacking an unrelated question, and
clears as soon as the visitor types manually. Six lab panels got new
per-lab **Ask about this lab** buttons.

### 5. "Was this helpful?" + suggested next questions

Below each answer is a "Was this helpful?" prompt followed by chained
suggestions labelled **"Next:"**. Suggestions prefer the current entry's
`links` (related topics) first, then top retrieval neighbours, so one answer
flows naturally into the next.

### 6. Redesigned chat UI

The assistant panel got a full visual refresh:

- **Launcher** — glowing gradient bubble with a subtle pulse ring and hover lift effect.
- **Panel** — dark glass theme: near-black translucent panel (`slate-950` + `backdrop-blur`) with light base text colour (`slate-100`), brand-tinted border glow, bigger at **560px × up to 90vh** (desktop) with smoother open/close animation and refined drop shadow.
- **Header** — vertical gradient (brand-700 → brand-900), larger avatar, status line, and compact action buttons (mode badge, read aloud, settings, clear, close) with hover scale effects.
- **Context pill** — animated "Asking about …" bar appears when you click an "Ask" button on a card, showing which topic you're asking about.
- **Messages** — bot messages in translucent white-on-dark bubbles with white bold text, user messages in solid brand-gradient bubbles, each with a timestamp. Sources shown as brand-tinted pills below bot answers.
- **Typing indicator** — animated three-dot indicator in a styled bubble while the assistant is thinking.
- **Feedback row** — 👍/👎 buttons with hover scale; 👎 opens a "What was missing?" note input with Send/Skip actions.
- **Handoff card** — styled card with rounded inputs, primary "Open WhatsApp" button, "Call instead" link, and "Not now" dismiss option.
- **Suggestions** — **"Next:"** label above chained question chips with hover lift and shadow.
- **Empty state** — centered welcome card with floating icon, title, and description when the chat is empty.
- **Settings panel** — dark slate background with translucent form fields, language toggle pills (dark-aware), provider/key/model inputs, and insights cards — every part of the panel uses the dark palette (white text, `white/5` surfaces, `white/10` borders, brand/crimson/amber accents).
- **Animations** — custom keyframe animations for slide-in messages (pop-in), typing dots, bounce on thinking avatar, and a glowing pulse on the launcher when the chat is empty.
- **Interactive effects** — click ripples on all buttons, pressed-scale on chips and send button, glow-on-focus on input, lift-on-hover on source pills, heartbeat on upvote, burst on "Thanks", shake on validation errors, and slide-up/slide-down transitions for cards and context pills.
- **Three.js background** — animated Earth globe with real continent shapes, 23.5° axial tilt, atmosphere glow, starfield, and city markers (including Sylhet where SIU is located), plus a waving Bangladesh flag. Powered by Three.js on a canvas behind the chat panel (left side). Starts when the panel opens and pauses when it closes.

### 7. Playful talking robot companion

The assistant includes a lightweight inline-SVG robot in the launcher, header,
welcome state and message avatars. No avatar images, external avatar service or
extra JavaScript library is required.

- **Expressions and reactions** — idle blinking, thinking, happy, confused,
  excited and talking states. The robot reacts when the chat opens, while an
  answer is being prepared, after answers, and to positive or negative feedback.
- **Playful interaction** — click the robot in the header for rotating quips;
  positive feedback and selected quips trigger a small confetti celebration.
- **Opt-in speech only** — the header speaker button reads the latest answer
  with the browser's `speechSynthesis`; nothing plays automatically. The robot's
  mouth and sound bars animate while speaking. Press the button again to stop.
  Closing or clearing the chat also stops speech.
- **Accessible by default** — labelled controls, `aria-pressed` speech state,
  keyboard focus styles, and `prefers-reduced-motion` support. Reduced-motion
  mode disables the animation loop and confetti.
- **Bangla-aware chrome** — the assistant title, default status, reactions,
  quips and speech controls use the existing `i18n.js` key system.
  Knowledge-base answers remain in English as before.

## Content

All content is real SIU information (English), scraped from siu.edu.bd:
programmes, fee tables, waiver rules, admission requirements, department and
office descriptions, hostels, library, labs, the Vice-Chancellor's message, and
contact details. Fee figures are labelled with their "last updated" date
(currently 31 October 2025) and should be re-checked against the official site
before relying on them.

## Accessibility & performance

- Inline SVG sprite (no icon-font request), local images, no jQuery/Bootstrap.
- Semantic landmarks, one `h1`, `aria-expanded`/`aria-selected` on interactive
  controls, keyboard-dismissable overlays, skip link, visible focus styles.
- Lazy-loaded below-the-fold images and iframes, scroll-margin so anchored
  sections clear the sticky header.
