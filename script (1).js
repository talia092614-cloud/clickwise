'use strict';
/* ===== Quickwise: built-in demo, no AI, no server ===== */
const $ = s => document.querySelector(s);

/* ---------- Built-in topics ---------- */
const TOPICS = [
{ id:'fractions', name:'Fractions', k:/fraction|numerator|denominator|\d\/\d|pizza slice/i,
  sample:'What is a fraction? I don\'t get what 3/4 means.',
  simple:'A fraction is a part of a whole. The bottom number tells you how many equal pieces the whole is cut into. The top number tells you how many of those pieces you have. So 3/4 means 3 pieces out of 4.',
  example:'Picture a pizza cut into 8 equal slices. You eat 3. You ate 3/8 of the pizza. Cut the same pizza into only 4 slices and each slice gets bigger, so 1/4 is more pizza than 1/8.',
  steps:['Find the whole. What is being split up? (a pizza, a bar, a group)','Count the equal pieces in the whole. That is the bottom number (denominator).','Count the pieces you are talking about. That is the top number (numerator).','Write top over bottom. 3 pieces out of 8 is 3/8.','Check it makes sense: the top is never bigger than the bottom unless you have more than one whole.'],
  alts:['Think of a chocolate bar with 12 squares. If you share 6 squares, you gave away 6/12, which is the same as half. Different-looking fractions can name the same amount.','Think of a ruler or number line between 0 and 1. A fraction is a point on that line. 3/4 sits three quarters of the way from 0 to 1, close to the end.'],
  words:[['Whole','The full thing before it is split.'],['Denominator','The bottom number: how many equal pieces in the whole.'],['Numerator','The top number: how many pieces you have.']],
  start:['Decide what the whole is and how many equal pieces it has.','You cannot say how many pieces you have until you know how big the whole is.'],
  p:{q:'A pizza has 6 equal slices and you eat 2. What fraction of the pizza did you eat? (Type it like 2/6)',a:['2/6','1/3'],good:'Yes! 2 out of 6 slices is 2/6, which can also be written as 1/3.',bad:'Not quite. The bottom number is the total slices (6) and the top is the slices eaten (2), so 2/6.',hints:['What is the whole? How many slices does it have?','That number goes on the bottom.','Now count the slices you ate. That goes on top.']}},
{ id:'photosynthesis', name:'Photosynthesis', k:/photosynth|chlorophyll|how do plants (make|get)|plants? (eat|food)/i,
  sample:'How does photosynthesis work?',
  simple:'Plants make their own food. They take in sunlight, water, and carbon dioxide from the air. They use the light\'s energy to turn these into sugar. They also release oxygen.',
  example:'A plant is like a tiny kitchen powered by the sun. Leaves are the solar panels, water and air are the ingredients, and sugar is the meal. Oxygen is the steam that floats out.',
  steps:['Roots pull water from the soil up to the leaves.','Leaves take in carbon dioxide from the air through tiny holes.','Chlorophyll (the green stuff) captures energy from sunlight.','That energy turns water and carbon dioxide into sugar for the plant.','Oxygen is released into the air as a by-product.'],
  alts:['Compare it to baking bread. Flour, water, and heat go in; bread comes out. For a plant: water, carbon dioxide, and light go in; sugar and oxygen come out.','Think of the equation as a recipe: carbon dioxide + water + light energy → sugar + oxygen. Read it left to right like a cooking instruction.'],
  words:[['Chlorophyll','The green substance in leaves that catches sunlight.'],['Carbon dioxide','A gas in the air that animals breathe out.'],['Glucose','A type of sugar plants make for energy.']],
  start:['Ask: what goes in, and what comes out?','Most science processes make sense once you separate inputs from outputs.'],
  p:{q:'Which gas do plants take in from the air for photosynthesis?',a:['carbondioxide','co2'],good:'Correct! Plants take in carbon dioxide and release oxygen.',bad:'Not quite. Plants take in carbon dioxide (CO2). Oxygen is what they release.',hints:['It is a gas animals breathe out.','Its name starts with "carbon".']}},
{ id:'weather', name:'Weather vs. climate', k:/weather|climate/i,
  sample:'What is the difference between weather and climate?',
  simple:'Weather is what the sky is doing right now or this week: rain, sun, wind. Climate is the usual weather in a place over many years, usually 30 or more.',
  example:'Weather is your mood today. Climate is your personality. You can be grumpy one day (weather) and still be a cheerful person overall (climate).',
  steps:['Ask: am I talking about a short time or a long time?','Short time (hours, days, a week) means weather.','Long time (decades of averages) means climate.','Check the clue words: "today" or "this weekend" is weather. "Usually" or "on average" is climate.'],
  alts:['Think of your closet. Weather is what you wear today. Climate is the kind of clothes you own because of where you live. A snowy place has many coats.','Think of a basketball player. Weather is one game\'s score. Climate is their season average. One bad game does not change the average.'],
  words:[['Weather','Conditions in the air at a certain time and place.'],['Climate','The average weather in a place over many years.'],['Average','The typical amount, found by combining many measurements.']],
  start:['Find the time clue in the question: how long is it talking about?','The length of time is the whole difference between the two words.'],
  p:{q:'"It rained all afternoon in Seattle yesterday." Is that weather or climate?',a:['weather'],good:'Yes! It is about one afternoon, so it is weather.',bad:'Not quite. It describes one afternoon, a short time, so it is weather.',hints:['How long a time does the sentence describe?']}},
{ id:'computers', name:'Basic computer concepts', k:/computer|cpu|\bram\b|memory|storage|hard drive|operating system|software|hardware/i,
  sample:'What is the difference between RAM and storage on a computer?',
  simple:'A computer has a brain (the CPU), short-term memory (RAM), and long-term storage (a drive). The CPU does the work. RAM holds what you are using right now. Storage keeps your files even when the power is off.',
  example:'Think of a desk and a filing cabinet. The cabinet is storage: lots of room, files stay put. The desk is RAM: small, but things you are working on sit there for quick reach. You, doing the work, are the CPU.',
  steps:['You click a file. It lives in storage.','The computer copies it into RAM so it can open it quickly.','The CPU reads it and follows the instructions.','When you save, the changes go back to storage.','When you turn the computer off, RAM empties. Storage keeps your saved files.'],
  alts:['Think of a kitchen. The fridge is storage, the counter is RAM, and the chef is the CPU. Food comes out of the fridge to the counter when it is time to cook.','Think of a library. Storage is the shelves of books. RAM is the books open on your table. More table space means more books open at once.'],
  words:[['CPU','The part that does the calculations. The computer\'s brain.'],['RAM','Fast, temporary memory for what is in use right now.'],['Storage','Where files are kept long term, like a hard drive or SSD.']],
  start:['Name the parts: which one thinks, which one holds things temporarily, which one keeps things?','Each part has one job, so knowing the jobs makes the rest simple.'],
  p:{q:'Which part keeps your files when the computer is turned off: RAM or storage?',a:['storage'],good:'Right! Storage keeps files without power. RAM empties when you shut down.',bad:'Not quite. RAM is temporary and empties at shutdown, so the answer is storage.',hints:['Which one is like the filing cabinet?']}},
{ id:'instructions', name:'Understanding confusing instructions', k:/instruction|directions|assignment|rubric|prompt|homework says|what (does|is) (it|this) asking|task says/i,
  sample:'These instructions confuse me: "Compare and contrast two characters and support your answer with evidence."',
  simple:'Long instructions are just small tasks stuck together. Find the action words (compare, explain, list). Find what you must hand in. Then do one small task at a time.',
  example:'Instructions are like a recipe. "Compare and contrast two characters and support it with evidence" means: pick two characters, say how they are alike, say how they are different, and give a quote or detail for each point.',
  steps:['Read once without stopping.','Circle the action words, like compare, contrast, support.','Underline what you must produce: an essay, a list, a diagram.','Note limits: length, due date, number of examples.','Rewrite the instructions as a checklist in your own words.','Start with the first checklist item.'],
  alts:['Pretend to explain the instructions to a younger friend. If you can say it in your own words, you understand it. Where you get stuck is the confusing part.','Turn each action word into a question. "Compare" becomes "How are they alike?" and "support" becomes "What is my proof?" Questions are easier to answer than instructions.'],
  words:[['Compare','Say how things are alike.'],['Contrast','Say how things are different.'],['Evidence','A fact, quote, or detail that proves your point.']],
  start:['Circle the action words first.','Action words tell you what to do, so they show the shape of the whole job.'],
  p:{q:'In "Compare and contrast two animals", what does "contrast" ask you to do?',a:['different','difference','differ'],good:'Yes! Contrast means saying how they are different.',bad:'Not quite. Compare is about similarities. Contrast is about differences.',hints:['Compare is about how things are alike. What is the opposite?']}}
];

const CONF = {
  words:'I don\'t understand the words.',
  idea:'I understand the words, but not the idea.',
  start:'I don\'t know how to start.',
  solve:'I understand the explanation, but I can\'t solve it myself.'
};
const MODES = { simple:'Explain Simply', example:'Show Me an Example', steps:'Break It Down', check:'Check My Understanding' };
const DEFAULT_MODE = { words:'simple', idea:'example', start:'steps', solve:'check' };

/* ---------- Service layer: swap this for a real AI later ----------
   To add a real AI, make explain() call YOUR OWN backend (never put secret keys in this file).
   readImage() is where OCR / a vision service could be added for photos. */
const Quickwise = {
  async readImage(file) { return null; }, // no OCR in this version
  async explain(question) {
    await new Promise(r => setTimeout(r, 500));
    const topic = TOPICS.find(t => t.k.test(question));
    return topic ? { status:'ok', topic } : { status:'unsupported' };
  }
};

/* ---------- State & helpers ---------- */
const S = { q:'', cat:'School Subject', conf:'', topic:null, mode:'simple', alt:0, hint:0 };
const $$ = s => [...document.querySelectorAll(s)];
const show = (el, on) => { el.hidden = !on; };

/* ---------- Menu ---------- */
$('#menuBtn').addEventListener('click', () => {
  const m = $('#menu'), open = m.classList.toggle('open');
  $('#menuBtn').setAttribute('aria-expanded', open);
});
$('#menu').addEventListener('click', e => {
  if (e.target.tagName === 'A') { $('#menu').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded', false); }
});

/* ---------- Confusion chips ---------- */
function buildChips() {
  ['#confHome', '#confExp'].forEach(sel => {
    const box = $(sel); box.innerHTML = '';
    Object.entries(CONF).forEach(([key, label]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.textContent = label;
      b.setAttribute('aria-pressed', S.conf === key);
      b.addEventListener('click', () => setConf(S.conf === key ? '' : key));
      box.appendChild(b);
    });
  });
}
function setConf(key) {
  S.conf = key; S.hint = 0; buildChips();
  if (S.topic && !$('#supported').hidden) { S.mode = DEFAULT_MODE[key] || 'simple'; render(); }
}

/* ---------- Photo (local only) ---------- */
const OK_TYPES = ['image/jpeg', 'image/png', 'image/webp'], MAX_BYTES = 8 * 1024 * 1024;
let photoUrl = null;
function photoError(msg) { const e = $('#photoErr'); e.textContent = msg; show(e, !!msg); }
function clearPhoto() {
  if (photoUrl) URL.revokeObjectURL(photoUrl);
  photoUrl = null; $('#previewImg').removeAttribute('src'); show($('#preview'), false); photoError('');
}
function setPhoto(file) {
  if (!file) return;
  if (!OK_TYPES.includes(file.type)) return photoError('That file type won\'t work. Please choose a JPG, PNG, or WEBP image.');
  if (file.size > MAX_BYTES) return photoError('That photo is too large (over 8 MB). Please try a smaller one.');
  clearPhoto();
  photoUrl = URL.createObjectURL(file);
  $('#previewImg').src = photoUrl; $('#previewImg').alt = 'Preview of your selected photo';
  show($('#preview'), true); $('#q').focus();
  Quickwise.readImage(file); // future hook; currently returns null
}
['#cam', '#upl'].forEach(sel => $(sel).addEventListener('change', e => { setPhoto(e.target.files[0]); e.target.value = ''; }));
$('#replaceBtn').addEventListener('click', () => $('#upl').click());
$('#removeBtn').addEventListener('click', () => { clearPhoto(); $('#q').focus(); });
window.addEventListener('pagehide', clearPhoto);

/* ---------- History (localStorage, text only) ---------- */
const KEY = 'quickwise.recent.v1';
function loadHist() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
function saveHist(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }
function addHist(q, cat) {
  const list = loadHist().filter(x => x.q !== q);
  list.unshift({ q, cat }); saveHist(list.slice(0, 8)); renderHist();
}
function renderHist() {
  const box = $('#recentList'), list = loadHist(); box.innerHTML = '';
  if (!list.length) { box.innerHTML = '<p class="empty">No questions yet. Ask one above and it will show up here so you can come back to it.</p>'; return; }
  list.forEach(item => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'rec';
    const a = document.createElement('span'); a.textContent = item.q;
    const t = document.createElement('span'); t.className = 'tag'; t.textContent = item.cat;
    b.append(a, t);
    b.addEventListener('click', () => { $('#q').value = item.q; $('#cat').value = item.cat; submit(); });
    box.appendChild(b);
  });
}
$('#clearBtn').addEventListener('click', () => { saveHist([]); renderHist(); });

/* ---------- Submit ---------- */
async function submit() {
  const q = $('#q').value.trim(), cat = $('#cat').value, msg = $('#formMsg');
  if (!q) {
    msg.textContent = photoUrl ? 'Please type or correct the question from your photo in the box above.' : 'Please type a question first, or try the example below.';
    show(msg, true); $('#q').focus(); return;
  }
  show(msg, false);
  S.q = q; S.cat = cat; S.alt = 0; S.hint = 0;
  addHist(q, cat);
  show($('#result'), true); show($('#resultBody'), false); show($('#loading'), true);
  $('#result').scrollIntoView({ behavior:'smooth' });
  const res = await Quickwise.explain(q, cat, S.conf);
  show($('#loading'), false); show($('#resultBody'), true);
  $('#qEcho').textContent = q;
  if (res.status === 'ok') {
    S.topic = res.topic; S.mode = DEFAULT_MODE[S.conf] || 'simple';
    show($('#unsupported'), false); show($('#supported'), true); render();
  } else {
    S.topic = null; show($('#supported'), false); renderUnsupported();
  }
  $('#result').focus({ preventScroll:true });
}
$('#askForm').addEventListener('submit', e => { e.preventDefault(); submit(); });
$('#exampleBtn').addEventListener('click', () => { $('#q').value = TOPICS[0].sample; $('#cat').value = 'School Subject'; submit(); });

function renderUnsupported() {
  const box = $('#unsupported'); show(box, true);
  box.innerHTML = '<h2>That\'s outside what this demo knows</h2><p>This version of Quickwise has no live AI, and only a few built-in topics. I don\'t want to guess and give you a wrong explanation. Try one of these samples:</p><div class="chips" id="sampleChips"></div><p class="small">Tip: asking a teacher or classmate is a great next step for anything else.</p>';
  TOPICS.forEach(t => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.textContent = t.name;
    b.addEventListener('click', () => { $('#q').value = t.sample; submit(); });
    $('#sampleChips').appendChild(b);
  });
}

/* ---------- Render explanation ---------- */
function guideHTML(t) {
  switch (S.conf) {
    case 'words': return '<h3>Let\'s start with the words</h3><dl>' + t.words.map(w => `<dt>${w[0]}</dt><dd>${w[1]}</dd>`).join('') + '</dl>';
    case 'idea': return `<h3>Let\'s picture the idea</h3><p>${t.example}</p>`;
    case 'start': return `<h3>Here\'s where to begin</h3><p><strong>First step:</strong> ${t.start[0]}</p><p><strong>Why this comes first:</strong> ${t.start[1]}</p>`;
    case 'solve': return '<h3>Let\'s practice it yourself</h3><p>Seeing it explained is different from doing it. Open <strong>Check My Understanding</strong> and use the hints one at a time.</p>';
    default: return '<h3>Tip</h3><p>Tell Quickwise what part is confusing and the guidance will change to fit you.</p>';
  }
}
function render() {
  const t = S.topic;
  $('#topicName').textContent = t.name;
  $('#guide').innerHTML = guideHTML(t);
  const tabs = $('#tabs'); tabs.innerHTML = '';
  Object.entries(MODES).forEach(([key, label]) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tab'; b.textContent = label;
    b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', S.mode === key);
    b.addEventListener('click', () => { S.mode = key; render(); });
    tabs.appendChild(b);
  });
  let html = '';
  if (S.alt > 0) {
    html += `<div class="alt"><strong>Another way (attempt ${S.alt}):</strong> ${t.alts[(S.alt - 1) % t.alts.length]}`;
    if (S.alt > t.alts.length) html += '<br><span class="small">That\'s all the different approaches built into this demo. Try Check My Understanding, or ask a teacher.</span>';
    html += '</div>';
  }
  if (S.mode === 'simple') html += `<p class="big-text">${t.simple}</p>`;
  else if (S.mode === 'example') html += `<p class="big-text">${t.example}</p>`;
  else if (S.mode === 'steps') html += '<ol class="steps">' + t.steps.map((s, i) => `<li class="${S.conf === 'start' && i === 0 ? 'first' : ''}">${s}</li>`).join('') + '</ol>';
  else html += `<div class="practice"><p class="big-text"><strong>${t.p.q}</strong></p><input id="ans" type="text" aria-label="Your answer" autocomplete="off"><button type="button" class="btn primary" id="checkBtn">Check answer</button><button type="button" class="btn ghost" id="hintBtn">Give me a hint</button><div id="fb" aria-live="polite"></div></div>`;
  $('#panel').innerHTML = html;
  if (S.mode === 'check') bindPractice();
}
function bindPractice() {
  const t = S.topic, fb = $('#fb'), ans = $('#ans');
  const say = (cls, text) => { fb.className = 'fb ' + cls; fb.textContent = text; };
  $('#checkBtn').addEventListener('click', () => {
    const v = ans.value.toLowerCase().replace(/\s+/g, '');
    if (!v) return say('nope', 'Type an answer first. A guess is fine!');
    t.p.a.some(a => v.includes(a)) ? say('good', t.p.good) : say('nope', t.p.bad);
  });
  ans.addEventListener('keydown', e => { if (e.key === 'Enter') $('#checkBtn').click(); });
  $('#hintBtn').addEventListener('click', () => {
    say('good', 'Hint: ' + t.p.hints[Math.min(S.hint, t.p.hints.length - 1)]);
    S.hint++;
  });
}

/* ---------- Other-way and start-over ---------- */
$('#stillBtn').addEventListener('click', () => { S.alt++; if (S.mode === 'check') S.mode = 'example'; render(); $('#panel').focus(); });
$('#startOver').addEventListener('click', () => {
  $('#q').value = ''; clearPhoto(); S.conf = ''; buildChips(); show($('#result'), false);
  $('#home').scrollIntoView({ behavior:'smooth' }); $('#q').focus();
});

/* ---------- Highlight nav link on scroll ---------- */
const links = $$('#menu a');
window.addEventListener('scroll', () => {
  let cur = 'home';
  ['home', 'how', 'recent'].forEach(id => { if (document.getElementById(id).getBoundingClientRect().top < 140) cur = id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive:true });

buildChips(); renderHist();
