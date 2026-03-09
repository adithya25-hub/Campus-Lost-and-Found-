/* ============================================
   GCET Campus Lost & Found — Application Logic v2
   ============================================ */

// ========== SVG ICON SYSTEM ==========
const ICONS = {
  mapPin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  calendar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  search: '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  wallet: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
  phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  idCard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  laptop: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>',
  keys: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/></svg>',
  bag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  bottle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H9v2l-1 1v3a8 8 0 0 0 0 12h8a8 8 0 0 0 0-12V5l-1-1V2z"/></svg>',
  charger: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19"/><line x1="23" y1="13" x2="23" y2="11"/><polyline points="11 6 7 12 13 12 9 18"/></svg>',
  other: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>',
  building: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01"/></svg>',
  book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
  coffee: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
  trophy: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>',
  target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  trees: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M16 13v.2A3 3 0 0 1 14.9 19H11a3 3 0 0 1-1-5.8V13a3 3 0 0 1 6 0Z"/></svg>',
  dumbbell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>',
};

const categoryIconMap = {
  wallet: ICONS.wallet,
  phone: ICONS.phone,
  'id-card': ICONS.idCard,
  laptop: ICONS.laptop,
  keys: ICONS.keys,
  bag: ICONS.bag,
  bottle: ICONS.bottle,
  charger: ICONS.charger,
  other: ICONS.other,
};

// ========== DATA STORE ==========
const campusLocations = [
  { name: 'Block 1', icon: ICONS.building },
  { name: 'Block 2', icon: ICONS.building },
  { name: 'Block 3', icon: ICONS.building },
  { name: 'Block 4', icon: ICONS.building },
  { name: 'Block 5', icon: ICONS.building },
  { name: 'Library', icon: ICONS.book },
  { name: 'Canteen', icon: ICONS.coffee },
  { name: 'Football Ground', icon: ICONS.trophy },
  { name: 'Basketball Court', icon: ICONS.target },
  { name: 'Open Lawn', icon: ICONS.trees },
  { name: 'Open Gym', icon: ICONS.dumbbell },
];

let claims = []; // Tracks claim verification requests

let lostItems = [
  { id: 1, name: 'Black Leather Wallet', category: 'wallet', description: 'Black leather bifold wallet with GCET ID card and some cash inside. Has a small scratch on the front.', location: 'Basketball Court', locationDetail: '', date: '2026-03-07', email: 'rahul.m@gcet.edu.in', image: null, status: 'lost' },
  { id: 2, name: 'Samsung Galaxy Phone', category: 'phone', description: 'Samsung Galaxy S24 in midnight blue color with a transparent case. Lock screen has a mountain wallpaper.', location: 'Library', locationDetail: 'Reading Section', date: '2026-03-06', email: 'priya.k@gcet.edu.in', image: null, status: 'lost' },
  { id: 3, name: 'Student ID Card', category: 'id-card', description: 'ID card belonging to DS department. Name on card: Adithya Gudishetty, Roll No: 24R11A67E6.', location: 'Block 2', locationDetail: 'Classroom R201', date: '2026-03-05', email: '24r11a67e6@gcet.edu.in', image: null, status: 'lost' },
  { id: 4, name: 'Silver Keychain with 3 Keys', category: 'keys', description: 'A silver keychain with 3 keys — one Godrej lock key and two smaller keys. Has a small teddy bear keychain attached.', location: 'Canteen', locationDetail: '', date: '2026-03-07', email: 'anjali.r@gcet.edu.in', image: null, status: 'lost' },
  { id: 5, name: 'Black HP Laptop Bag', category: 'bag', description: 'Black HP branded laptop bag with some notebooks and a calculator inside. Has a blue tag on the strap.', location: 'Block 3', locationDetail: 'Classroom 302', date: '2026-03-04', email: 'vikram.s@gcet.edu.in', image: null, status: 'lost' },
];

let foundItems = [
  { id: 101, name: 'Blue Water Bottle', category: 'bottle', description: 'A blue Milton water bottle, 1 litre capacity. Found on the table near the south entrance.', location: 'Canteen', locationDetail: 'South Entrance', date: '2026-03-07', email: 'meera.p@gcet.edu.in', image: null, status: 'found' },
  { id: 102, name: 'Dell Laptop Charger', category: 'charger', description: 'Dell 65W laptop charger with a blue tip. Found plugged into the wall socket in Room 401.', location: 'Block 4', locationDetail: 'Room 401', date: '2026-03-06', email: 'arjun.v@gcet.edu.in', image: null, status: 'found' },
  { id: 103, name: 'Black Backpack', category: 'bag', description: 'Large black Wildcraft backpack with a red zipper. Contains textbooks and a pencil box. Found near the benches.', location: 'Football Ground', locationDetail: '', date: '2026-03-05', email: 'deepa.n@gcet.edu.in', image: null, status: 'found' },
  { id: 104, name: 'Wired Earphones', category: 'other', description: 'White wired earphones (Apple-style with lightning connector). Found on a desk in reading section.', location: 'Library', locationDetail: 'Computer Lab', date: '2026-03-07', email: 'karthik.b@gcet.edu.in', image: null, status: 'found' },
  { id: 105, name: 'Prescription Glasses', category: 'other', description: 'Black-framed rectangular prescription glasses in a brown leather case. Found on a bench.', location: 'Open Lawn', locationDetail: '', date: '2026-03-06', email: 'sneha.g@gcet.edu.in', image: null, status: 'found' },
];

const feedMessages = [
  { text: 'Wallet found near Basketball Court.', type: 'found', time: '2 min ago' },
  { text: 'Student ID reported lost in Block 2 – Classroom 204.', type: 'lost', time: '8 min ago' },
  { text: 'Blue water bottle found in Canteen.', type: 'found', time: '15 min ago' },
  { text: 'Samsung phone reported lost in Library – Reading Section.', type: 'lost', time: '22 min ago' },
  { text: 'Dell laptop charger found in Block 4 – Room 401.', type: 'found', time: '30 min ago' },
  { text: 'Backpack found near Football Ground.', type: 'found', time: '45 min ago' },
  { text: 'Silver keychain reported lost in Canteen.', type: 'lost', time: '1 hour ago' },
  { text: 'Earphones found in Library – Computer Lab.', type: 'found', time: '1.5 hours ago' },
  { text: 'HP laptop bag reported lost in Block 3 – Classroom 302.', type: 'lost', time: '2 hours ago' },
  { text: 'Prescription glasses found on Open Lawn.', type: 'found', time: '3 hours ago' },
];

let nextId = 200;

// ========== UTILITY ==========
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatLocation(location, detail) {
  if (detail) return `${escapeHtml(location)} &bull; ${escapeHtml(detail)}`;
  return escapeHtml(location);
}

// ========== AUTHENTICATION ==========
const GCET_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gcet\.edu\.in$/;

function checkAuth() {
  const user = localStorage.getItem('gcet_user');
  const overlay = document.getElementById('login-overlay');
  if (user) {
    overlay.classList.add('hidden');
    document.getElementById('nav-user-email').textContent = user;
    document.getElementById('lost-item-email').value = user;
  } else {
    overlay.classList.remove('hidden');
  }
}

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const errorEl = document.getElementById('login-error');
  if (GCET_EMAIL_REGEX.test(email)) {
    localStorage.setItem('gcet_user', email);
    errorEl.classList.remove('show');
    checkAuth();
    showToast('Welcome to GCET Lost & Found');
  } else {
    errorEl.classList.add('show');
  }
});

document.getElementById('nav-logout').addEventListener('click', function () {
  localStorage.removeItem('gcet_user');
  checkAuth();
});

// ========== RENDER FUNCTIONS ==========

function getBadgeInfo(item, type) {
  if (item.status === 'returned') return { class: 'badge-returned', text: 'Returned' };
  if (item.status === 'claim-pending') return { class: 'badge-pending', text: 'Claim Pending' };
  return type === 'lost' ? { class: 'badge-lost', text: 'Lost' } : { class: 'badge-found', text: 'Found' };
}

function createItemCard(item, type) {
  const iconSvg = categoryIconMap[item.category] || ICONS.other;
  const badge = getBadgeInfo(item, type);
  const formattedDate = new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const locationDisplay = formatLocation(item.location, item.locationDetail);
  const categoryLabel = item.category === 'id-card' ? 'ID Card' : item.category;

  const imgHtml = item.image
    ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">`
    : `<span class="item-placeholder-icon">${iconSvg}</span>`;

  return `
    <div class="item-card" onclick="openItemDetail(${item.id}, '${type}')" style="cursor: pointer;">
      <div class="item-card-img">
        ${imgHtml}
        <span class="item-card-badge ${badge.class}">${badge.text}</span>
        <span class="item-card-category">${escapeHtml(categoryLabel)}</span>
      </div>
      <div class="item-card-body">
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description || 'No description provided.')}</p>
        <div class="item-card-meta">
          <span>${ICONS.mapPin}${locationDisplay}</span>
          <span>${ICONS.calendar}${formattedDate}</span>
        </div>
      </div>
    </div>
  `;
}

function renderLostItems() {
  document.getElementById('lost-items-grid').innerHTML = lostItems.map(item => createItemCard(item, 'lost')).join('');
}

function renderFoundItems() {
  document.getElementById('found-items-grid').innerHTML = foundItems.map(item => createItemCard(item, 'found')).join('');
}

function renderLocations() {
  document.getElementById('locations-grid').innerHTML = campusLocations.map(loc => `
    <div class="location-card">
      <div class="location-icon">${loc.icon}</div>
      <h4>${escapeHtml(loc.name)}</h4>
    </div>
  `).join('');
}

function renderFeed() {
  document.getElementById('feed-list').innerHTML = feedMessages.map((msg, i) => `
    <div class="feed-item ${msg.type}-feed" style="animation-delay: ${i * 0.05}s">
      <span class="feed-dot ${msg.type}"></span>
      <div class="feed-text">
        <p>${escapeHtml(msg.text)}</p>
        <span class="feed-time">${msg.time}</span>
      </div>
    </div>
  `).join('');
}

function renderDashboard() {
  const user = localStorage.getItem('gcet_user');
  const myItemsList = document.getElementById('dashboard-my-items-list');
  const myClaimsList = document.getElementById('dashboard-my-claims-list');
  const requestsList = document.getElementById('dashboard-claim-requests-list');

  if (!user) {
    const emptyMsg = '<div class="dash-item"><p class="dash-item-info">Please log in to view dashboard.</p></div>';
    if (myItemsList) myItemsList.innerHTML = emptyMsg;
    if (myClaimsList) myClaimsList.innerHTML = emptyMsg;
    if (requestsList) requestsList.innerHTML = emptyMsg;
    return;
  }

  // 1. My Reported Items
  if (myItemsList) {
    const myItems = [...lostItems, ...foundItems].filter(i => i.email === user);
    myItemsList.innerHTML = myItems.length === 0 ? '<div class="dash-item"><p class="dash-item-info" style="color:var(--gray-400)">No items reported yet.</p></div>' : myItems.map(item => {
      const iconSvg = categoryIconMap[item.category] || ICONS.other;
      return `<div class="dash-item"><div class="dash-item-icon">${iconSvg}</div><div class="dash-item-info"><h5>${escapeHtml(item.name)}</h5><p>Status: ${item.status.toUpperCase()}</p></div></div>`;
    }).join('');
  }

  // 2. My Claims
  if (myClaimsList) {
    const userClaims = claims.filter(c => c.claimantEmail === user);
    myClaimsList.innerHTML = userClaims.length === 0 ? '<div class="dash-item"><p class="dash-item-info" style="color:var(--gray-400)">No claims made yet.</p></div>' : userClaims.map(c => {
      return `<div class="dash-item"><div class="dash-item-icon" style="color:var(--warning)">${ICONS.search}</div><div class="dash-item-info"><h5>${escapeHtml(c.itemName)}</h5><p>Status: ${c.status.toUpperCase()}</p></div></div>`;
    }).join('');
  }

  // 3. Claim Requests
  if (requestsList) {
    const myFoundItemIds = foundItems.filter(i => i.email === user).map(i => i.id);
    const receivedClaims = claims.filter(c => myFoundItemIds.includes(c.itemId));
    requestsList.innerHTML = receivedClaims.length === 0 ? '<div class="dash-item"><p class="dash-item-info" style="color:var(--gray-400)">No claim requests.</p></div>' : receivedClaims.map(c => {
      let actions = '';
      if (c.status === 'pending') {
        actions = `<div class="dash-action-group"><button class="btn btn-sm btn-primary" style="padding:4px 8px; font-size:11px;" onclick="approveClaim(${c.id})">Approve</button> <button class="btn btn-sm btn-secondary" style="padding:4px 8px; font-size:11px;" onclick="rejectClaim(${c.id})">Reject</button></div>`;
      }
      const cardClass = c.status === 'pending' ? 'claim-req-card' : (c.status === 'approved' ? 'claim-approved-card' : 'claim-rejected-card');
      return `<div class="dash-item ${cardClass}"><div class="dash-item-info" style="padding-left:12px;"><h5>Claim on: ${escapeHtml(c.itemName)}</h5><p>By: ${escapeHtml(c.claimantName)}</p>${actions}</div></div>`;
    }).join('');
  }
}

function renderSearchResults() {
  const query = document.getElementById('search-input').value.toLowerCase().trim();
  const category = document.getElementById('filter-category').value;
  const location = document.getElementById('filter-location').value;
  const type = document.getElementById('filter-type').value;

  let results = [];
  if (!type || type === 'lost') results = results.concat(lostItems.map(item => ({ ...item, _type: 'lost' })));
  if (!type || type === 'found') results = results.concat(foundItems.map(item => ({ ...item, _type: 'found' })));

  if (query) {
    results = results.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.description || '').toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      (item.locationDetail || '').toLowerCase().includes(query)
    );
  }
  if (category) results = results.filter(item => item.category === category);
  if (location) results = results.filter(item => item.location === location);

  const container = document.getElementById('search-results');
  if (results.length === 0 && (query || category || location || type)) {
    container.innerHTML = `<div class="no-results" style="grid-column:1/-1;"><div class="no-results-icon">${ICONS.search}</div><p>No items found matching your search.</p></div>`;
  } else if (!query && !category && !location && !type) {
    container.innerHTML = '';
  } else {
    container.innerHTML = results.map(item => createItemCard(item, item._type)).join('');
  }
}

// ========== MODALS ==========
function openModal(id) {
  const user = localStorage.getItem('gcet_user');
  if (!user) { showToast('Please log in first.'); return; }
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
  });
});

// ========== IMAGE PREVIEW ==========
function previewImage(input, previewId) {
  const preview = document.getElementById(previewId);
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) { preview.querySelector('img').src = e.target.result; preview.style.display = 'block'; };
    reader.readAsDataURL(input.files[0]);
  }
}

// ========== FORM SUBMISSIONS ==========
function submitLostItem() {
  const name = document.getElementById('lost-item-name').value.trim();
  const category = document.getElementById('lost-item-category').value;
  const description = document.getElementById('lost-item-description').value.trim();
  const location = document.getElementById('lost-item-location').value;
  const locationDetail = document.getElementById('lost-item-location-detail').value.trim();
  const date = document.getElementById('lost-item-date').value;
  const email = document.getElementById('lost-item-email').value.trim();

  if (!name || !category || !location || !date || !email) { showToast('Please fill in all required fields.'); return; }

  let imageData = null;
  const preview = document.getElementById('lost-image-preview').querySelector('img');
  if (preview && preview.src && !preview.src.endsWith('/')) imageData = preview.src;

  const item = { id: nextId++, name, category, description, location, locationDetail, date, email, image: imageData, status: 'lost' };
  lostItems.unshift(item);

  const feedLoc = locationDetail ? `${location} – ${locationDetail}` : location;
  feedMessages.unshift({ text: `${name} reported lost near ${feedLoc}.`, type: 'lost', time: 'Just now' });

  renderLostItems(); renderFeed(); renderDashboard();
  closeModal('lost-modal');
  document.getElementById('lost-form').reset();
  document.getElementById('lost-image-preview').style.display = 'none';
  showToast('Lost item reported successfully');

  const user = localStorage.getItem('gcet_user');
  if (user) document.getElementById('lost-item-email').value = user;
}

function submitFoundItem() {
  const name = document.getElementById('found-item-name').value.trim();
  const category = document.getElementById('found-item-category').value;
  const location = document.getElementById('found-item-location').value;
  const locationDetail = document.getElementById('found-item-location-detail').value.trim();
  const date = document.getElementById('found-item-date').value;
  const description = document.getElementById('found-item-description').value.trim();

  if (!name || !category || !location || !date) { showToast('Please fill in all required fields.'); return; }

  let imageData = null;
  const preview = document.getElementById('found-image-preview').querySelector('img');
  if (preview && preview.src && !preview.src.endsWith('/')) imageData = preview.src;

  const user = localStorage.getItem('gcet_user') || '';
  const item = { id: nextId++, name, category, description, location, locationDetail, date, email: user, image: imageData, status: 'found' };
  foundItems.unshift(item);

  const feedLoc = locationDetail ? `${location} – ${locationDetail}` : location;
  feedMessages.unshift({ text: `${name} found in ${feedLoc}.`, type: 'found', time: 'Just now' });

  renderFoundItems(); renderFeed(); renderDashboard();
  closeModal('found-modal');
  document.getElementById('found-form').reset();
  document.getElementById('found-image-preview').style.display = 'none';
  showToast('Found item reported successfully');
}

// ========== SUPPORT FORM ==========
document.getElementById('support-form').addEventListener('submit', function (e) {
  e.preventDefault();
  showToast('Message sent. We\'ll get back to you soon.');
  this.reset();
});

// ========== FAQ ==========
function toggleFaq(el) { el.closest('.faq-item').classList.toggle('open'); }

// ========== TOAST ==========
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span class="toast-message">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('toast-out'); setTimeout(() => toast.remove(), 250); }, 3500);
}

// ========== NAVBAR ==========
window.addEventListener('scroll', function () {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 16);
});

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) link.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

document.getElementById('nav-hamburger').addEventListener('click', function () {
  document.getElementById('nav-links').classList.toggle('open');
});
navLinks.forEach(link => { link.addEventListener('click', () => { document.getElementById('nav-links').classList.remove('open'); }); });

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ========== SEARCH LISTENERS ==========
document.getElementById('search-input').addEventListener('input', renderSearchResults);
document.getElementById('filter-category').addEventListener('change', renderSearchResults);
document.getElementById('filter-location').addEventListener('change', renderSearchResults);
document.getElementById('filter-type').addEventListener('change', renderSearchResults);

// ========== LIVE FEED ROTATION ==========
let feedRotateInterval;
function startFeedRotation() {
  const extraMessages = [
    'Umbrella found near Block 1 entrance.',
    'Calculator reported lost in Block 5 – Lab 3.',
    'Blue pen drive found in Library – Computer Lab.',
    'Sports shoes reported lost near Football Ground.',
    'Notebook found in Canteen – Seating Area.',
    'Watch reported lost near Open Gym.',
    'Lab coat found in Block 2 – Chemistry Lab.',
    'Headphones reported lost in Block 4 – Seminar Hall.',
  ];
  let extraIndex = 0;
  feedRotateInterval = setInterval(() => {
    const msg = { text: extraMessages[extraIndex % extraMessages.length], type: Math.random() > 0.5 ? 'found' : 'lost', time: 'Just now' };
    feedMessages.unshift(msg);
    if (feedMessages.length > 12) feedMessages.pop();
    renderFeed();
    extraIndex++;
  }, 8000);
}

// ========== COUNTER ANIMATION ==========
function animateCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent, 10);
        let current = 0;
        const step = Math.max(1, Math.floor(target / 25));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = current;
        }, 35);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hero-stat-value').forEach(el => observer.observe(el));
}

// ========== ADVANCED FEATURES: MATCHING & CLAIMING ==========
let currentDetailItemId = null;
let currentDetailItemType = null;

function findMatches(item, type) {
  const targetList = type === 'lost' ? foundItems : lostItems;
  const matches = [];

  const itemWords = `${item.name} ${item.description || ''}`.toLowerCase().split(/\s+/);

  targetList.forEach(target => {
    let score = 0;
    if (target.status === 'returned') return;

    if (item.category === target.category) score += 5;
    if (item.location === target.location) score += 3;

    const targetWords = `${target.name} ${target.description || ''}`.toLowerCase();
    itemWords.forEach(word => {
      if (word.length > 3 && targetWords.includes(word)) score += 1;
    });

    if (score >= 4) matches.push({ target, score });
  });

  return matches.sort((a, b) => b.score - a.score).slice(0, 3).map(m => m.target);
}

function openItemDetail(id, type) {
  const list = type === 'lost' ? lostItems : foundItems;
  const item = list.find(i => i.id === id);
  if (!item) return;

  currentDetailItemId = id;
  currentDetailItemType = type;

  const iconSvg = categoryIconMap[item.category] || ICONS.other;
  const badge = getBadgeInfo(item, type);
  const formattedDate = new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const locDisplay = formatLocation(item.location, item.locationDetail);

  const imgHtml = item.image
    ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">`
    : `<span class="placeholder">${iconSvg}</span>`;

  // Claim Button Logic
  const user = localStorage.getItem('gcet_user');
  let actionHtml = '';
  if (type === 'found' && item.status === 'found') {
    if (user && item.email !== user) {
      actionHtml = `<div class="detail-actions"><button class="btn btn-primary" onclick="openClaimForm()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Claim This Item</button></div>`;
    } else if (!user) {
      actionHtml = `<p style="font-size:12px; color:var(--gray-500); margin-top:var(--space-4);">* Log in to claim this item.</p>`;
    } else if (user && item.email === user) {
      actionHtml = `<p style="font-size:12px; color:var(--success); margin-top:var(--space-4); font-weight:600;">You reported this found item.</p>`;
    }
  }

  // Matches Logic
  const matches = findMatches(item, type);
  let matchesHtml = '';
  if (matches.length > 0) {
    matchesHtml = `
      <div class="matches-section">
        <h4><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 8 4 4-4 4"/></svg> Possible Matches Found</h4>
        <div class="matches-grid">
          ${matches.map(m => `
            <div class="match-card" onclick="openItemDetail(${m.id}, '${type === 'lost' ? 'found' : 'lost'}')">
              <div class="match-card-icon">${categoryIconMap[m.category] || ICONS.other}</div>
              <div class="match-card-info">
                <h5>${escapeHtml(m.name)}</h5>
                <p>${escapeHtml(m.location)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  const contentHtml = `
    <div class="item-detail-content">
      <div class="detail-main">
        <div class="detail-img">${imgHtml}</div>
        <div class="detail-info">
          <div class="detail-info-header">
            <h3>${escapeHtml(item.name)}</h3>
            <span class="item-card-badge ${badge.class}" style="position:relative; top:0; left:0; backdrop-filter:none;">${badge.text}</span>
          </div>
          <span class="detail-category">${escapeHtml(item.category)}</span>
          <div class="detail-meta">
            <span class="detail-meta-item">${ICONS.mapPin} ${locDisplay}</span>
            <span class="detail-meta-item">${ICONS.calendar} Reported on ${formattedDate}</span>
          </div>
          ${item.description ? `<div class="detail-desc">${escapeHtml(item.description)}</div>` : ''}
          ${actionHtml}
        </div>
      </div>
      ${matchesHtml}
    </div>
  `;

  document.getElementById('item-detail-body').innerHTML = contentHtml;
  openModal('item-detail-modal');
}

function openClaimForm() {
  document.getElementById('claim-item-id').value = currentDetailItemId;
  const user = localStorage.getItem('gcet_user');
  if (user) { document.getElementById('claim-email').value = user; }
  closeModal('item-detail-modal');
  openModal('claim-modal');
}

function submitClaim() {
  const itemId = parseInt(document.getElementById('claim-item-id').value);
  const name = document.getElementById('claim-name').value.trim();
  const email = document.getElementById('claim-email').value.trim();
  const desc = document.getElementById('claim-desc').value.trim();

  if (!name || !email || !desc) { showToast('Please fill in all required verification details.'); return; }

  let imageData = null;
  const preview = document.getElementById('claim-image-preview').querySelector('img');
  if (preview && preview.src && !preview.src.endsWith('/')) imageData = preview.src;

  const item = foundItems.find(i => i.id === itemId);
  if (item) {
    item.status = 'claim-pending';
    claims.push({
      id: nextId++,
      itemId: itemId,
      itemName: item.name,
      claimantName: name,
      claimantEmail: email,
      description: desc,
      proofImage: imageData,
      status: 'pending'
    });

    showToast('Claim submitted successfully. Waiting for approval.');
    renderFoundItems(); renderDashboard();
  }

  closeModal('claim-modal');
  document.getElementById('claim-form').reset();
  document.getElementById('claim-image-preview').style.display = 'none';
}

function approveClaim(claimId) {
  const claim = claims.find(c => c.id === claimId);
  if (!claim) return;
  claim.status = 'approved';

  const item = foundItems.find(i => i.id === claim.itemId);
  if (item) { item.status = 'returned'; }

  showToast('Claim approved! Item marked as returned.');
  renderFoundItems(); renderDashboard();
}

function rejectClaim(claimId) {
  const claim = claims.find(c => c.id === claimId);
  if (!claim) return;
  claim.status = 'rejected';

  const item = foundItems.find(i => i.id === claim.itemId);
  if (item) {
    const otherPending = claims.some(c => c.itemId === item.id && c.status === 'pending');
    item.status = otherPending ? 'claim-pending' : 'found';
  }

  showToast('Claim rejected. Item is available again.');
  renderFoundItems(); renderDashboard();
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', function () {
  checkAuth();
  renderLocations();
  renderLostItems();
  renderFoundItems();
  renderFeed();
  renderDashboard();
  initScrollReveal();
  animateCounters();
  startFeedRotation();

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('lost-item-date').value = today;
  document.getElementById('found-item-date').value = today;
});
