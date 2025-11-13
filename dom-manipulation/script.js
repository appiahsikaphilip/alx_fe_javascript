cat > script.js << 'EOF'
// Initialize quotes array - will be populated from local storage or default data
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "The only impossible journey is the one you never begin.", category: "Inspiration" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" }
];

// Load quotes from local storage on initialization
function loadQuotes() {
  const savedQuotes = localStorage.getItem('quotes');
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  }
}

// Save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load last viewed quote from session storage
function loadLastViewedQuote() {
  const lastQuote = sessionStorage.getItem('lastViewedQuote');
  if (lastQuote) {
    const quoteData = JSON.parse(lastQuote);
    const sessionInfo = document.getElementById('sessionInfo');
    sessionInfo.textContent = `Last viewed this session: "${quoteData.text}" - ${quoteData.category}`;
  }
}

// Save last viewed quote to session storage
function saveLastViewedQuote(quote) {
  sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
}

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  saveLastViewedQuote(randomQuote);
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  
  const quoteText = document.createElement('div');
  quoteText.className = 'quote-text';
  quoteText.textContent = `"${randomQuote.text}"`;
  
  const quoteCategory = document.createElement('div');
  quoteCategory.className = 'quote-category';
  quoteCategory.textContent = `— Category: ${randomQuote.category}`;
  
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
  
  loadLastViewedQuote();
}

// Function to create and display the add quote form
function createAddQuoteForm() {
  const existingForm = document.getElementById('addQuoteForm');
  if (existingForm) {
    return;
  }
  
  const formDiv = document.createElement('div');
  formDiv.id = 'addQuoteForm';
  formDiv.className = 'add-quote-form';
  
  const heading = document.createElement('h2');
  heading.textContent = 'Add Your Own Quote';
  formDiv.appendChild(heading);
  
  const quoteInput = document.createElement('input');
  quoteInput.type = 'text';
  quoteInput.id = 'newQuoteText';
  quoteInput.placeholder = 'Enter a new quote';
  formDiv.appendChild(quoteInput);
  
  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';
  formDiv.appendChild(categoryInput);
  
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  formDiv.appendChild(addButton);
  
  document.body.appendChild(formDiv);
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
  if (quoteText === '' || quoteCategory === '') {
    alert('Please enter both a quote and a category!');
    return;
  }
  
  const newQuote = {
    text: quoteText,
    category: quoteCategory
  };
  
  quotes.push(newQuote);
  saveQuotes();
  
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';
  
  const quoteTextElement = document.createElement('div');
  quoteTextElement.className = 'quote-text';
  quoteTextElement.textContent = `"${newQuote.text}"`;
  
  const quoteCategoryElement = document.createElement('div');
  quoteCategoryElement.className = 'quote-category';
  quoteCategoryElement.textContent = `— Category: ${newQuote.category}`;
  
  quoteDisplay.appendChild(quoteTextElement);
  quoteDisplay.appendChild(quoteCategoryElement);
  
  saveLastViewedQuote(newQuote);
  loadLastViewedQuote();
  
  alert('Quote added successfully and saved to local storage!');
}

// Function to export quotes to JSON file
function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes, null, 2);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  
  document.body.appendChild(a);
  a.click();
  
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('Quotes exported successfully!');
}

// Function to import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      
      if (!Array.isArray(importedQuotes)) {
        alert('Invalid JSON format. Expected an array of quotes.');
        return;
      }
      
      const isValid = importedQuotes.every(quote => 
        quote.hasOwnProperty('text') && quote.hasOwnProperty('category')
      );
      
      if (!isValid) {
        alert('Invalid quote format. Each quote must have "text" and "category" properties.');
        return;
      }
      
      quotes.push(...importedQuotes);
      saveQuotes();
      
      alert(`${importedQuotes.length} quote(s) imported successfully!`);
      showRandomQuote();
      
    } catch (error) {
      alert('Error parsing JSON file: ' + error.message);
    }
  };
  
  fileReader.onerror = function() {
    alert('Error reading file!');
  };
  
  fileReader.readAsText(event.target.files[0]);
}

// Function to load test quotes (for easy testing in sandbox)
function loadTestQuotes() {
  const testQuotes = [
    { text: "Code is like humor. When you have to explain it, it's bad.", category: "Programming" },
    { text: "First, solve the problem. Then, write the code.", category: "Programming" },
    { text: "The best error message is the one that never shows up.", category: "Development" },
    { text: "Talk is cheap. Show me the code.", category: "Programming" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", category: "Development" }
  ];
  
  quotes.push(...testQuotes);
  saveQuotes();
  alert(`${testQuotes.length} test quotes loaded successfully!`);
  showRandomQuote();
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initialize the application on page load
window.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  showRandomQuote();
  loadLastViewedQuote();
  createAddQuoteForm();
});
EOF
