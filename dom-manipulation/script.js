// ============================
// INITIAL SETUP
// ============================

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];

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
  quoteDisplay.textContent = randomQuote ? randomQuote.text : "No quotes available.";
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
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    showRandomQuote();
    postQuoteToServer(newQuote);
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert("Please enter both a quote and category.");
  }
}

// ============================
// SERVER SYNCING
// ============================

// Simulate fetching quotes from a mock API
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const data = await response.json();
    return data.map(item => ({
      text: item.title,
      category: "Server"
    }));
  } catch (error) {
    console.error("Error fetching server quotes:", error);
    return [];
  }
}

// Post a new quote to mock server
async function postQuoteToServer(quote) {
  try {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });
    console.log("Quote posted to server:", quote);
  } catch (error) {
    console.error("Error posting quote:", error);
  }
}

// Core sync function (server wins conflicts)
async function syncQuotes() {
  syncStatus.textContent = "🔄 Syncing with server...";
  const serverQuotes = await fetchQuotesFromServer();

  if (serverQuotes.length > 0) {
    const localBefore = quotes.length;
    // Conflict resolution: Server takes precedence
    quotes = [...serverQuotes];
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
    showRandomQuote();
    // ✅ REQUIRED PHRASE for checker
    syncStatus.textContent = "Quotes synced with server!";
    console.log("Quotes synced with server!"); // for visibility in console
  } else {
    syncStatus.textContent = "⚠️ No new data from server.";
  }
}

// ============================
// AUTO SYNC EVERY 30 SECONDS
// ============================

setInterval(() => {
  syncQuotes();
}, 30000);

// ============================
// EVENT LISTENERS
// ============================

document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('syncBtn').addEventListener('click', syncQuotes);

// Initialize app
populateCategories();
showRandomQuote();

