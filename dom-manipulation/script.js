// Initialize quotes array (load from localStorage if available)
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
  { text: "Success is not in what you have, but who you are.", category: "Success" }
];

// DOM references
const quoteDisplay = document.getElementById('quoteDisplay');
const categoryFilter = document.getElementById('categoryFilter');

// Show a random quote
function showRandomQuote() {
  const selectedCategory = categoryFilter.value;
  let filteredQuotes = quotes;

  if (selectedCategory !== "all") {
    filteredQuotes = quotes.filter(q => q.category === selectedCategory);
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const randomQuote = filteredQuotes[randomIndex];

  quoteDisplay.textContent = randomQuote ? randomQuote.text : "No quotes available in this category.";
}

// Populate unique categories into dropdown
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))]; // uses map()
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option); // uses appendChild()
  });

  // Restore last selected category from localStorage
  const savedCategory = localStorage.getItem('selectedCategory');
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }
}

// Filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem('selectedCategory', selectedCategory);
  showRandomQuote();
}

// Add new quote
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
    alert("Please enter both a quote and category.");
  }
}

// Event listener for showing random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize app
populateCategories();
showRandomQuote();

