/* ==========================================================================
   SIU Knowledge Base
   A curated, structured knowledge base about Sylhet International University.
   Used by the offline retrieval engine in chatbot.js (works with no API key),
   and injected into the system prompt when an LLM key is configured.

   Entry shape
   -----------
   id     : unique slug
   cat    : category (used for grouping / follow-up suggestions)
   q      : canonical question(s) the entry answers
   kw     : extra retrieval keywords (beyond q + a)
   a      : answer, in lightweight markdown:
             **bold**  ·  "- " bullets  ·  [[text|section-id]] in-page link
   links  : optional list of related entry ids
   ========================================================================== */

(function () {
  "use strict";

  const PROGRAMMES = [
    {
      code: "cse-day",
      name: "B.Sc. Engg. in Computer Science & Engineering",
      short: "B.Sc.Engg. CSE (Day)",
      dept: "Computer Science & Engineering",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 325400,
      breakdown: [
        ["Admission fee", "20,000 (one-time)"],
        ["Admission form & other fees", "1,400 (one-time)"],
        ["Registration", "16,000 × 8 semesters = 128,000"],
        ["Tuition fee", "20,000 × 8 semesters = 160,000"],
        ["Library & student activity", "2,000 × 8 semesters = 16,000"],
      ],
      waiver: [
        ["All applicants", "30% off admission fee → 3,19,400 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 1,59,400 BDT"],
        ["Siblings", "50% tuition waiver → 2,39,400 BDT"],
        ["GPA 5.00 + 5.00 (GPA 10 scale)", "80% tuition waiver → 1,91,400 BDT"],
        ["GPA 9.00 – 9.99", "50% tuition waiver → 2,39,400 BDT"],
        ["GPA 8.00 – 8.99", "40% tuition waiver → 2,55,400 BDT"],
        ["GPA 7.00 – 7.99", "30% tuition waiver → 2,71,400 BDT"],
        ["GPA 6.00 – 6.99", "25% tuition waiver → 2,79,400 BDT"],
        ["GPA 5.00 – 5.99", "20% tuition waiver → 2,87,400 BDT"],
      ],
    },
    {
      code: "cse-eve",
      name: "B.Sc. Engg. in Computer Science & Engineering",
      short: "B.Sc.Engg. CSE (Eve)",
      dept: "Computer Science & Engineering",
      duration: "3 years (6 semesters)",
      mode: "Evening / Weekend",
      total: 249400,
      breakdown: [
        ["Admission fee", "20,000 (one-time)"],
        ["Admission form & other fees", "1,400 (one-time)"],
        ["Registration", "16,000 × 6 semesters = 96,000"],
        ["Tuition fee", "20,000 × 6 semesters = 120,000"],
        ["Library & student activity", "2,000 × 6 semesters = 12,000"],
      ],
      waiver: [
        ["All applicants", "30% admission + 25% tuition waiver → 2,13,400 BDT"],
        ["Children of Freedom Fighters & siblings", "50% tuition waiver → 1,83,400 BDT"],
        ["Diploma holders with CGPA ≥ 3.25", "40% tuition waiver → 1,95,400 BDT"],
      ],
    },
    {
      code: "csi-day",
      name: "B.Sc. Engg. in Computer Science & Informatics",
      short: "B.Sc.Engg. CSI (Day)",
      dept: "Computer Science & Informatics",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 253000,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 8 semesters = 112,000"],
        ["Tuition fee", "16,000 × 8 semesters = 128,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 2,47,000 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 1,19,000 BDT"],
        ["Siblings", "50% tuition waiver → 1,83,000 BDT"],
      ],
    },
    {
      code: "ece-day",
      name: "B.Sc. Engg. in Electronics & Communication Engineering",
      short: "B.Sc.Engg. ECE (Day)",
      dept: "Electronics & Communication Engineering",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 253000,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 8 semesters = 112,000"],
        ["Tuition fee", "16,000 × 8 semesters = 128,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 2,47,000 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 1,19,000 BDT"],
        ["Siblings", "50% tuition waiver → 1,83,000 BDT"],
      ],
    },
    {
      code: "ece-eve",
      name: "B.Sc. Engg. in Electronics & Communication Engineering",
      short: "B.Sc.Engg. ECE (Eve)",
      dept: "Electronics & Communication Engineering",
      duration: "3 years (6 semesters)",
      mode: "Evening / Weekend",
      total: 193000,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 6 semesters = 84,000"],
        ["Tuition fee", "16,000 × 6 semesters = 96,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 1,87,000 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 91,000 BDT"],
        ["Siblings", "50% tuition waiver → 1,39,000 BDT"],
      ],
    },
    {
      code: "ba-english",
      name: "BA (Hons) in English",
      short: "BA Hons in English",
      dept: "English",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 293400,
      breakdown: [
        ["Admission fee", "20,000 (one-time)"],
        ["Admission form & other fees", "1,400 (one-time)"],
        ["Registration", "16,000 × 8 semesters = 128,000"],
        ["Tuition fee", "16,000 × 8 semesters = 128,000"],
        ["Library & student activity", "2,000 × 8 semesters = 16,000"],
      ],
      waiver: [
        ["All applicants", "30% off admission fee → 2,87,400 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 1,59,400 BDT"],
        ["Siblings", "50% tuition waiver → 2,23,400 BDT"],
        ["GPA 5.00 + 5.00", "80% tuition waiver → 1,85,000 BDT"],
        ["GPA 9.00 – 9.99", "50% tuition waiver → 2,23,400 BDT"],
        ["GPA 8.00 – 8.99", "40% tuition waiver → 2,36,200 BDT"],
      ],
    },
    {
      code: "ba-islamic",
      name: "BA (Hons) in Islamic Studies",
      short: "BA Hons in Islamic Studies",
      dept: "English / Islamic Studies",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 96000,
      breakdown: [
        ["Registration + semester fees", "12,000 × 8 semesters = 96,000"],
      ],
      waiver: [
        ["Children of Freedom Fighters", "100% tuition waiver (limited quota)"],
        ["GPA 5.00 in both SSC & HSC", "100% tuition waiver (limited quota)"],
        ["Sum of GPA 8.00 – 9.99", "50% tuition waiver (limited quota)"],
      ],
    },
    {
      code: "llb",
      name: "Bachelor of Laws (LL.B)",
      short: "Bachelor of Laws (LL.B)",
      dept: "Law",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 311400,
      breakdown: [
        ["Admission fee", "20,000 (one-time)"],
        ["Admission form & other fees", "1,400 (one-time)"],
        ["Registration", "16,000 × 8 semesters = 128,000"],
        ["Tuition fee", "19,000 × 8 semesters = 152,000"],
        ["Library & student activity", "2,000 × 8 semesters = 16,000"],
      ],
      waiver: [
        ["All applicants", "30% off admission fee → 3,05,400 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 1,59,400 BDT"],
        ["Siblings", "50% tuition waiver → 2,35,400 BDT"],
        ["GPA 5.00 + 5.00", "80% tuition waiver → 1,89,800 BDT"],
        ["GPA 9.00 – 9.99", "50% tuition waiver → 2,35,400 BDT"],
        ["GPA 8.00 – 8.99", "40% tuition waiver → 2,73,400 BDT"],
        ["GPA 5.00 – 5.99", "20% tuition waiver → 2,81,000 BDT"],
      ],
    },
    {
      code: "bba",
      name: "Bachelor of Business Administration (BBA)",
      short: "BBA (4 years)",
      dept: "Business Administration",
      duration: "4 years (8 semesters)",
      mode: "Full-time / Day",
      total: 141400,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 8 semesters = 112,000"],
        ["Tuition fee", "2,500 × 8 semesters = 20,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 1,35,400 BDT"],
        ["GPA 5.00 + 5.00", "80% tuition waiver (limited quota)"],
        ["Sum of GPA 8.00 – 9.99", "50% tuition waiver (limited quota)"],
      ],
    },
    {
      code: "ma-english",
      name: "M.A. in English (1 year)",
      short: "M.A. in English (1 year)",
      dept: "English",
      duration: "1 year (2 semesters)",
      mode: "Full-time / Day",
      total: 59000,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 2 semesters = 28,000"],
        ["Tuition fee", "9,000 × 2 semesters = 18,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 53,000 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 35,000 BDT"],
      ],
    },
    {
      code: "ma-english-pf",
      name: "M.A. in English (Preliminary & Final)",
      short: "M.A. in English (Prelim & Final)",
      dept: "English",
      duration: "2 years (4 semesters)",
      mode: "Full-time / Day",
      total: 105000,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 4 semesters = 56,000"],
        ["Tuition fee", "9,000 × 4 semesters = 36,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 99,000 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 72,000 BDT"],
      ],
    },
    {
      code: "mba-1",
      name: "MBA (1 year)",
      short: "MBA (1 year)",
      dept: "Business Administration",
      duration: "1 year (2 semesters)",
      mode: "Full-time / Day",
      total: 93400,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 2 semesters = 28,000"],
        ["Tuition fee", "9,000 × 2 semesters = 18,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 87,400 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 69,400 BDT"],
      ],
    },
    {
      code: "mba-exec",
      name: "MBA Executive (1.5 years)",
      short: "MBA Executive (1.5 years)",
      dept: "Business Administration",
      duration: "1.5 years (3 semesters)",
      mode: "For working professionals",
      total: 129400,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 3 semesters = 42,000"],
        ["Tuition fee", "22,000 × 3 semesters = 66,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 1,23,400 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 63,400 BDT"],
      ],
    },
    {
      code: "mba-regular",
      name: "MBA Regular (2 years)",
      short: "MBA Regular (2 years)",
      dept: "Business Administration",
      duration: "2 years (4 semesters)",
      mode: "Full-time / Day",
      total: 165400,
      breakdown: [
        ["Admission fee", "12,000 (one-time)"],
        ["Admission form & other fees", "1,000 (one-time)"],
        ["Registration", "14,000 × 4 semesters = 56,000"],
        ["Tuition fee", "23,000 × 4 semesters = 92,000"],
      ],
      waiver: [
        ["All applicants", "50% off admission fee → 1,59,400 BDT"],
        ["Children of Freedom Fighters", "100% tuition waiver → 73,400 BDT"],
      ],
    },
    {
      code: "llm-1",
      name: "LL.M (1 year)",
      short: "LL.M (1 year)",
      dept: "Law",
      duration: "1 year (2 semesters)",
      mode: "Full-time / Day",
      total: 95400,
      breakdown: [
        ["Admission fee", "20,000 (one-time)"],
        ["Admission form & other fees", "1,400 (one-time)"],
        ["Registration", "16,000 × 2 semesters = 32,000"],
        ["Tuition fee", "19,000 × 2 semesters = 38,000"],
        ["Library & student activity", "2,000 × 2 semesters = 4,000"],
      ],
      waiver: [
        ["All applicants", "30% off admission fee → 89,400 BDT"],
        ["Children of Freedom Fighters", "50% tuition waiver → 70,400 BDT"],
        ["SIU students", "25% tuition waiver → 79,900 BDT"],
      ],
    },
  ];

  const DEPARTMENTS = [
    {
      abbr: "CSE",
      name: "Computer Science & Engineering",
      offers: "B.Sc. Engg. in CSE (Day 4 yrs · Evening 3 yrs)",
      blurb:
        "The founding department of SIU and the largest on campus. Covers algorithms, systems, AI and machine learning, computer vision, networks and software engineering, backed by the Software Lab and a dedicated programming club.",
    },
    {
      abbr: "CSI",
      name: "Computer Science & Informatics",
      offers: "B.Sc. Engg. in CSI (Day 4 yrs · Evening 3 yrs)",
      blurb:
        "Focuses on computing theory and information science — data structures, databases, operating systems, web technologies and information security — with a strong lab-based curriculum.",
    },
    {
      abbr: "ECE",
      name: "Electronics & Communication Engineering",
      offers: "B.Sc. Engg. in ECE (Day 4 yrs · Evening 3 yrs)",
      blurb:
        "Covers microelectronics, signals and systems, digital communication, embedded systems and VLSI, supported by dedicated electronics, electronics-and-machine laboratories.",
    },
    {
      abbr: "English",
      name: "English",
      offers: "BA (Hons) in English · M.A. in English · B.A. Hons in Islamic Studies",
      blurb:
        "Literature, linguistics, ELT and communication studies, plus Islamic Studies. Runs seminars, the SIU Debating Club and guardians' meetings, and publishes peer-reviewed research.",
    },
    {
      abbr: "Law",
      name: "Law",
      offers: "Bachelor of Laws (LL.B) · LL.M (1 & 2 years)",
      blurb:
        "A professional LL.B programme with mooting, courtroom visits and clinical exposure. Home of the Moot Court Society and part of SIU's legal education and research activities.",
    },
    {
      abbr: "BBA",
      name: "Business Administration",
      offers: "BBA (4 yrs) · MBA (1 yr) · MBA Executive (1.5 yrs) · MBA Regular (2 yrs)",
      blurb:
        "Management, accounting, marketing, finance and organisational behaviour, with practical exposure through case competitions, career talks and internship links.",
    },
  ];

  const ENTRY = [
    /* ---------------------------------------------------------------- intro */
    {
      id: "intro",
      cat: "General",
      q: ["What is Sylhet International University?", "Tell me about SIU", "About this university"],
      kw: ["introduction", "info", "brief", "history", "background", "what is"],
      a: `**Sylhet International University (SIU)** is a privately funded, non-profit institution of higher learning and research in Sylhet, Bangladesh.

- **Established** under the Private University Act 1992 and affiliated with the **University Grants Commission (UGC) of Bangladesh**
- **Campus:** its own campus at Shamimabad, Bagbari, Sylhet — inside the city, in a calm area, within walking distance of Osmani Medical College Hospital
- **Medium of instruction:** English
- **Schools/departments:** Computer Science & Engineering, Computer Science & Informatics, Electronics & Communication Engineering, English, Law and Business Administration
- **Degrees:** undergraduate (4-year day, 3-year evening) and graduate programmes
- **Affiliation:** UGC-recognised, so degrees are accepted for higher study and employment at home and abroad

SIU's aim is to provide quality education relevant to the needs of a dynamic society — not simply to make students pass examinations, but to make them productive members of the community and lifelong learners.`,
      links: ["mission", "vision", "vc-message", "campus", "contact"],
    },
    {
      id: "mission",
      cat: "General",
      q: ["What is the mission of the university?", "Mission of SIU"],
      kw: ["mission", "aim", "objective", "goal", "purpose", "aims"],
      a: `The principal aim of SIU is to **provide high-quality education at undergraduate and postgraduate levels relevant to the needs of a dynamic society**.

The mission is achieved by:
- Providing an excellent teaching-learning environment
- Providing professionally accomplished faculty with an appropriate balance of academic qualifications
- Providing financial grants to poor but meritorious students
- Imparting education with ethical concern and social responsibility
- Stimulating the search for knowledge
- Encouraging inquiry and conversation across traditional academic disciplines
- Promoting opportunities for students to develop as creative, independent thinkers and leaders`,
      links: ["vision", "overview"],
    },
    {
      id: "vision",
      cat: "General",
      q: ["What is the vision of the university?", "Vision of SIU"],
      kw: ["vision", "dream", "future", "aspiration"],
      a: `The vision of Sylhet International University is to **infuse into its students a passion for learning** that will help them grow in their professional lives, and thereby contribute to building a **better society of the 21st century**.`,
      links: ["mission"],
    },
    {
      id: "overview",
      cat: "General",
      q: ["Give me an overview of the university", "What is SIU known for?"],
      kw: ["overview", "summary", "highlight", "glance", "reputation", "ranking"],
      a: `**SIU at a glance**

- A privately funded, non-profit institution dedicated to providing quality education commensurate with investment
- Academically rigorous but **practical** instruction in professional disciplines, meeting the growing demand for human-resource development
- With increasing internationalisation of higher education, SIU has initiated **collaborative programmes with universities in the USA, Australia, Canada and the United Kingdom**
- Established from the beginning with a **campus of its own** in a relatively calm and quiet part of the city — ideal for the pursuit of knowledge
- Degrees are recognised across Bangladesh and internationally; SIU credits are accepted by universities at home and abroad`,
      links: ["campus", "facilities", "international"],
    },
    {
      id: "vc-message",
      cat: "People",
      q: ["Who is the vice chancellor?", "Tell me about the VC"],
      kw: ["vice chancellor", "vc", "professor", "ashraful", "alam", "head", "principal", "message"],
      a: `The Vice-Chancellor of Sylhet International University is **Prof. Dr. Md. Ashraful Alam**.

In his message to students he says:

> "Welcome to Sylhet International University, where excellence is nurtured, pursued and celebrated."

He notes that SIU was established with a view to creating an educational institution *with a difference* — providing quality education while producing skilled professionals with a **high standard of human and moral values**. The University believes education is a catalyst for positive change and the cornerstone of strong, resilient communities.`,
      links: ["chancellor", "contact"],
    },
    {
      id: "chancellor",
      cat: "People",
      q: ["Who is the chancellor?", "Who is the chairman of the trust?"],
      kw: ["chancellor", "chairman", "chairperson", "founder", "trust", "bot", "rajib", "head of state"],
      a: `SIU is governed by the **Sylhet International University Trust**, whose Chairman serves as the **Honourable Chancellor** of the university. The Trust's chairman leads the university and engages with faculty and students through regular meetings.

University governance is exercised through:
- The **Board of Trustees (BOT)** — the supreme governing body
- The **Syndicate**
- The **Academic Council**
- The **Finance Committee**
- The **Disciplinary Committee**

You will find the full list of statutory bodies and offices under *Authority* and *Administration* in the main navigation.`,
      links: ["vc-message", "authority"],
    },
    {
      id: "authority",
      cat: "People",
      q: ["Who governs the university?", "What are the statutory bodies?", "What is the Syndicate or Academic Council?"],
      kw: ["authority", "governance", "board of trustees", "syndicate", "academic council", "finance committee", "disciplinary", "body", "committee", "management"],
      a: `SIU's academic and administrative affairs are run through these statutory bodies:

- **Board of Trustees (BOT)** — the supreme governing body of the university, chaired by the Chairman of the Sylhet International University Trust
- **Syndicate** — the senior body responsible for policy, finance and administrative oversight
- **Academic Council** — responsible for academic policy, curricula, teaching and research matters
- **Finance Committee** — handles budgeting, accounts and financial planning
- **Disciplinary Committee** — deals with student and staff disciplinary matters

**Offices of the university** include the Chairman, Vice-Chancellor, Treasurer, Registrar, Proctor, Controller of Examinations, Public Relations, Library Office and departmental officers.`,
      links: ["contact", "vc-message"],
    },

    /* ------------------------------------------------------------ admission */
    {
      id: "admission-process",
      cat: "Admission",
      q: [
        "How do I apply to SIU?",
        "What is the admission process?",
        "How can I get admitted?",
        "Admission steps",
      ],
      kw: ["apply", "application", "process", "procedure", "steps", "how to join", "enroll", "apply now"],
      a: `The **admission office** advises prospective students and guardians, and individual counselling on campus is encouraged — you are welcome to visit.

**Typical steps**
1. **Choose your programme** — use the *Find a Program* filter (undergraduate or graduate) or the *Admission* menu.
2. **Collect the admission form** from the Admission Office or the campus office.
3. **Submit the completed form** with your SSC and HSC transcripts/certificates, photographs and any diploma certificates (for diploma holders).
4. **Pay the admission fee** and registration as per the published fee structure.
5. **Receive your admission confirmation** and student ID, then complete orientation.

**Undergraduate eligibility**
- At least a **2.5 GPA in each of SSC and HSC** from a board of university or equivalent examination
- **Diploma in Engineering** from BTEB (or a BTEB-recognised diploma) with **GPA 2.5 out of 4.0** may be admitted into the B.Sc. Engineering programme

**International applicants** must meet the same academic standards as local students, plus English proficiency, and certification of adequate financial resources.`,
      links: ["eligibility", "fees", "documents", "waiver", "international"],
    },
    {
      id: "eligibility",
      cat: "Admission",
      q: [
        "What are the admission requirements?",
        "Am I eligible?",
        "What GPA do I need?",
        "Minimum requirements",
        "What is the cutoff?",
      ],
      kw: ["requirement", "eligibility", "eligible", "criteria", "gpa", "cgpa", "cutoff", "cut off", "minimum", "qualification", "marks", "score"],
      a: `**Undergraduate admission requirements**
- At least **2.5 GPA in each** of **SSC** and **HSC** from a board of university or equivalent examination
- Or a **Diploma in Engineering** from the **Bangladesh Technical Education Board (BTEB)** — or any BTEB-recognised diploma — with a **GPA of 2.5 or above out of 4.0**, for admission to the B.Sc. Engineering programme

**International students** must meet the same academic standards as local applicants. Because educational systems vary worldwide, international applicants are selected on the basis of:
- their **academic work**
- **proficiency in English and Mathematics**
- **probability of success** in the chosen curriculum
- **certification of adequate financial resources**

**Transfer credits:** credits earned at previously attended colleges and universities are evaluated for acceptance toward SIU degrees by faculty members. Submit transcripts from your previous institutions for evaluation. SIU credits are, in turn, accepted by universities at home and abroad.`,
      links: ["admission-process", "documents", "international", "transfer-credit"],
    },
    {
      id: "documents",
      cat: "Admission",
      q: ["What documents do I need to apply?", "Required documents for admission"],
      kw: ["document", "paper", "certificate", "transcript", "testimonial", "photograph", "photo", "proof", "need to bring", "attach", "upload"],
      a: `Bring or submit the following with your application:

- **SSC certificate / transcript**
- **HSC certificate / transcript**
- **Diploma certificate** — required if you are applying through the BTEB engineering diploma route
- **Passport-size photographs**
- **Previous institution's transcripts** — required if you are claiming transfer credits
- **National ID / birth certificate** and any other documents specified by the admission office for your programme

For international applicants, also keep your **passport, visa/valid travel documents and financial certification** ready.

Always confirm the exact list for your programme with the **Admission Office** before you travel to campus.`,
      links: ["admission-process", "eligibility", "verification"],
    },
    {
      id: "graduate-admission",
      cat: "Admission",
      q: ["How do I apply for a postgraduate / MBA / LL.M / M.A. programme?", "Graduate admission"],
      kw: ["postgraduate", "graduate", "mba", "ma", "master", "llm", "masters", "ms", "mba admission", "higher study"],
      a: `SIU offers these **graduate programmes**:

- **M.A. in English** — 1 year, or Preliminary & Final (2 years)
- **MBA** — 1 year · **MBA Executive** 1.5 years (for working professionals) · **MBA Regular** 2 years
- **LL.M** — 1 year, or 2 years

For any graduate programme the process is the same as undergraduate: collect the form from the Admission Office, submit your **last degree certificate and transcript** along with the required photographs, pay the admission fee, and complete registration. Some programmes may shortlist candidates with a written test or an interview, so check the latest **notices** section or contact the Admission Office directly.

International students must satisfy the same academic standards as local students and certify adequate financial resources.`,
      links: ["fees", "admission-process", "departments"],
    },
    {
      id: "international",
      cat: "Admission",
      q: ["I am an international student — can I apply?", "International students", "Foreign student admission"],
      kw: ["international", "foreign", "nepali", "indian", "bangladeshi abroad", "overseas", "outside", "global", "abroad"],
      a: `Yes. International applicants who seek admission at SIU must meet **the same academic standards** as local students. Since educational systems vary widely across the world, international applicants are selected on the basis of:

- their **academic work**
- **proficiency in English and Mathematics**
- **probability of success** in the chosen curriculum
- **certification of adequate financial resources**

SIU has initiated collaborative programmes with universities in the **USA, Australia, Canada and the United Kingdom**, and credits earned at SIU are accepted by universities at home and abroad. Use the **Admission Query Form** linked under *Admission* in the main menu, or contact the Admission Office for guidance.`,
      links: ["admission-process", "transfer-credit", "contact"],
    },
    {
      id: "transfer-credit",
      cat: "Academics",
      q: ["Can I transfer credits from another university?", "Transfer credit / migration"],
      kw: ["transfer", "credit transfer", "migration", "migrate", "transfer student", "credit", "lateral entry", "equivalent"],
      a: `Yes. **Credits earned at previously attended colleges and universities** will be evaluated for acceptance toward SIU degrees **by faculty members**.

To apply:
1. Submit **transcripts from your previous institution(s)** for evaluation.
2. Faculty review decides which credits count toward your SIU degree.
3. The evaluation is handled by the relevant department and the Controller of Examinations.

In the other direction, **credits earned at SIU are accepted by universities at home and abroad** — some SIU students have already migrated to foreign universities with their credits accepted.

Engineering diploma holders with a BTEB diploma (GPA 2.5+ out of 4.0) may also enter the B.Sc. Engineering programme.`,
      links: ["eligibility", "grading", "exams"],
    },
    {
      id: "verification",
      cat: "General",
      q: ["How do I verify my degree or certificate?", "Degree verification"],
      kw: ["verify", "verification", "attest", "attestation", "certificate verify", "authentic", "transcript request", "proof of degree"],
      a: `SIU provides a dedicated **Verification** service for confirming the authenticity of its degrees and certificates.

- Use the **Verification** link in the main navigation to start a verification request.
- Be ready to provide your **registration number / student ID** and the details of the degree being verified.
- Verifications may also be requested for employers, higher-study applications or professional bodies.

If your request needs a formal attestation, contact the **Office of the Registrar** or the **Controller of Examinations** for the current process and any applicable fees.`,
      links: ["contact", "registrar", "exams"],
    },
    {
      id: "admission-query",
      cat: "Admission",
      q: ["I have a question about admission", "How do I contact the admission office?"],
      kw: ["question", "query", "ask", "enquiry", "inquiry", "counselling", "counseling", "not sure", "help decide"],
      a: `The **admission office advises prospective students and guardians** regarding admission to SIU. Students and guardians are always welcome, and are encouraged to **visit the campus for individual counselling**.

- The **Admission Query Form** is linked directly under *Admission* in the main menu — it is the fastest way to get a written reply.
- You can also call the university PABX or use the contact form on the *Contact* section.
- Coming to campus lets you see the laboratories, library and hostel in person before you decide.`,
      links: ["contact", "campus", "fees"],
    },

    /* ----------------------------------------------------------------- fees */
    {
      id: "fees",
      cat: "Fees",
      q: [
        "What is the tuition fee?",
        "How much does it cost?",
        "Total cost of the programme",
        "Fee structure",
        "Semester fee",
        "University fees",
      ],
      kw: ["fee", "fees", "tuition", "tuition fee", "cost", "price", "money", "bdt", "taka", "payment", "pay", "budget", "expensive", "charge", "structure", "how much"],
      a: `**Total fees by programme** (figures last updated 31 October 2025, in BDT)

**Undergraduate**
- B.Sc. Engg. CSE (Day, 4 yrs) — **3,25,400**
- B.Sc. Engg. CSE (Evening, 3 yrs) — **2,49,400**
- B.Sc. Engg. CSI (Day, 4 yrs) — **2,53,000**
- B.Sc. Engg. ECE (Day, 4 yrs) — **2,53,000**
- B.Sc. Engg. ECE (Evening, 3 yrs) — **1,93,000**
- BA (Hons) in English (4 yrs) — **2,93,400**
- BA (Hons) in Islamic Studies (4 yrs) — **96,000**
- Bachelor of Laws / LL.B (4 yrs) — **3,11,400**
- BBA (4 yrs) — **1,41,400**

**Graduate**
- M.A. in English (1 yr) — **59,000**
- M.A. in English (Prelim & Final) — **1,05,000**
- MBA (1 yr) — **93,400**
- MBA Executive (1.5 yrs) — **1,29,400**
- MBA Regular (2 yrs) — **1,65,400**
- LL.M (1 yr) — **95,400**

Most programmes build the total from a one-time admission fee, a one-time form charge, then per-semester **registration + tuition + library/student-activity** charges. Ask me about **any specific programme** and I will break the total down item by item, including the waiver options.`,
      links: ["fee-cse", "waiver", "payment", "scholarship"],
    },
    {
      id: "fee-cse",
      cat: "Fees",
      q: ["How much is CSE / engineering?", "Fee for engineering", "Fee for computer science"],
      kw: ["cse", "engineering", "engineering fee", "computer science fee", "cse fee", "ece", "csi", "breakdown", "item wise", "structure detail"],
      a: `**Engineering programmes (total, BDT)**

- **B.Sc. Engg. CSE — Day, 4 years: 3,25,400**
  Admission 20,000 · Form & other 1,400 · Registration 16,000 × 8 · Tuition 20,000 × 8 · Library & student activity 2,000 × 8
- **B.Sc. Engg. CSE — Evening, 3 years: 2,49,400**
  Admission 20,000 · Form & other 1,400 · Registration 16,000 × 6 · Tuition 20,000 × 6 · Library & activity 2,000 × 6
- **B.Sc. Engg. CSI — Day, 4 years: 2,53,000**
  Admission 12,000 · Form & other 1,000 · Registration 14,000 × 8 · Tuition 16,000 × 8
- **B.Sc. Engg. ECE — Day, 4 years: 2,53,000**
  Admission 12,000 · Form & other 1,000 · Registration 14,000 × 8 · Tuition 16,000 × 8
- **B.Sc. Engg. ECE — Evening, 3 years: 1,93,000**
  Admission 12,000 · Form & other 1,000 · Registration 14,000 × 6 · Tuition 16,000 × 6

With the standard 30% admission-fee discount, for example, the day CSE programme comes to **3,19,400 BDT**. Children of Freedom Fighters receive a **100% tuition waiver**, bringing it to **1,59,400 BDT**.`,
      links: ["fees", "waiver", "scholarship"],
    },
    {
      id: "waiver",
      cat: "Fees",
      q: [
        "Is there any fee waiver or scholarship?",
        "Do I get a scholarship?",
        "Tuition waiver",
        "Discount on fees",
      ],
      kw: ["waiver", "waive", "scholarship", "scholarships", "discount", "free", "concession", "merit", "financial aid", "stipend", "reduction", "rebate", "hardship"],
      a: `Yes — SIU offers **fee waivers of up to 100% of tuition**, and the campus markets this as *"Up To 100% Scholarship"*.

**Main waiver categories**
- **Children of Freedom Fighters** — **100% tuition waiver** on most programmes (the single largest concession)
- **Siblings** — **50% tuition waiver** when a sibling is already studying at SIU
- **Merit / GPA-based** — tuition waiver scaled to your SSC + HSC GPA
- **Diploma holders** — e.g. CGPA ≥ 3.25 gets a 40% tuition waiver on the CSE evening programme
- **SIU students applying to LL.M** — 25% tuition waiver
- **All applicants** — everyone gets an admission-fee discount (30% on CSE/English/Law/Islamic Studies, 50% on CSI/ECE/BBA)

**Example — GPA-scaled waiver on B.Sc. Engg. CSE (Day)**
- 2.5 + 2.5 GPA → 80% waiver → 1,91,400 BDT
- 9.00 – 9.99 → 50% waiver → 2,39,400 BDT
- 8.00 – 8.99 → 40% waiver → 2,55,400 BDT
- 7.00 – 7.99 → 30% waiver → 2,71,400 BDT
- 6.00 – 6.99 → 25% waiver → 2,79,400 BDT
- 5.00 – 5.99 → 20% waiver → 2,87,400 BDT

Waivers on B.A. Hons in Islamic Studies and BBA include limited-quota 100% / 50% merit categories. Ask me about **your programme and GPA** and I will compute your exact fee.`,
      links: ["fees", "scholarship", "fee-cse"],
    },
    {
      id: "scholarship",
      cat: "Fees",
      q: ["Tell me about scholarships at SIU", "Financial aid", "Can poor students get help?"],
      kw: ["scholarship", "financial", "aid", "grant", "poor", "needy", "meritorious", "talent", "free tuition", "support"],
      a: `SIU's mission explicitly includes **"providing financial grants to poor but meritorious students"**, and its facilities list promotes **"Up To 100% Scholarship"**.

In practice the aid is delivered through the **tuition-fee waiver scheme** rather than separate external scholarships:
- **100% tuition waiver** for children of Freedom Fighters, and limited-quota 100% merit categories
- **50% tuition waiver** for siblings studying at SIU
- **GPA-scaled tuition waivers** from 20% up to 80% depending on your SSC + HSC result
- **Diploma-holder concessions** for BTEB diploma entrants

If you have financial difficulty, raise it with the **Admission Office** during counselling — merit waivers and, in some cases, instalment arrangements are best confirmed in person before admission.`,
      links: ["waiver", "fees", "admission-query"],
    },
    {
      id: "payment",
      cat: "Fees",
      q: ["How do I pay the fees?", "Payment methods", "Instalments", "When do I pay?"],
      kw: ["pay", "payment", "method", "installment", "instalment", "deadline", "due date", "bank", "mobile banking", "bikash", "nagad", "late fine", "money order"],
      a: `Fees are collected by the **university office / Treasurer's Office** in line with the published fee structure, which separates:

- a **one-time admission fee** and **admission form & other charges**, payable at admission
- **per-semester** registration, tuition, and library / student-activity charges, payable at the start of each semester

For the exact accepted modes — cash at the office, bank draft/cheque, or mobile banking — and any instalment or late-payment arrangement, confirm with the **Office of the Treasurer** or the Admission Office, since methods and deadlines are published in the current notices.`,
      links: ["fees", "waiver", "treasurer", "notices"],
    },

    /* ------------------------------------------------------------- academics */
    {
      id: "syllabus",
      cat: "Academics",
      q: ["What is the syllabus?", "Course outline", "Curriculum", "Subjects offered"],
      kw: ["syllabus", "curriculum", "course", "subject", "outline", "module", "credit", "semester wise", "curriculum structure"],
      a: `Each department publishes its own **syllabus** covering core and elective courses, credits and semester-wise distribution.

- Find the full syllabus documents under **Academic → Syllabus** in the main menu, or from the **Downloads** page.
- For the credit structure, course lists and pre-requisites of a specific programme, ask the **department concerned** — or tell me the programme here and I will point you to the right department and its teaching areas.

For a quick sense of what each department covers, see [[the department list|departments]].`,
      links: ["departments", "academic-calendar", "downloads", "grading"],
    },
    {
      id: "academic-calendar",
      cat: "Academics",
      q: ["When do semesters start?", "Academic calendar", "Class schedule", "Exam schedule"],
      kw: ["calendar", "semester start", "session", "schedule", "routine", "timetable", "class time", "academic year", "session start", "when do classes"],
      a: `The **Academic Calendar** published under **Academic → Academic Calendar** sets out the official dates for each session:

- semester start and end dates
- registration and course registration windows
- midterm and submission deadlines
- examination, result publication and re-sit schedules
- semester breaks and holidays

Check the calendar together with the **Notices** section, because dates for the current session are confirmed by circular each semester.`,
      links: ["exams", "syllabus", "notices"],
    },
    {
      id: "grading",
      cat: "Academics",
      q: ["How is grading done?", "Grading system", "CGPA calculation", "GPA scale"],
      kw: ["grade", "grading", "cgpa", "gpa", "grade point", "transcript", "credit", "classification", "pass fail", "marks"],
      a: `SIU follows the **4.0 grade-point scale** common to Bangladeshi universities, and reports the **CGPA** on a 4.0 basis alongside the GPA-5 / GPA-10 equivalents used for admission eligibility.

**How it works**
- Each course carries **credits**, and your grade point for that course is multiplied by the credits to give credit points.
- **CGPA = total credit points earned ÷ total credit attempted**, rounded to two decimals.
- Waiver thresholds are quoted both ways — for example, a **diploma CGPA of 3.25 (out of 4.0)** earns a 40% tuition waiver, while **SSC + HSC totals** are quoted on the 5.0/10.0 scale.

Course-wise marks, credit hours and grade points appear on your **transcript**, issued by the Controller of Examinations.`,
      links: ["exams", "verification", "waiver", "transfer-credit"],
    },
    {
      id: "exams",
      cat: "Academics",
      q: ["How do exams work?", "Examination system", "When are exams held?", "Re-sit / back exam"],
      kw: ["exam", "examination", "test", "exam schedule", "resit", "re-sit", "back exam", "supplementary", "quiz", "marks", "result", "grading", "invigilator", "mcq"],
      a: `Examinations are conducted by the **Office of the Controller of Examinations**.

- **Schedule:** exam, midterm and result dates come from the **Academic Calendar** each semester.
- **Format:** courses use a combination of continuous assessment (quiz, assignment, presentation, lab work) and end-of-term written examinations.
- **Re-sit / supplementary papers** are arranged through the Controller of Examinations — check the current notices for the deadline and any fee.
- **Results and transcripts** are issued by the same office, and feed directly into your CGPA and any certificate verification.

The **Proctor's Office** handles student conduct, attendance discipline and matters during the examination period.`,
      links: ["academic-calendar", "grading", "proctor", "verification", "notices"],
    },
    {
      id: "medium",
      cat: "Academics",
      q: ["What is the medium of instruction?", "Is the teaching in Bangla or English?"],
      kw: ["language", "medium", "instruction", "bangla", "english", "bengali", "medium of instruction", "teach in"],
      a: `The **medium of instruction at Sylhet International University is English** — this applies across the undergraduate and graduate programmes.

International applicants should note that **proficiency in English** (along with Mathematics) is one of the criteria used in selection.`,
      links: ["international", "eligibility"],
    },
    {
      id: "academic-support",
      cat: "Academics",
      q: ["Do students get academic support?", "Tutoring", "Faculty support", "Mentoring"],
      kw: ["support", "help", "tutor", "tutoring", "mentor", "mentoring", "advisor", "supervisor", "faculty support", "extra class", "remedial", "weak student"],
      a: `Yes. Students have several layers of academic support:

- **Departmental faculty** — continuous in-class support plus consultation outside class hours
- **Class representatives and course coordinators** — for registration, course choice and routine issues
- **Software, computer and browsing laboratories** — open practice time beyond class hours
- **Semester systems** — for weak or missed courses, remediation or a re-sit is arranged through the department and the Controller of Examinations
- **Project and internship supervision** — for undergraduate projects and MBA / BBA / LL.B programmes

The Registrar's Office handles registration and academic records; the Proctor's Office handles attendance and conduct issues.`,
      links: ["labs", "registrar", "proctor", "exams"],
    },

    /* ------------------------------------------------------------ departments */
    {
      id: "departments",
      cat: "Departments",
      q: [
        "What departments are there?",
        "List the faculties",
        "Which programmes are offered?",
        "What courses can I study?",
      ],
      kw: ["department", "departments", "faculty", "faculties", "programme", "programmes", "program", "programs", "course list", "offer", "discipline", "majors", "what can i study", "browse"],
      a: `SIU has **six departments**, each with its own programme list:

- **Computer Science & Engineering (CSE)** — B.Sc. Engg. CSE (Day 4 yrs · Evening 3 yrs)
- **Computer Science & Informatics (CSI)** — B.Sc. Engg. CSI (Day 4 yrs · Evening 3 yrs)
- **Electronics & Communication Engineering (ECE)** — B.Sc. Engg. ECE (Day 4 yrs · Evening 3 yrs)
- **English** — BA (Hons) in English · M.A. in English · B.A. Hons in Islamic Studies
- **Law** — Bachelor of Laws (LL.B) · LL.M (1 yr / 2 yrs)
- **Business Administration** — BBA · MBA (1 yr) · MBA Executive (1.5 yrs) · MBA Regular (2 yrs)

Tell me a department name and I'll explain its teaching areas, labs and societies. Or use the **Find a Program** filter at the top of this page to narrow the list by level.`,
      links: ["cse", "csi", "ece", "english", "law", "bba", "fees"],
    },
    {
      id: "cse",
      cat: "Departments",
      q: ["Tell me about CSE", "Computer Science and Engineering department"],
      kw: ["cse", "computer science", "computing", "software engineering", "ai", "artificial intelligence", "programming", "coding"],
      a: `**Department of Computer Science & Engineering (CSE)**

- **Programmes:** B.Sc. Engg. in CSE — Day (4 years / 8 semesters) and Evening (3 years / 6 semesters)
- **Fees:** 3,25,400 BDT (Day) · 2,49,400 BDT (Evening), before waivers
- **Teaching areas:** algorithms and data structures, operating systems, computer networks, databases, software engineering, artificial intelligence and machine learning, computer vision, web technologies, parallel and distributed computing
- **Labs:** the dedicated **Software Lab** plus the central **Computer Lab**
- **Student life:** **CSE Society**, programming contests and workshops — SIU teams have placed in regional programming contests
- **Events:** CSE organises ICT Fest, freshers' receptions and departmental growth programmes

The department is also the developer of this website.`,
      links: ["departments", "fees", "societies", "labs", "software-lab"],
    },
    {
      id: "csi",
      cat: "Departments",
      q: ["Tell me about CSI", "Computer Science and Informatics"],
      kw: ["csi", "informatics", "information science", "data", "database", "security", "web"],
      a: `**Department of Computer Science & Informatics (CSI)**

- **Programmes:** B.Sc. Engg. in CSI — Day (4 years) and Evening (3 years)
- **Fees:** 2,53,000 BDT, before waivers
- **Teaching areas:** programming and data structures, databases, operating systems, web technologies, information security, information science and computing theory
- **Labs:** central **Computer Lab** and **Software Lab** access
- **Focus:** a theory-and-systems orientation to computing, complementary to the more engineering-focused CSE programme

Apply through the standard undergraduate route — 2.5 GPA in both SSC and HSC, or a recognised diploma.`,
      links: ["departments", "fees", "labs"],
    },
    {
      id: "ece",
      cat: "Departments",
      q: ["Tell me about ECE", "Electronics and Communication Engineering"],
      kw: ["ece", "electronics", "communication", "embedded", "vlsi", "microelectronics", "signal", "telecom"],
      a: `**Department of Electronics & Communication Engineering (ECE)**

- **Programmes:** B.Sc. Engg. in ECE — Day (4 years) and Evening (3 years)
- **Fees:** 2,53,000 BDT (Day) · 1,93,000 BDT (Evening), before waivers
- **Teaching areas:** circuit theory, electronics, microprocessors and microcontrollers, digital signal processing, embedded systems, communication systems and VLSI
- **Labs:** the dedicated **Electronics Lab**, the **Electronics and Machine Lab**, the **Physics Lab**, plus the **Computer Lab** and **Browsing Lab**

Students also have access to the **CRTC** (Computer Resource and Training Centre).`,
      links: ["departments", "fees", "labs", "crtc"],
    },
    {
      id: "english",
      cat: "Departments",
      q: ["Tell me about the English department", "English department", "English literature"],
      kw: ["english", "literature", "linguistics", "elt", "language teaching", "islamic studies", "ma english", "ba english"],
      a: `**Department of English**

- **Programmes:** BA (Hons) in English (4 yrs) · M.A. in English (1 yr, or Preliminary & Final) · B.A. Hons in Islamic Studies (4 yrs)
- **Fees:** BA Hons English 2,93,400 BDT · M.A. English 59,000 (1 yr) or 1,05,000 (Prelim & Final) · B.A. Hons Islamic Studies 96,000
- **Teaching areas:** British and American literature, linguistics, English language teaching, communication and professional skills, translation, and Islamic Studies
- **Student life:** the **SIU Debating Club** and regular seminars — for example on Modernism in English Poetry
- **Support:** guardians' meetings are held every semester for the department's students

The department also coordinates literary events such as **SIU Literary Fest** and coordinates with the American Corner for language and cultural programmes.`,
      links: ["departments", "fees", "societies", "american-corner"],
    },
    {
      id: "law",
      cat: "Departments",
      q: ["Tell me about the Law department", "LL.B programme", "law school"],
      kw: ["law", "llb", "ll.b", "bachelor of laws", "legal", "moot", "moot court", "advocacy", "mou", "ll.m", "jurisprudence"],
      a: `**Department of Law**

- **Programmes:** Bachelor of Laws (LL.B) — 4 years / 8 semesters · LL.M — 1 year (2 semesters) or 2 years
- **Fees:** LL.B 3,11,400 BDT · LL.M (1 yr) 95,400 BDT, before waivers
- **Teaching areas:** constitutional, contract, criminal, civil, land, corporate and international law, jurisprudence and legal drafting
- **Practical training:** **moot court** practice, and **court visits** to the District and Sessions Judge Court, Sylhet to connect theory with real procedure
- **Student life:** the **Moot Court Society**
- **Waiver note:** LL.M applicants who are SIU students receive a 25% tuition waiver

The department organises seminars and legal clinics alongside the moot programme.`,
      links: ["departments", "fees", "societies"],
    },
    {
      id: "bba",
      cat: "Departments",
      q: ["Tell me about Business Administration", "BBA department", "MBA department"],
      kw: ["bba", "business", "mba", "management", "marketing", "accounting", "finance", "commerce", "executive mba"],
      a: `**Department of Business Administration**

- **Programmes:** BBA (4 yrs) · MBA (1 yr) · MBA Executive (1.5 yrs, for working professionals) · MBA Regular (2 yrs)
- **Fees:** BBA 1,41,400 BDT · MBA 93,400 · MBA Executive 1,29,400 · MBA Regular 1,65,400, before waivers
- **Teaching areas:** principles of management, financial and management accounting, marketing, business law, organisational behaviour, business research methods, operations and entrepreneurship
- **Practical exposure:** case competitions, **Career Talk** seminars with industry partners such as BRAC Career Hub, and internships
- **Collaboration:** the department co-organises career seminars with the **American Corner**

Ask me for the fee breakdown of any one of these programmes.`,
      links: ["departments", "fees", "american-corner"],
    },
    {
      id: "which-programme",
      cat: "Departments",
      q: [
        "Which programme should I choose?",
        "I am unsure what to study",
        "Recommend a course for me",
        "Help me pick a subject",
      ],
      kw: ["choose", "pick", "which course", "suggest", "recommend", "confused", "undecided", "guidance", "advise", "not sure what", "help me choose", "best course", "right programme"],
      a: `Happy to help you narrow it down. A quick way to decide:

**If you want to build software and systems**
→ **CSE** (the broadest engineering take on computing) or **CSI** (more theory and information science). CSE leads directly into AI, software and networks; CSI into databases, security and web.

**If you like hardware, chips and signals**
→ **ECE**, with the electronics, electronics-and-machine and physics labs backing it up.

**If you are strong in literature, language or communication**
→ **English** — BA (Hons) for the 4-year degree, or M.A. after graduation. Islamic Studies is also housed here.

**If you want a professional career track**
→ **Law** (LL.B, with moot court and courtroom visits) or **Business Administration** (BBA, then MBA or the Executive MBA if you are working).

**Tell me your HSC subject strengths, your interests and whether you want a 4-year day or 3-year evening programme**, and I will recommend a specific programme with its fee.`,
      links: ["departments", "fees", "eligibility"],
    },
    {
      id: "find-program",
      cat: "Departments",
      q: ["How do I find a programme?", "Find a program option", "Browse programmes"],
      kw: ["find a program", "browse", "filter", "search program", "find course", "programme finder", "search"],
      a: `Use the **Find a Program** control at the very top of the website:

1. Click *Find a Program* in the top utility bar.
2. Choose **Undergraduate** or **Graduate**.
3. The matching programmes appear with their fee structure — including every waiver row.

You can also filter the programme cards in the [[Departments section|departments]] on this page, or just ask me directly: *"How much is BBA?"* or *"Tell me about ECE."*`,
      links: ["departments", "fees"],
    },

    /* ------------------------------------------------------------ facilities */
    {
      id: "facilities",
      cat: "Facilities",
      q: ["What facilities does the campus have?", "Campus facilities", "What do you offer students?"],
      kw: ["facility", "facilities", "campus", "amenity", "amenities", "offer", "have", "available", "infrastructure", "what do you provide"],
      a: `**Campus facilities at SIU**

- **Free Wi-Fi access** across the campus
- **Digital classrooms** with modern teaching aids
- **AC classrooms** for comfort
- **Highly equipped laboratories** — software, computer, browsing, electronics, electronics-and-machine and physics
- **Rich library** — a separate central library building
- **Up to 100% scholarship** through the tuition-waiver scheme
- **Research lab** for undergraduate and graduate projects
- **Extra-curricular activities** through departments and societies
- **American Corner** — a resource and cultural centre on campus
- **CRTC** — Computer Resource and Training Centre
- **Female hostels** next to the campus for about 250 residents

Ask me about any specific facility, laboratory or the hostel for more detail.`,
      links: ["labs", "library", "hostel", "wifi", "american-corner", "crtc", "campus"],
    },
    {
      id: "labs",
      cat: "Facilities",
      q: ["What labs do you have?", "Laboratories", "Computer lab access"],
      kw: ["lab", "labs", "laboratory", "laboratories", "workshop", "equipment", "computer lab", "physics lab"],
      a: `SIU maintains these dedicated laboratories, listed under **Resources** in the main menu:

- **Software Lab** — development environment for programming and software projects
- **Computer Lab** — general computing and practical classes
- **Browsing Lab** — internet access and research
- **Electronics Lab** — circuits, devices and instrumentation
- **Electronics & Machine Lab** — machines, motors and hardware
- **Physics Lab** — physical science experiments
- **Research Lab** — project and thesis research
- **CRTC** — Computer Resource and Training Centre

Ask me about a specific lab and I'll describe what it is used for and which departments use it.`,
      links: ["software-lab", "computer-lab", "browsing-lab", "electronics-lab", "crtc", "facilities"],
    },
    {
      id: "software-lab",
      cat: "Facilities",
      q: ["What is in the Software Lab?", "Software lab facilities"],
      kw: ["software lab", "software", "programming lab", "ide", "development environment", "coding lab"],
      a: `The **Software Lab** is SIU's dedicated development environment, used mainly by **Computer Science & Engineering** and **Computer Science & Informatics** students for practical programming, algorithms and software engineering work.

It complements the general-purpose **Computer Lab**, the **Browsing Lab** and the **Research Lab**. Access is normally in line with your department's lab schedule, and outside class hours for project work.`,
      links: ["labs", "cse", "csi"],
    },
    {
      id: "computer-lab",
      cat: "Facilities",
      q: ["Tell me about the Computer Lab", "Computing facilities"],
      kw: ["computer lab", "computing", "lab access", "pc", "workstation", "ict"],
      a: `The central **Computer Lab** supports practical classes and project work across all departments — programming for CSE and CSI, electronics design work for ECE, statistical analysis for Business Administration, and legal research work for Law.

Students also have the **Software Lab**, **Browsing Lab**, **Physics Lab**, **Electronics Lab**, **Electronics and Machine Lab**, the **Research Lab**, and the **CRTC**. All are backed by campus-wide **free Wi-Fi**.`,
      links: ["labs", "wifi", "crtc"],
    },
    {
      id: "browsing-lab",
      cat: "Facilities",
      q: ["What is the Browsing Lab?", "Internet access on campus"],
      kw: ["browsing lab", "browsing", "internet", "wifi", "wi fi", "online", "network", "access"],
      a: `The **Browsing Lab** is a dedicated space for internet access, online research and browsing during and between classes.

Complementing it, the campus offers **free Wi-Fi access** for students, and the **CRTC** provides computing and training support.`,
      links: ["labs", "wifi", "crtc", "library"],
    },
    {
      id: "electronics-lab",
      cat: "Facilities",
      q: ["What is in the Electronics Lab?", "Electronics and machine lab"],
      kw: ["electronics lab", "electronics", "machine lab", "circuit", "hardware", "ece lab", "lab equipment"],
      a: `Two laboratories serve the **Electronics & Communication Engineering** department:

- **Electronics Lab** — circuit analysis, devices, analog and digital electronics experiments
- **Electronics & Machine Lab** — machines, motors, control and hardware experiments

Both sit alongside the **Physics Lab** and the computer facilities.`,
      links: ["labs", "ece", "physics-lab"],
    },
    {
      id: "physics-lab",
      cat: "Facilities",
      q: ["Tell me about the Physics Lab"],
      kw: ["physics", "physics lab", "mechanics", "optics", "experiment"],
      a: `The **Physics Lab** supports the physical-science component of the science and engineering curricula, particularly for **Electronics & Communication Engineering** students, who use it for foundational physics experiments alongside their electronics coursework.`,
      links: ["labs", "ece", "electronics-lab"],
    },
    {
      id: "crtc",
      cat: "Facilities",
      q: ["What is the CRTC?", "Computer Resource and Training Centre"],
      kw: ["crtc", "computer resource", "training centre", "training center", "ict training", "resource centre"],
      a: `**CRTC — the Computer Resource and Training Centre** is SIU's dedicated computing and training facility. It provides:

- additional computing access beyond the departmental laboratories
- training and workshops in computer skills and ICT tools
- support for students who need extra practice time

CRTC is listed under **Resources** in the main menu.`,
      links: ["labs", "computer-lab", "facilities"],
    },
    {
      id: "wifi",
      cat: "Facilities",
      q: ["Is there Wi-Fi?", "Internet at the university"],
      kw: ["wifi", "wi-fi", "wi fi", "internet", "network", "online class", "broadband", "connectivity", "internet access"],
      a: `Yes — **free Wi-Fi access** is one of the campus facilities listed by SIU, alongside the **Browsing Lab** and the **CRTC** for dedicated internet and computing access.

Wi-Fi coverage extends across teaching spaces, the library and common areas, so you can work online between classes.`,
      links: ["browsing-lab", "crtc", "facilities"],
    },
    {
      id: "library",
      cat: "Facilities",
      q: ["Tell me about the library", "Central library", "Books and journals"],
      kw: ["library", "book", "books", "journal", "journals", "reading", "reference", "study", "e-library", "magazine"],
      a: `SIU has a **separate large building used as the central library**, which can accommodate **more than 300 students at a time**. There is also a **separate chamber where about 30 teachers can study**.

**Collection**
- About **12,000 books**, continually increased
- **Hundreds of scholarly journals**, magazines and CDs

Alongside the central library there is a dedicated **Library Office** under *Administration* for membership, borrowing rules and issue of library cards. Ask me about borrowing rules, study space or the journal collection if you need more detail.`,
      links: ["library-office", "facilities", "campus"],
    },
    {
      id: "library-office",
      cat: "Facilities",
      q: ["How do I get a library card?", "Library membership", "Borrow books"],
      kw: ["library card", "membership", "borrow", "lending", "issue book", "return", "fine", "library office", "reading room"],
      a: `Library access is handled by the **Library Office**, listed under **Administration → Library Office**.

- Enrol as a member using your admission/student credentials
- The central library accommodates over **300 students** at a time, plus a dedicated chamber for about **30 teachers**
- The collection includes around **12,000 books** and hundreds of scholarly journals, magazines and CDs

For membership forms, borrowing limits and any late-return conditions, contact the Library Office directly.`,
      links: ["library", "registrar", "contact"],
    },
    {
      id: "american-corner",
      cat: "Facilities",
      q: ["What is the American Corner?", "American Corner at SIU"],
      kw: ["american corner", "corner", "american", "cultural", "english corner", "resource centre", "language lab"],
      a: `The **American Corner** is one of SIU's listed campus facilities — a resource centre that supports **English language learning, academic research and cultural programmes**.

It has been used to co-organise programmes with the Department of Business Administration, including **"Career Talk" seminars** with BRAC Career Hub, and it supports the language and communication needs of the English and Business Administration departments.`,
      links: ["facilities", "english", "bba"],
    },
    {
      id: "hostel",
      cat: "Facilities",
      q: ["Is there hostel accommodation?", "Where can I stay?", "Accommodation"],
      kw: ["hostel", "hall", "accommodation", "accommodate", "stay", "living", "residence", "room", "boarding", "mess", "dormitory", "housing", "rent"],
      a: `**Yes.** SIU has **female hostels in three separate buildings** just adjacent to the campus, where about **250 female students** can be accommodated.

- Supervised by **one Provost and two Assistant Provosts**
- Described as **safe, comfortable and quiet**
- Located immediately beside the campus, so residents are minutes from classes, the library and the laboratories

Full details are on the **Admission → Accommodation** page of the website, or ask the Admission Office about current capacity and allocation.`,
      links: ["accommodation", "admission-process", "campus"],
    },
    {
      id: "accommodation",
      cat: "Facilities",
      q: ["Tell me about accommodation", "Hostel facilities and cost", "Do you have student housing?"],
      kw: ["accommodation page", "housing", "hostel life", "residence", "where to live", "stay on campus", "living near"],
      a: `SIU's accommodation is provided through **female hostels in three separate buildings** immediately adjacent to the campus, with capacity for about **250 students**.

- **Supervision:** one Provost and two Assistant Provosts
- **Environment:** safe, comfortable and quiet
- **Proximity:** adjacent to the campus — classes, library and labs are all a short walk

The **Accommodation** page under *Admission* carries the current detail, including allocation and any charges. If you need to be certain of availability for the coming session, ask the Admission Office during counselling.`,
      links: ["hostel", "campus", "contact"],
    },
    {
      id: "campus",
      cat: "General",
      q: ["Where is the university located?", "Address", "How do I reach the campus?"],
      kw: ["location", "address", "where", "located", "address", "map", "direction", "reach", "address", "situated", "place"],
      a: `**Address**
Shamimabad, Bagbari, **Sylhet – 3100, Bangladesh**

**Getting there**
- SIU has its own campus from the very beginning, situated **inside Sylhet city** in a relatively calm and quiet area — well suited to the pursuit of knowledge
- The campus is **within walking distance of Oshani Medical College Hospital**
- Sylhet is well connected by road, rail and air; the campus map is shown in the *Explore SIU* section of this page

**Office contacts** — see [[Contact details|contact]]`,
      links: ["contact", "campus-map", "hostel"],
    },
    {
      id: "campus-map",
      cat: "General",
      q: ["Show me the campus map", "Map of the university"],
      kw: ["map", "location map", "google map", "directions", "where to find", "campus map"],
      a: `The campus map is embedded in the **Explore SIU** section of this homepage, next to the SIU video.

The address to search is **Shamimabad, Bagbari, Sylhet 3100**. The campus sits inside the city, within walking distance of Osmani Medical College Hospital — see [[Address & contact|contact]].`,
      links: ["contact", "campus"],
    },

    /* ------------------------------------------------------------- community */
    {
      id: "societies",
      cat: "Community",
      q: ["What societies and clubs are there?", "Student clubs", "Extracurricular activities"],
      kw: ["society", "societies", "club", "clubs", "extracurricular", "extra curricular", "activity", "activities", "volunteer", "community", "participate"],
      a: `SIU supports extra-curricular activity through these societies and clubs:

- **CSE Society** — for Computer Science & Engineering students; programming contests, workshops and ICT Fest
- **Moot Court Society** — for Law students; mooting, courtroom visits and legal clinics
- **SIU Debating Club** — public speaking and parliamentary debate
- **Rotaract Club of SIU** — community service, youth development and international Rotaract exchange

Departments also run their own events — freshers' receptions, guardians' meetings, seminars and festivals such as **SIU ICT Fest** and **SIU Literary Fest**.`,
      links: ["cse", "law", "events"],
    },
    {
      id: "events",
      cat: "Community",
      q: ["What events does SIU organise?", "Recent events", "News and events"],
      kw: ["event", "events", "activity", "fest", "festival", "seminar", "workshop", "conference", "ceremony", "news", "recent", "happening"],
      a: `SIU's **News & Events** section (on this page, and at *All Events* in the quick links) records the university's academic and cultural life. Recent examples include:

- **SIU ICT Fest** — inaugurated by the Department of CSE
- **Freshers' reception** for new CSE students
- **Guardians' meetings** for the Department of English
- **"शिक्षার मानोन্নयन" / quality-education seminars** with college principals
- **Bangladesh Physics Olympiad 2026 — Sylhet regional round**, hosted by SIU
- **Bridging Theory and Practice** — Law students visiting the District and Sessions Judge Court, Sylhet
- **Modernism in English Poetry** seminar
- **Exchanges with the press club** and the Vice-Chancellor

For upcoming dates and registration links, check the **Notices** section and the **Jump To → All Events** quick link.`,
      links: ["notices", "societies"],
    },
    {
      id: "notices",
      cat: "Community",
      q: ["Where are the notices?", "Latest notices", "Announcements", "Circulars"],
      kw: ["notice", "notices", "announcement", "announce", "circular", "latest", "news update", "alert", "deadline notice", "exam notice"],
      a: `The **Notices** board on this page carries the latest circulars — admission open announcements, exam schedules, semester breaks, holidays, flood and emergency notices, job circulars, and calls for paper.

Use **Jump To → All Notice** in the quick links for the complete archive, and the same menu for *All Events*, *Library*, *Syllabus*, *Schools* and *Tuition Fee*. Notices are also published on the university's official Facebook page.`,
      links: ["events", "academic-calendar"],
    },
    {
      id: "job-circular",
      cat: "Community",
      q: ["Are there any job openings?", "Jobs at SIU", "Career at the university", "Faculty recruitment"],
      kw: ["job", "jobs", "career", "recruitment", "vacancy", "hiring", "opening", "position", "apply for job", "employment", "teacher job", "staff"],
      a: `SIU publishes **job circulars** on its *News & Events* board and in the Notices archive — for example, the *Sylhet International University Job Circular* event.

Circulars specify the posts (teaching and non-teaching), qualifications, department, application deadline and required documents. Faculty circulars are department-specific, for example the *Circular for Associate Professor – Department of English*.

Check the **Notices** and **Events** sections regularly, and the official Facebook page, for the current openings.`,
      links: ["notices", "events", "departments"],
    },

    /* --------------------------------------------------------------- offices */
    {
      id: "registrar",
      cat: "People",
      q: ["Who is the Registrar?", "Office of the Registrar", "Student records"],
      kw: ["registrar", "register", "registration", "record", "records", "transcript", "student record", "office of registrar"],
      a: `The **Office of the Registrar** is one of SIU's main administrative offices, listed under *Administration*. It handles:

- student registration and academic records
- transcripts and certification
- correspondence with UGC and other authorities
- attestation and verification formalities

For degree or certificate verification, use the dedicated **Verification** service on the website, or contact the Registrar's Office.`,
      links: ["verification", "controller-exams", "contact"],
    },
    {
      id: "controller-exams",
      cat: "People",
      q: ["Who runs the examinations?", "Office of the Controller of Examinations", "When do results come out?"],
      kw: ["controller", "examination", "exams office", "result", "results", "publish result", "mark sheet", "transcript", "invigilator"],
      a: `The **Office of the Controller of Examinations** conducts all examinations and publishes results.

- **Exam scheduling, invigilation and scripts** sit with this office
- **Marks, grade sheets and transcripts** are issued here
- **Re-sit / supplementary examinations** are arranged here
- Result and exam dates follow the published **Academic Calendar** each semester

Office contact details are on the [[Contact page|contact]].`,
      links: ["exams", "academic-calendar", "verification"],
    },
    {
      id: "proctor",
      cat: "People",
      q: ["Who is the Proctor?", "Discipline and attendance issues", "Proctor's office"],
      kw: ["proctor", "discipline", "disciplinary", "misconduct", "attendance", "absent", "absenteeism", "warning", "fine", "punishment"],
      a: `The **Office of the Proctor** handles student discipline and conduct at SIU.

- **Absence and attendance discipline**
- **Misconduct and disciplinary action** under the Disciplinary Committee
- Conduct during examinations and in hostels
- Issuing of warnings or imposing penalties per university rules

If you have a disciplinary or attendance matter, approach the Proctor's Office; formal cases are handled by the **Disciplinary Committee** under *Authority*.`,
      links: ["authority", "exams", "hostel"],
    },
    {
      id: "treasurer",
      cat: "People",
      q: ["Who is the Treasurer?", "Office of the Treasurer", "Fee payment office"],
      kw: ["treasurer", "treasury", "finance", "accounts", "payment office", "bill", "receipt", "money"],
      a: `The **Office of the Treasurer** is responsible for university finances — collecting fees, issuing receipts, maintaining accounts and supporting the Finance Committee.

For fee payments, receipts, instalment arrangements or refund queries, contact the Treasurer's Office. Contact numbers are listed in the [[Contact section|contact]].`,
      links: ["payment", "fees", "authority"],
    },
    {
      id: "public-relation",
      cat: "People",
      q: ["Who do I contact for publicity or media?", "Office of the Public Relation"],
      kw: ["public relation", "pr", "media", "press", "news", "journalist", "press release", "advertisement", "publication"],
      a: `The **Office of the Public Relation** handles the university's media, press and publicity matters, and is listed under *Administration*.

For press enquiries, interviews, official statements or requests for university information, contact this office. SIU also maintains an official **Facebook page** where public notices are announced.`,
      links: ["contact", "notices"],
    },

    /* --------------------------------------------------------------- contact */
    {
      id: "contact",
      cat: "Contact",
      q: [
        "How do I contact the university?",
        "Contact details",
        "Phone number",
        "Address and phone",
        "Email address",
        "Where is the office?",
      ],
      kw: ["contact", "contact us", "phone", "telephone", "number", "call", "email", "mail", "address", "pabx", "fax", "mobile", "reach", "get in touch", "office hours"],
      a: `**Sylhet International University**

**Address**
Shamimabad, Bagbari, **Sylhet – 3100, Bangladesh**

**Telephone / PABX**
- 029966-36771
- 02996633319
- Fax: 02996636002
- Mobile: **+8801754313182**

**Online**
- Use the **contact form** on this page — you can choose phone or email as your preferred reply and give a preferred time (morning, afternoon or evening)
- Follow the official Facebook page for announcements
- For admission questions specifically, use the **Admission Query Form**

Office hours are generally during working hours, Sunday–Thursday. For urgent admission matters, calling the PABX in advance is the fastest route.`,
      links: ["admission-query", "campus", "verification"],
    },
    {
      id: "email",
      cat: "Contact",
      q: ["What is the email address?", "Can I email the university?"],
      kw: ["email", "e-mail", "mail address", "inbox", "write to", "gmail"],
      a: `SIU publishes a **general support email** on its contact page (shown under *General Support*), along with a working **contact form** that accepts your name, email, phone number, preferred reply method, best time to contact and message.

For faster, trackable replies:
- **Admission questions** → the Admission Query Form under *Admission*
- **Fees / payments** → Office of the Treasurer
- **Records / transcripts** → Office of the Registrar
- **Exams and results** → Office of the Controller of Examinations
- **Press** → Office of the Public Relation

Telephone lines and the PABX numbers are listed in [[Contact details|contact]].`,
      links: ["contact", "admission-query"],
    },
    {
      id: "hours",
      cat: "Contact",
      q: ["What are your office hours?", "When can I visit?", "Is the office open on Friday?"],
      kw: ["hours", "office hours", "open", "opening", "timing", "time", "working days", "sunday", "friday", "visit", "weekend", "closed"],
      a: `University offices follow the **Bangladesh government working week — Sunday to Thursday**. Saturdays and Fridays are the weekend, and public holidays follow the national calendar.

Before travelling to campus for an admission counselling or documents collection, it is best to **call the PABX (029966-36771 / 02996633319) or the mobile line (+8801754313182) first** so you do not make a wasted trip. During semester periods the campus is busy with classes, labs and examinations, so weekday mornings are usually the smoothest time to meet an office.`,
      links: ["contact", "admission-query", "academic-calendar"],
    },
    {
      id: "ugc",
      cat: "General",
      q: ["Is the university UGC approved?", "Is the degree recognized?", "Government approval", "Is the degree valid?"],
      kw: ["ugc", "approved", "approval", "recognised", "recognized", "valid", "government", "legitimate", "accredited", "registered", "authentic", "legal", "private university act"],
      a: `Yes. **Sylhet International University was established under the Private University Act 1992 and is affiliated with the University Grants Commission (UGC) of Bangladesh.**

Because of this affiliation, degrees from SIU are recognised for employment and higher study in Bangladesh, and SIU credits are also accepted by universities **at home and abroad**.

SIU operates as a **non-profit private institution** governed by its Trust, with the statutory bodies — Board of Trustees, Syndicate, Academic Council and Finance Committee.`,
      links: ["authority", "verification", "overview"],
    },
  ];

  /* ------------------------------------------------------------ derived data */

  const FACTS = {
    name: "Sylhet International University",
    abbr: "SIU",
    address: "Shamimabad, Bagbari, Sylhet - 3100, Bangladesh",
    pabx: ["029966-36771", "02996633319"],
    fax: "02996636002",
    mobile: "+8801754313182",
    website: "https://siu.edu.bd",
    established: "Private University Act 1992",
    affiliation: "University Grants Commission (UGC), Bangladesh",
    medium: "English",
    type: "Private, non-profit university",
    vc: "Prof. Dr. Md. Ashraful Alam",
    feeUpdated: "31 October 2025",
    currency: "BDT (Bangladeshi Taka)",
  };

  const CATEGORIES = [
    "General",
    "Admission",
    "Fees",
    "Academics",
    "Departments",
    "Facilities",
    "People",
    "Community",
    "Contact",
  ];

  /* ------------------------------------------------------------------
     Programme detail content for the on-page drawer.
     Keyed by "family" so a day/evening pair (cse-day / cse-eve) or a
     graduate variant (mba-1 / mba-exec / mba-regular) shares one entry.
     `study` and `overview` are taken from the department descriptions
     above; `careers` is explicitly presented as indicative, not as
     official placement data.
     ------------------------------------------------------------------ */
  const PROGRAMME_DETAILS = {
    cse: {
      level: "Undergraduate",
      overview:
        "The founding department of SIU and the largest on campus. The B.Sc. Engineering in Computer Science & Engineering combines core computing with artificial intelligence and machine learning, computer vision, computer networks and software engineering.",
      study: [
        "Algorithms & data structures",
        "Systems & operating systems",
        "Artificial intelligence & machine learning",
        "Computer vision",
        "Computer networks",
        "Software engineering",
      ],
      careers: [
        "Software engineer",
        "Web / backend developer",
        "Data & AI engineer",
        "Systems analyst",
        "Network administrator",
      ],
      facilities: "Software Lab · dedicated programming club",
    },
    csi: {
      level: "Undergraduate",
      overview:
        "Computing theory and information science, with a strong lab-based curriculum. The B.Sc. Engineering in Computer Science & Informatics focuses on how data, systems and software are structured and secured.",
      study: [
        "Data structures",
        "Databases",
        "Operating systems",
        "Web technologies",
        "Information security",
        "Information systems",
      ],
      careers: [
        "Software developer",
        "Database administrator",
        "Web developer",
        "IT / systems officer",
        "Information security analyst",
      ],
      facilities: "Software Lab · programming club",
    },
    ece: {
      level: "Undergraduate",
      overview:
        "Microelectronics, signals and systems, digital communication, embedded systems and VLSI — supported by dedicated electronics and electronics-and-machine laboratories.",
      study: [
        "Microelectronics",
        "Signals & systems",
        "Digital communication",
        "Embedded systems",
        "VLSI",
        "Electronic circuits & devices",
      ],
      careers: [
        "Electronics engineer",
        "Communication engineer",
        "Embedded systems engineer",
        "VLSI / chip design engineer",
        "Telecom engineer",
      ],
      facilities: "Electronics Lab · Electronics & Machine Lab · Physics Lab",
    },
    "ba-english": {
      level: "Undergraduate",
      overview:
        "Literature, linguistics, ELT and communication studies. The department runs seminars, the SIU Debating Club and guardians' meetings, and publishes peer-reviewed research.",
      study: [
        "English literature",
        "Linguistics",
        "ELT (English language teaching)",
        "Communication studies",
        "Academic writing",
      ],
      careers: [
        "Teaching",
        "Content writing & editing",
        "Media & journalism",
        "Public relations",
        "Translation",
      ],
      facilities: "Seminar programme · SIU Debating Club",
    },
    "ba-islamic": {
      level: "Undergraduate",
      overview:
        "Islamic Studies is offered within the English department alongside its literature and linguistics programmes, and benefits from the department's seminar and research activity.",
      study: [
        "Islamic thought & theology",
        "Islamic history & civilisation",
        "Qur'anic studies",
        "Arabic",
        "Comparative religion",
      ],
      careers: [
        "Teaching",
        "Research",
        "Community & religious leadership",
        "Civil service",
        "NGO work",
      ],
      facilities: "Seminar programme · library collection",
    },
    law: {
      level: "Undergraduate / Graduate",
      overview:
        "A professional law department with mooting, courtroom visits and clinical exposure. Home of the Moot Court Society and part of SIU's legal education and research activities.",
      study: [
        "Constitutional law",
        "Criminal law",
        "Civil law",
        "Contract law",
        "Company law",
        "Legal drafting & moot court",
      ],
      careers: [
        "Advocate / barrister",
        "Legal advisor",
        "Corporate legal officer",
        "Judicial service",
        "Human rights / NGO work",
      ],
      facilities: "Moot Court Society · courtroom visits",
    },
    business: {
      level: "Undergraduate / Graduate",
      overview:
        "Management, accounting, marketing, finance and organisational behaviour, with practical exposure through case competitions, career talks and internship links.",
      study: [
        "Management",
        "Accounting",
        "Marketing",
        "Finance",
        "Organisational behaviour",
        "Business strategy",
      ],
      careers: [
        "Management trainee",
        "Accountant",
        "Marketing / brand executive",
        "Finance analyst",
        "HR officer",
      ],
      facilities: "Case competitions · career talks · internship links",
    },
    "ma-english": {
      level: "Graduate",
      overview:
        "An advanced English programme for graduates covering literature, linguistics and ELT. Offered as a one-year route or as Preliminary & Final for students who need a foundation year.",
      study: [
        "Literary studies",
        "Linguistics",
        "ELT",
        "Research methods",
        "Academic writing",
      ],
      careers: [
        "Lecturer",
        "Researcher",
        "Editor",
        "Curriculum & materials developer",
      ],
      facilities: "Seminar programme · peer-reviewed research",
    },
  };

  window.SIU_KB = {
    facts: FACTS,
    entries: ENTRY,
    programmes: PROGRAMMES,
    programmeDetails: PROGRAMME_DETAILS,
    departments: DEPARTMENTS,
    categories: CATEGORIES,
    /** Compact plain-text dump used to build the LLM system prompt. */
    toPrompt() {
      const lines = [];
      lines.push("FACTS\n" + JSON.stringify(FACTS, null, 2));
      lines.push("\nPROGRAMME FEES (BDT, updated " + FACTS.feeUpdated + ")");
      PROGRAMMES.forEach((p) => {
        lines.push(
          `- ${p.short} | ${p.dept} | ${p.duration} | ${p.mode} | total ${p.total.toLocaleString(
            "en-IN",
          )} BDT`
        );
        p.breakdown.forEach(([k, v]) => lines.push(`    · ${k}: ${v}`));
        p.waiver.forEach(([k, v]) => lines.push(`    · waiver — ${k}: ${v}`));
      });
      lines.push("\nDEPARTMENTS");
      DEPARTMENTS.forEach((d) => {
        lines.push(`- ${d.abbr} — ${d.name} | offers: ${d.offers}\n    ${d.blurb}`);
      });
      lines.push("\nKNOWLEDGE ENTRIES");
      ENTRY.forEach((e) => {
        lines.push(`### [${e.cat}] ${e.q[0]}\n${e.a}`);
      });
      return lines.join("\n");
    },
  };
})();