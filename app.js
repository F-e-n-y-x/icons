// Mock data - In a real implementation, this would be loaded from data/icons.json or GitHub API
const mockIconsData = [
  {
    name: "home",
    category: "ui",
    path: "icons/ui/home.svg"
  },
  {
    name: "user",
    category: "ui", 
    path: "icons/ui/user.svg"
  },
  {
    name: "settings",
    category: "ui",
    path: "icons/ui/settings.svg"
  },
  {
    name: "heart",
    category: "social",
    path: "icons/social/heart.svg"
  },
  {
    name: "share",
    category: "social", 
    path: "icons/social/share.svg"
  },
  {
    name: "message",
    category: "communication",
    path: "icons/communication/message.svg"
  },
  {
    name: "mail",
    category: "communication",
    path: "icons/communication/mail.svg"
  },
  {
    name: "phone",
    category: "communication",
    path: "icons/communication/phone.svg"
  },
  {
    name: "folder",
    category: "files",
    path: "icons/files/folder.svg"
  },
  {
    name: "document",
    category: "files",
    path: "icons/files/document.svg"
  }
];

// Application state
let allIcons = [];
let filteredIcons = [];
let currentIcon = null;

// DOM elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const iconsGrid = document.getElementById('iconsGrid');
const noResults = document.getElementById('noResults');
const modal = document.getElementById('iconModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const iconPreview = document.getElementById('iconPreview');
const copyUrlBtn = document.getElementById('copyUrl');
const copyHtmlBtn = document.getElementById('copyHtml');
const downloadBtn = document.getElementById('downloadIcon');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const totalIconsEl = document.getElementById('totalIcons');
const totalCategoriesEl = document.getElementById('totalCategories');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  loadIcons();
  initializeEventListeners();
  initializeTheme();
});

// Load icons data
function loadIcons() {
  // In a real implementation, this would fetch from data/icons.json or GitHub API
  allIcons = [...mockIconsData];
  filteredIcons = [...allIcons];
  
  updateStats();
  populateCategories();
  renderIcons();
}

// Update statistics
function updateStats() {
  const categories = [...new Set(allIcons.map(icon => icon.category))];
  totalIconsEl.textContent = allIcons.length;
  totalCategoriesEl.textContent = categories.length;
}

// Populate category filter
function populateCategories() {
  const categories = [...new Set(allIcons.map(icon => icon.category))];
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    categoryFilter.appendChild(option);
  });
}

// Render icons grid
function renderIcons() {
  if (filteredIcons.length === 0) {
    iconsGrid.classList.add('hidden');
    noResults.classList.remove('hidden');
    return;
  }
  
  iconsGrid.classList.remove('hidden');
  noResults.classList.add('hidden');
  
  iconsGrid.innerHTML = '';
  
  filteredIcons.forEach(icon => {
    const card = createIconCard(icon);
    iconsGrid.appendChild(card);
  });
}

// Create icon card element
function createIconCard(icon) {
  const card = document.createElement('div');
  card.className = 'icon-card';
  card.addEventListener('click', () => openModal(icon));
  
  card.innerHTML = `
    <div class="icon-card__preview">
      ${generateSVG(icon.name)}
    </div>
    <div class="icon-card__name">${icon.name}</div>
    <div class="icon-card__category">${icon.category}</div>
  `;
  
  return card;
}

// Generate placeholder SVG for demo purposes
function generateSVG(iconName, size = 24) {
  const svgMap = {
    home: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l8 8v10h-5v-6H9v6H4V11l8-8z"/></svg>`,
    user: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    settings: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98L21.54 14.63C21.73 14.78 21.78 15.05 21.69 15.27L19.69 18.73C19.6 18.95 19.33 19.03 19.11 18.95L16.69 17.95C16.03 18.35 15.31 18.68 14.55 18.92L14.22 21.4C14.18 21.63 13.98 21.8 13.75 21.8H9.75C9.52 21.8 9.32 21.63 9.28 21.4L8.95 18.92C8.19 18.68 7.47 18.35 6.81 17.95L4.39 18.95C4.17 19.03 3.9 18.95 3.81 18.73L1.81 15.27C1.72 15.05 1.77 14.78 1.96 14.63L4.07 12.98L3.98 12L4.07 11.02L1.96 9.37C1.77 9.22 1.72 8.95 1.81 8.73L3.81 5.27C3.9 5.05 4.17 4.97 4.39 5.05L6.81 6.05C7.47 5.65 8.19 5.32 8.95 5.08L9.28 2.6C9.32 2.37 9.52 2.2 9.75 2.2H13.75C13.98 2.2 14.18 2.37 14.22 2.6L14.55 5.08C15.31 5.32 16.03 5.65 16.69 6.05L19.11 5.05C19.33 4.97 19.6 5.05 19.69 5.27L21.69 8.73C21.78 8.95 21.73 9.22 21.54 9.37L19.43 11.02L19.52 12L19.43 12.98Z"/></svg>`,
    heart: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    share: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>`,
    message: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`,
    mail: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    phone: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
    folder: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>`,
    document: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>`
  };
  
  return svgMap[iconName] || `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><rect width="20" height="20" x="2" y="2" rx="2"/></svg>`;
}

// Search functionality
function searchIcons(query) {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) {
    filteredIcons = [...allIcons];
  } else {
    filteredIcons = allIcons.filter(icon =>
      icon.name.toLowerCase().includes(searchTerm) ||
      icon.category.toLowerCase().includes(searchTerm)
    );
  }
  
  // Apply category filter if active
  const selectedCategory = categoryFilter.value;
  if (selectedCategory) {
    filteredIcons = filteredIcons.filter(icon => icon.category === selectedCategory);
  }
  
  renderIcons();
}

// Filter by category
function filterByCategory(category) {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (!category) {
    filteredIcons = [...allIcons];
  } else {
    filteredIcons = allIcons.filter(icon => icon.category === category);
  }
  
  // Apply search filter if active
  if (searchTerm) {
    filteredIcons = filteredIcons.filter(icon =>
      icon.name.toLowerCase().includes(searchTerm) ||
      icon.category.toLowerCase().includes(searchTerm)
    );
  }
  
  renderIcons();
}

// Open modal
function openModal(icon) {
  currentIcon = icon;
  modalTitle.textContent = icon.name;
  modalCategory.textContent = icon.category;
  updateModalContent();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
  currentIcon = null;
}

// Update modal content with current icon
function updateModalContent() {
  if (!currentIcon) return;
  
  const activeSize = document.querySelector('.size-btn--active');
  const size = activeSize ? parseInt(activeSize.dataset.size) : 24;
  
  iconPreview.innerHTML = generateSVG(currentIcon.name, size);
}

// Copy URL to clipboard
function copyUrl() {
  if (!currentIcon) return;
  
  const url = `${window.location.origin}/${currentIcon.path}`;
  navigator.clipboard.writeText(url).then(() => {
    showToast('URL copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy URL', 'error');
  });
}

// Copy HTML code to clipboard
function copyHtml() {
  if (!currentIcon) return;
  
  const activeSize = document.querySelector('.size-btn--active');
  const size = activeSize ? parseInt(activeSize.dataset.size) : 24;
  const svgCode = generateSVG(currentIcon.name, size);
  
  navigator.clipboard.writeText(svgCode).then(() => {
    showToast('HTML code copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy HTML code', 'error');
  });
}

// Download icon as SVG
function downloadIcon() {
  if (!currentIcon) return;
  
  const activeSize = document.querySelector('.size-btn--active');
  const size = activeSize ? parseInt(activeSize.dataset.size) : 24;
  const svgCode = generateSVG(currentIcon.name, size);
  
  const blob = new Blob([svgCode], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${currentIcon.name}-${size}px.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast('Icon downloaded!');
}

// Show toast notification
function showToast(message, type = 'success') {
  toastMessage.textContent = message;
  toast.classList.remove('hidden');
  
  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 250);
  }, 3000);
}

// Theme management
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-color-scheme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun theme-icon';
  } else {
    themeIcon.className = 'fas fa-moon theme-icon';
  }
}

// Initialize event listeners
function initializeEventListeners() {
  // Search input
  searchInput.addEventListener('input', (e) => {
    searchIcons(e.target.value);
  });
  
  // Category filter
  categoryFilter.addEventListener('change', (e) => {
    filterByCategory(e.target.value);
  });
  
  // Modal events
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Modal action buttons
  copyUrlBtn.addEventListener('click', copyUrl);
  copyHtmlBtn.addEventListener('click', copyHtml);
  downloadBtn.addEventListener('click', downloadIcon);
  
  // Size buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('size-btn')) {
      // Remove active class from all size buttons
      document.querySelectorAll('.size-btn').forEach(btn => {
        btn.classList.remove('size-btn--active');
      });
      
      // Add active class to clicked button
      e.target.classList.add('size-btn--active');
      
      // Update modal content with new size
      updateModalContent();
    }
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // Keyboard events
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
  
  // Focus search input with '/' key
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}