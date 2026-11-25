/* ============================================================================
   i18n.js — English / Bangla UI switch for the SIU page and assistant
   ----------------------------------------------------------------------------
   Two layers:

   1. TEXT  — exact English strings found in index.html. applyTo() walks the
              page, finds elements whose children are only text + an icon,
              and swaps the text node. The original is stored on the element
              (data-i18n-orig), so switching back is lossless.

   2. KEYS  — semantic keys for UI the JavaScript builds at runtime (chat
              header, settings, feedback row, handoff card). Use
              window.SIUi18n.t("key") instead of hard-coding either language.

   Paragraphs, course names and the knowledge base stay in English on purpose:
   they are content, not chrome.
   ========================================================================= */
(function () {
  "use strict";

  const LS_LANG = "siu.lang";

  /* --- 1 · page text ------------------------------------------------------ */

  const TEXT = {
    /* utility + brand bars */
    "Find a Program": "প্রোগ্রাম খুঁজুন",
    "Jump To": "দ্রুত যান",
    Search: "খুঁজুন",
    "All Notice": "সব নোটিশ",
    "All Events": "সব ইভেন্ট",
    Library: "গ্রন্থাগার",
    Syllabus: "সিলেবাস",
    Schools: "স্কুল",
    "Tuition Fee": "টিউশন ফি",
    "Apply Now": "আবেদন করুন",
    "Open menu": "মেনু খুলুন",
    Level: "স্তর",
    Undergraduate: "স্নাতক",
    Graduate: "স্নাতকোত্তর",
    "Click any programme to ask the assistant about its fee and waivers.":
      "যেকোনো প্রোগ্রামে ক্লিক করে সহায়ককে ফি ও ওয়েভার জিজ্ঞাসা করুন।",

    /* primary navigation */
    Home: "হোম",
    Academic: "একাডেমিক",
    Authority: "কর্তৃপক্ষ",
    Administration: "প্রশাসন",
    Departments: "বিভাগসমূহ",
    Admission: "ভর্তি",
    Resources: "রিসোর্স",
    Societies: "সোসাইটি",
    Gallery: "গ্যালারি",
    Verification: "সত্যায়ন",
    Contact: "যোগাযোগ",
    "Ask the SIU Assistant": "SIU সহায়ককে জিজ্ঞাসা করুন",

    /* mega-menu headings */
    Curriculum: "পাঠ্যক্রম",
    Support: "সহায়তা",
    Languages: "ভাষা",
    "Governing Bodies": "পরিচালনা পর্ষদ",
    Committees: "কমিটি",
    Leadership: "নেতৃত্ব",
    Recognition: "স্বীকৃতি",
    Offices: "দপ্তর",
    Engineering: "ইঞ্জিনিয়ারিং",
    "Arts & Law": "কলা ও আইন",
    Business: "ব্যবসায় শিক্ষা",
    "Not sure?": "নিশ্চিত নন?",
    Also: "আরও",
    Waivers: "ওয়েভার",
    Laboratories: "ল্যাবরেটরি",
    Facilities: "সুবিধা",
    Downloads: "ডাউনলোড",
    "Not sure? Ask the assistant": "নিশ্চিত নন? সহায়ককে জিজ্ঞাসা করুন",
    "Ask the assistant to recommend a programme": "সহায়ককে প্রোগ্রাম বাছাই করতে বলুন",

    /* mega-menu links */
    "Academic Calendar": "একাডেমিক ক্যালেন্ডার",
    "Grading System": "গ্রেডিং সিস্টেম",
    "Examination System": "পরীক্ষা পদ্ধতি",
    "Academic Support": "একাডেমিক সহায়তা",
    CRTC: "সিআরটিসি",
    "Library Office": "গ্রন্থাগার দপ্তর",
    Registrar: "রেজিস্ট্রার",
    "Controller of Examinations": "পরীক্ষা নিয়ন্ত্রক",
    "Proctor's Office": "প্রক্টর দপ্তর",
    Treasurer: "কোষাধ্যক্ষ",
    "Board of Trustees (BOT)": "বোর্ড অব ট্রাস্টিজ (বিওটি)",
    "Board of Trustees": "বোর্ড অব ট্রাস্টিজ",
    Syndicate: "সিন্ডিকেট",
    "Academic Council": "একাডেমিক কাউন্সিল",
    "Finance Committee": "অর্থ কমিটি",
    "Disciplinary Committee": "শৃঙ্খলা কমিটি",
    "Vice-Chancellor": "উপাচার্য",
    "Chancellor & Trust Chairman": "চ্যান্সেলর ও ট্রাস্ট চেয়ারম্যান",
    "UGC Affiliation": "ইউজিসি অনুমোদন",
    "Degree Verification": "ডিগ্রি সত্যায়ন",
    Proctor: "প্রক্টর",
    "Public Relation": "জনসংযোগ",
    "Address & Phone": "ঠিকানা ও ফোন",
    "Contact Form": "যোগাযোগ ফর্ম",
    "Office Hours": "অফিস সময়",
    "Admission Process": "ভর্তি প্রক্রিয়া",
    Eligibility: "যোগ্যতা",
    "Required Documents": "প্রয়োজনীয় কাগজপত্র",
    "Tuition Fees": "টিউশন ফি",
    "Waivers & Scholarships": "ওয়েভার ও বৃত্তি",
    "International Students": "আন্তর্জাতিক শিক্ষার্থী",
    "Transfer Credit": "ট্রান্সফার ক্রেডিট",
    Accommodation: "আবাসন",
    "Admission Query Form": "ভর্তি জিজ্ঞাসা ফর্ম",
    "Software Lab": "সফটওয়্যার ল্যাব",
    "Computer Lab": "কম্পিউটার ল্যাব",
    "Browsing Lab": "ব্রাউজিং ল্যাব",
    "Electronics & Machine Lab": "ইলেকট্রনিক্স ও মেশিন ল্যাব",
    "Physics Lab": "পদার্থবিজ্ঞান ল্যাব",
    "Research Lab": "রিসার্চ ল্যাব",
    "Central Library": "কেন্দ্রীয় গ্রন্থাগার",
    "American Corner": "আমেরিকান কর্নার",
    "Free Wi-Fi": "ফ্রি ওয়াই-ফাই",
    Notices: "নোটিশ",
    Documents: "কাগজপত্র",
    "Campus Map": "ক্যাম্পাস ম্যাপ",

    /* eyebrow labels */
    "Admissions Open": "ভর্তি চলছে",
    Community: "কমিউনিটি",
    "About SIU": "SIU সম্পর্কে",
    "Schools & Departments": "স্কুল ও বিভাগ",
    "Fee calculator": "ফি ক্যালকুলেটর",
    "Notice Board": "নোটিশ বোর্ড",
    "News & Events": "সংবাদ ও ইভেন্ট",
    "Campus Facilities": "ক্যাম্পাস সুবিধা",
    "Message from the Vice-Chancellor": "উপাচার্যের বাণী",
    "At a Glance": "এক নজরে",
    Academics: "একাডেমিক",
    "Student Life": "শিক্ষার্থী জীবন",
    "Explore SIU": "SIU ঘুরে দেখুন",
    FAQ: "সাধারণ জিজ্ঞাসা",

    /* section titles */
    "Laboratories, a rich library and free Wi-Fi across campus":
      "ল্যাবরেটরি, সমৃদ্ধ গ্রন্থাগার ও ক্যাম্পাসজুড়ে ফ্রি ওয়াই-ফাই",
    "Up to 100% scholarship on tuition": "টিউশনে ১০০% পর্যন্ত বৃত্তি",
    "Six departments, societies and a campus of its own":
      "ছয়টি বিভাগ, সোসাইটি ও নিজস্ব ক্যাম্পাস",
    "Ask anything about SIU — instantly": "SIU সম্পর্কে যেকোনো প্রশ্ন করুন — সাথে সাথে",
    "A quiet campus of its own, in the middle of Sylhet city":
      "সিলেট শহরের মাঝে নিজস্ব শান্ত ক্যাম্পাস",
    "Six departments, one campus": "ছয় বিভাগ, এক ক্যাম্পাস",
    "Total cost, programme by programme": "প্রোগ্রামভিত্তিক মোট খরচ",
    "How to get admitted": "কীভাবে ভর্তি হবেন",
    "Latest notices": "সর্বশেষ নোটিশ",
    "Recent events": "সাম্প্রতিক ইভেন্ট",
    "Everything a student needs, on one campus": "শিক্ষার্থীর যা যা প্রয়োজন, এক ক্যাম্পাসেই",
    "Laboratories & resource centres": "ল্যাবরেটরি ও রিসোর্স সেন্টার",
    "A campus of its own, in a calm part of the city": "শহরের শান্ত এলাকায় নিজস্ব ক্যাম্পাস",
    "How study works at SIU": "SIU-তে পড়াশোনা কীভাবে চলে",
    "Societies & clubs": "সোসাইটি ও ক্লাব",
    "See the campus for yourself": "ক্যাম্পাস নিজে দেখুন",
    "Questions we hear most": "সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্ন",
    "Talk to the university": "বিশ্ববিদ্যালয়ের সাথে কথা বলুন",
    "SIU at a glance": "এক নজরে SIU",
    Vision: "ভিশন",
    Mission: "মিশন",
    "Estimate your total": "আপনার মোট খরচ হিসাব করুন",
    "Acquire a good degree accepted all over the world":
      "সারা বিশ্বে স্বীকৃত একটি ভালো ডিগ্রি অর্জন করুন",

    /* buttons + small UI */
    "Ask the Assistant": "সহায়ককে জিজ্ঞাসা করুন",
    "Fee Structure": "ফি কাঠামো",
    "Fee for CSE?": "CSE-এর ফি কত?",
    "Admission rules": "ভর্তির নিয়ম",
    Hostels: "হোস্টেল",
    "Admission Information": "ভর্তি তথ্য",
    "Contact the University": "বিশ্ববিদ্যালয়ে যোগাযোগ",
    "Ask about the overview": "ওভারভিউ সম্পর্কে জিজ্ঞাসা",
    "Ask about the vision": "ভিশন সম্পর্কে জিজ্ঞাসা",
    "Ask about the mission": "মিশন সম্পর্কে জিজ্ঞাসা",
    "Ask about hostels": "হোস্টেল সম্পর্কে জিজ্ঞাসা",
    "Ask about the library": "গ্রন্থাগার সম্পর্কে জিজ্ঞাসা",
    "Ask about waivers": "ওয়েভার সম্পর্কে জিজ্ঞাসা",
    "Ask the assistant": "সহায়ককে জিজ্ঞাসা করুন",
    Details: "বিস্তারিত",
    Ask: "জিজ্ঞাসা",

    /* calculator + programme drawer */
    Duration: "মেয়াদ",
    "Study mode": "পড়াশোনার ধরন",
    "At admission": "ভর্তির সময়",
    Total: "মোট",
    "Total published fee": "প্রকাশিত মোট ফি",
    "No waiver — full published fee": "ওয়েভার নেই — প্রকাশিত সম্পূর্ণ ফি",
    "Published total adjustment": "প্রকাশিত মোট সমন্বয়",
    "to match the official total": "অফিসিয়াল মোটের সাথে মিল রাখতে",
    "Fee breakdown": "ফি বিবরণ",
    "Per-semester charges": "সেমিস্টারপ্রতি খরচ",
    "Waivers & scholarships": "ওয়েভার ও বৃত্তি",
    "Entry requirements": "ভর্তির যোগ্যতা",
    Eligibility: "যোগ্যতা",
    "What you study": "কী পড়বেন",
    "Typical career paths": "সম্ভাব্য ক্যারিয়ার",
    "Other programmes": "অন্যান্য প্রোগ্রাম",
    "Per semester": "প্রতি সেমিস্টার",
    "new total": "নতুন মোট",
    "Quota-limited": "কোটা সীমিত",
    "ask the office": "অফিসে জিজ্ঞাসা করুন",
    "one-time": "এককালীন",

    /* footer */
    Explore: "ঘুরে দেখুন",
    Admissions: "ভর্তি",
    "Contact admission": "ভর্তি অফিসে যোগাযোগ",
  };

  /* Placeholders are attributes, so they need their own map. */
  const PLACEHOLDER = {
    "Ask about fees, waivers, hostels, labs, admission…": "ফি, ওয়েভার, হোস্টেল, ল্যাব, ভর্তি—যা জানতে চান লিখুন…",
    "e.g. CSE, MBA, Law…": "যেমন CSE, MBA, Law…",
    "Full name": "পূর্ণ নাম",
    "How can we help?": "কীভাবে সাহায্য করতে পারি?",
    "Your name": "আপনার নাম",
    "Email address": "ইমেইল ঠিকানা",
    "Phone number": "ফোন নম্বর",
    "Preferred reply": "পছন্দের মাধ্যম",
    "Best time to contact": "যোগাযোগের উপযুক্ত সময়",
    Message: "বার্তা",
    "Search SIU": "SIU-তে খুঁজুন",
    "Search programmes": "প্রোগ্রাম খুঁজুন",
  };

  /* --- 2 · assistant UI keys --------------------------------------------- */

  const KEYS = {
    chatTitle: ["SIU Assistant", "SIU সহায়ক"],
    chatStatus: [
      "Your playful guide to admissions, fees & campus life ✨",
      "ভর্তি, ফি ও ক্যাম্পাসের তথ্য—আপনার আনন্দময় গাইড ✨",
    ],
    kbMode: ["Knowledge base", "নলেজ বেস"],
    changeMode: ["Change AI mode", "AI মোড বদলান"],
    changeModeAria: ["Change AI mode — open assistant settings", "AI মোড বদলান — সেটিংস খুলুন"],
    read: ["Read the last answer aloud", "শেষ উত্তরটি পড়ে শোনান"],
    stopRead: ["Stop reading", "কণ্ঠ বন্ধ করুন"],
    museInteract: ["Say hello to the assistant", "সহায়ককে হ্যালো বলুন"],
    museHello: ["Hey hey! What are we exploring today? ✨", "হ্যালো! আজ কী নিয়ে জানতে চান? ✨"],
    museThinking: ["Thinking… this is exciting! ⚡", "আমি ভাবছি… দারুণ মজার প্রশ্ন! ⚡"],
    museHappy: ["Ta-da! Hope that helped ✨", "তা-দা! আশা করি উত্তরটি কাজে লেগেছে ✨"],
    museConfused: ["Hmm… let’s try another angle! 🤔", "হুম… অন্যভাবে চেষ্টা করি! 🤔"],
    museThanks: ["Yes! High-five! You made my day 🙌", "দারুণ! হাই-ফাইভ! আপনাকে ধন্যবাদ 🙌"],
    museSorry: ["Oops! Tell me what I missed — I want to help 💡", "উপস! কী বাদ পড়েছে বলুন—আমি সাহায্য করতে চাই 💡"],
    museAskFirst: ["Ask me something first — then I’ll say it aloud! 🔊", "আগে একটি প্রশ্ন করুন—তারপর উত্তরটি পড়ে শোনাব! 🔊"],
    museNoSpeech: ["Speech is unavailable here — but I can still chat! 💬", "এখানে কণ্ঠস্বর সুবিধা নেই—তবু লিখে কথা বলতে পারি! 💬"],
    museTalking: ["Reading aloud… listen up! 🎧", "আমি পড়ছি… শুনুন! 🎧"],
    museFresh: ["Fresh start! What should we explore next? 🌟", "নতুন শুরু! এবার কী জানতে চান? 🌟"],
    museQuip1: ["Beep boop! Ready for another question? 🤖", "বিপ বুপ! আরেকটি প্রশ্নের জন্য প্রস্তুত? 🤖"],
    museQuip2: ["Fees, programmes, hostels — pick your adventure! 🚀", "ফি, প্রোগ্রাম, হোস্টেল—যেটা চান জেনে নিন! 🚀"],
    museQuip3: ["You’re doing great! Let’s find your next answer ⭐", "দারুণ এগোচ্ছেন! পরের উত্তরটি খুঁজে নিই ⭐"],
    museQuip4: ["Powered up! What shall we discover? ⚡", "আমি প্রস্তুত! এবার কী আবিষ্কার করব? ⚡"],
    settings: ["Assistant settings", "সহায়ক সেটিংস"],
    clearChat: ["Clear conversation", "কথোপকথন মুছুন"],
    closeChat: ["Close assistant", "সহায়ক বন্ধ করুন"],
    openChat: ["Open SIU Assistant", "SIU সহায়ক খুলুন"],
    closeChatLabel: ["Close SIU Assistant", "SIU সহায়ক বন্ধ করুন"],
    inputPlaceholder: ["Ask about fees, waivers, admission…", "ফি, ওয়েভার, ভর্তি—যা জানতে চান লিখুন…"],
    welcomeDesc: ["Ask about admissions, fees, departments, hostels, the library, labs, exams, or how to contact SIU.", "ভর্তি, ফি, বিভাগ, হোস্টেল, গ্রন্থাগার, ল্যাব, পরীক্ষা বা যোগাযোগ—SIU সম্পর্কে যা জানতে চান লিখুন…"],
    send: ["Send message", "বার্তা পাঠান"],
    voice: ["Voice input", "কণ্ঠে লিখুন"],
    next: ["Next:", "পরবর্তী:"],
    sources: ["Sources", "সূত্র"],
    helpful: ["Was this helpful?", "উত্তরটি কি সহায়ক ছিল?"],
    yes: ["Yes", "হ্যাঁ"],
    no: ["No", "না"],
    thanks: ["Thanks for the feedback.", "মতামতের জন্য ধন্যবাদ।"],
    whatMissing: ["What was missing or wrong?", "কী অনুপস্থিত বা ভুল ছিল?"],
    sendFeedback: ["Send feedback", "মতামত পাঠান"],
    skip: ["Skip", "বাদ দিন"],
    handoffTitle: ["Talk to the Admission Office", "ভর্তি অফিসের সাথে কথা বলুন"],
    handoffBody: [
      "Leave your name and number. WhatsApp will open with your message ready to send.",
      "নাম ও নম্বর দিন। আপনার বার্তা নিয়ে হোয়াটসঅ্যাপ খুলবে, শুধু পাঠাতে হবে।",
    ],
    handoffName: ["Your name", "আপনার নাম"],
    handoffPhone: ["Mobile number (01XXXXXXXXX)", "মোবাইল নম্বর (01XXXXXXXXX)"],
    handoffSend: ["Open WhatsApp", "হোয়াটসঅ্যাপ খুলুন"],
    handoffCall: ["Call instead", "বরং কল করুন"],
    handoffLater: ["Not now", "পরে"],
    handoffErrName: ["Please enter your name.", "অনুগ্রহ করে আপনার নাম লিখুন।"],
    handoffErrPhone: ["Enter a valid 11-digit mobile number.", "সঠিক ১১-সংখ্যার মোবাইল নম্বর দিন।"],
    contextOn: ["Asking about", "বিষয়"],
    contextClear: ["Clear context", "বিষয় বাদ দিন"],
    insights: ["Insights (stored on this device)", "পরিসংখ্যান (এই ডিভাইসে সংরক্ষিত)"],
    insightsHelpful: ["helpful", "সহায়ক"],
    insightsNotHelpful: ["not helpful", "সহায়ক নয়"],
    insightsUnanswered: ["logged questions", "সংরক্ষিত প্রশ্ন"],
    download: ["Download JSON", "JSON ডাউনলোড"],
    clearLogs: ["Clear", "মুছুন"],
    noData: ["No feedback yet.", "এখনও কোনো মতামত নেই।"],
    language: ["Language", "ভাষা"],
    aiUpgrade: ["Optional AI upgrade", "ঐচ্ছিক AI আপগ্রেড"],
    aiProvider: ["AI provider", "AI প্রোভাইডার"],
    offOption: ["Off — use built-in knowledge base", "বন্ধ — বিল্ট-ইন নলেজ বেস ব্যবহার করুন"],
    providerHint: [
      "Optional. Without a key the assistant still answers everything from its built-in SIU knowledge base.",
      "ঐচ্ছিক। কী ছাড়াও সহায়ক তার বিল্ট-ইন SIU নলেজ বেস থেকে সব উত্তর দিতে পারে।",
    ],
    apiKey: ["API key", "API কী"],
    apiKeyHint: [
      "Kept only in this browser's localStorage. Never sent anywhere except the provider you chose.",
      "শুধু এই ব্রাউজারের localStorage-এ রাখা হয়। আপনি যে প্রোভাইডার বেছেছেন, সেখানেই কেবল পাঠানো হয়।",
    ],
    model: ["Model", "মডেল"],
    baseUrl: ["Base URL", "বেস URL"],
    removeKey: ["Remove key & go back to offline mode", "কী মুছে অফলাইন মোডে ফিরুন"],
    privacyNote: [
      "Privacy: this page is fully static. Your question goes either to the local knowledge base (default) or, if you enable AI, to the provider you picked along with the retrieved SIU passages needed to answer.",
      "গোপনীয়তা: এই পেজটি সম্পূর্ণ স্ট্যাটিক। আপনার প্রশ্ন হয় স্থানীয় নলেজ বেসে যায় (ডিফল্ট), নয়তো AI চালু করলে আপনার বাছাই করা প্রোভাইডারে—উত্তরের জন্য প্রয়োজনীয় SIU তথ্যসহ।",
    ],
    langHint: ["Switch the page and assistant language.", "পেজ ও সহায়কের ভাষা বদলান।"],
  };

  /* --- helpers ------------------------------------------------------------ */

  /* Typographic quotes and dashes are normalised so a dictionary key written
     with plain ASCII still matches the rendered markup. */
  const norm = (s) =>
    String(s)
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2013\u2014]/g, "-")
      .replace(/\s+/g, " ")
      .trim();

  const TEXT_INDEX = new Map();
  Object.keys(TEXT).forEach((k) => TEXT_INDEX.set(norm(k), TEXT[k]));
  const PH_INDEX = new Map();
  Object.keys(PLACEHOLDER).forEach((k) => PH_INDEX.set(norm(k), PLACEHOLDER[k]));

  let lang = (() => {
    try {
      return localStorage.getItem(LS_LANG) === "bn" ? "bn" : "en";
    } catch {
      return "en";
    }
  })();

  const getLang = () => lang;

  function t(key, fallback) {
    const pair = KEYS[key];
    if (!pair) return fallback != null ? fallback : key;
    return pair[lang === "bn" ? 1 : 0];
  }

  function firstTextNode(el) {
    for (let i = 0; i < el.childNodes.length; i++) {
      const n = el.childNodes[i];
      if (n.nodeType === 3 && n.nodeValue.trim()) return n;
    }
    return null;
  }

  function canTranslate(el) {
    if (!el || el.nodeType !== 1) return false;
    if (/^(SCRIPT|STYLE|TEXTAREA|OPTION|SELECT|CODE|PRE|KBD|SAMP|SVG|IFRAME)$/i.test(el.tagName)) return false;
    if (el.closest("[data-i18n-skip]")) return false;
    for (let i = 0; i < el.childNodes.length; i++) {
      const n = el.childNodes[i];
      if (n.nodeType === 3) continue;
      if (n.nodeType === 1 && /^(SVG|BR)$/i.test(n.tagName)) continue;
      return false;
    }
    return true;
  }

  function translateElement(el) {
    if (!canTranslate(el)) return false;
    const node = firstTextNode(el);
    if (!node) return false;
    const raw = node.nodeValue;
    const bn = TEXT_INDEX.get(norm(raw));
    if (!bn) return false;
    if (!el.hasAttribute("data-i18n-orig")) el.setAttribute("data-i18n-orig", raw);
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.match(/\s*$/)[0];
    const next = lead + bn + trail;
    if (node.nodeValue !== next) node.nodeValue = next;
    return true;
  }

  function translateAttributes(root, on) {
    root.querySelectorAll("[placeholder]").forEach((el) => {
      if (on) {
        const bn = PH_INDEX.get(norm(el.getAttribute("placeholder")));
        if (!bn) return;
        if (!el.hasAttribute("data-i18n-ph-orig")) el.setAttribute("data-i18n-ph-orig", el.getAttribute("placeholder"));
        el.setAttribute("placeholder", bn);
      } else if (el.hasAttribute("data-i18n-ph-orig")) {
        el.setAttribute("placeholder", el.getAttribute("data-i18n-ph-orig"));
        el.removeAttribute("data-i18n-ph-orig");
      }
    });
  }

  function applyTo(root) {
    if (lang !== "bn") return;
    const scope = root && root.nodeType === 1 ? root : document.body;
    if (!scope) return;
    translateElement(scope);
    scope.querySelectorAll("*").forEach(translateElement);
    translateAttributes(scope, true);
  }

  function restore(root) {
    const scope = root && root.nodeType === 1 ? root : document.body;
    if (!scope) return;
    const els = [];
    if (scope.hasAttribute && scope.hasAttribute("data-i18n-orig")) els.push(scope);
    scope.querySelectorAll("[data-i18n-orig]").forEach((el) => els.push(el));
    els.forEach((el) => {
      const node = firstTextNode(el);
      if (node) node.nodeValue = el.getAttribute("data-i18n-orig");
      el.removeAttribute("data-i18n-orig");
    });
    translateAttributes(scope, false);
  }

  function paintToggles() {
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      const label = btn.querySelector("[data-lang-label]");
      if (label) label.textContent = lang === "bn" ? "English" : "বাংলা";
      btn.setAttribute("aria-label", lang === "bn" ? "Switch to English" : "বাংলায় দেখুন");
      btn.setAttribute("title", lang === "bn" ? "Switch to English" : "বাংলায় দেখুন");
      btn.setAttribute("aria-pressed", String(lang === "bn"));
    });
    document.querySelectorAll("[data-lang-choice]").forEach((btn) => {
      const on = btn.dataset.langChoice === lang;
      const dark = !!btn.closest("[data-chat-panel]");
      btn.classList.toggle("bg-brand-500", on);
      btn.classList.toggle("text-white", on);
      btn.classList.toggle(dark ? "bg-white/10" : "bg-white", !on);
      btn.classList.toggle(dark ? "text-slate-300" : "text-slate-600", !on);
      btn.setAttribute("aria-pressed", String(on));
    });
  }

  function setLang(next, opts = {}) {
    lang = next === "bn" ? "bn" : "en";
    try {
      localStorage.setItem(LS_LANG, lang);
    } catch {}
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
    document.documentElement.setAttribute("data-lang", lang);
    if (lang === "bn") applyTo(document.body);
    else restore(document.body);
    paintToggles();
    if (!opts.silent) {
      window.dispatchEvent(new CustomEvent("siu:langchange", { detail: { lang } }));
    }
  }

  const toggle = () => setLang(lang === "bn" ? "en" : "bn");

  /* Any element with data-lang-toggle flips the language. */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang-toggle]");
    if (btn) {
      e.preventDefault();
      toggle();
      return;
    }
    const choice = e.target.closest("[data-lang-choice]");
    if (choice) {
      e.preventDefault();
      setLang(choice.dataset.langChoice);
    }
  });

  function init() {
    document.documentElement.lang = lang === "bn" ? "bn" : "en";
    document.documentElement.setAttribute("data-lang", lang);
    if (lang === "bn") applyTo(document.body);
    paintToggles();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.SIUi18n = {
    t,
    getLang,
    setLang,
    toggle,
    applyTo,
    restore,
    paintToggles,
    ready: true,
  };
})();
