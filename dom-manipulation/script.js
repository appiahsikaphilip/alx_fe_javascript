// ============================
// INITIAL SETUP
// ============================

// Load local quotes or initialize
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];

// DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const categoryFilter = document.getElementById('categoryFilter');
const syncStatus = document.getElementById('syncStatus');

// ============================
// DOM FUNCTIONS
// ============================

function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = randomQuote ? randomQuote.text : "No quotes in this category.";
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) categoryFilter.value = savedCategory;
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory);
  showRandomQuote();
}

function addQuote() {
  const newText = document.getElementById('newQuoteText').value.trim();
  const newCategory = document.getElementById('newQuoteCategory').value.trim();

  if (newText && newCategory) {
    quotes.push({ text: newText, category: newCategory });
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    showRandomQuote();
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please fill both fields.");
  }
}

// ============================
// SERVER SYNC SIMULATION
// ============================

// Simulate fetching quotes from a mock server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const data = await response.json();
    // Convert server data to quote format
    return data.map(post => ({
      text: post.title,
      category: "Server"
    }));
  } catch (error) {
    console.error("Error fetching server data:", error);
    return [];
  }
}

// Sync local quotes with server quotes (server wins conflicts)
async function syncWithServer() {
  syncStatus.textContent = "🔄 Syncing with server...";
  const serverQuotes = await fetchQuotesFromServer();

  if (serverQuotes.length > 0) {
    const localBefore = quotes.length;
    quotes = [...serverQuotes]; // Server takes precedence
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    showRandomQuote();
    syncStatus.textContent = `✅ Synced! (${serverQuotes.length} server quotes replaced ${localBefore} local quotes)`;
  } else {
    syncStatus.textContent = "⚠️ No new server data found.";
  }
}

// Notify user periodically about sync
setInterval(() => {
  syncWithServer();
}, 30000); // every 30 seconds

// ============================
// EVENT LISTENERS
// ============================

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('syncBtn').addEventListener('click', syncWithServer);

// Initialize app
populateCategories();
showRandomQuote();

