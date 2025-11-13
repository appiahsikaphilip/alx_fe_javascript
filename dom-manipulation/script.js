// Array of quote objects with text and category properties
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" },
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "The only impossible journey is the one you never begin.", category: "Inspiration" },
  { text: "In the middle of difficulty lies opportunity.", category: "Wisdom" }
];

// Function to display a random quote
function showRandomQuote() {
  // Select a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  // Get the quote display element
  const quoteDisplay = document.getElementById('quoteDisplay');
  
  // Clear previous content
  quoteDisplay.innerHTML = '';
  
  // Create elements for quote text and category
  const quoteText = document.createElement('div');
  quoteText.className = 'quote-text';
  quoteText.textContent = `"${randomQuote.text}"`;
  
  const quoteCategory = document.createElement('div');
  quoteCategory.className = 'quote-category';
  quoteCategory.textContent = `— Category: ${randomQuote.category}`;
  
  // Append elements to the display
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

// Function to create and display the add quote form
function createAddQuoteForm() {
  // Check if form already exists
  const existingForm = document.getElementById('addQuoteForm');
  if (existingForm) {
    return; // Form already exists, don't create another
  }
  
  // Create form container
  const formDiv = document.createElement('div');
  formDiv.id = 'addQuoteForm';
  formDiv.className = 'add-quote-form';
  
  // Create heading
  const heading = document.createElement('h2');
  heading.textContent = 'Add Your Own Quote';
  formDiv.appendChild(heading);
  
  // Create input for quote text
  const quoteInput = document.createElement('input');
  quoteInput.type = 'text';
  quoteInput.id = 'newQuoteText';
  quoteInput.placeholder = 'Enter a new quote';
  formDiv.appendChild(quoteInput);
  
  // Create input for category
  const categoryInput = document.createElement('input');
  categoryInput.type = 'text';
  categoryInput.id = 'newQuoteCategory';
  categoryInput.placeholder = 'Enter quote category';
  formDiv.appendChild(categoryInput);
  
  // Create add button
  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.onclick = addQuote;
  formDiv.appendChild(addButton);
  
  // Append form to body
  document.body.appendChild(formDiv);
}

// Function to add a new quote to the array and update the DOM
function addQuote() {
  // Get input values
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
  // Validate inputs
  if (quoteText === '' || quoteCategory === '') {
    alert('Please enter both a quote and a category!');
    return;
  }
  
  // Create new quote object
  const newQuote = {
    text: quoteText,
    category: quoteCategory
  };
  
  // Add to quotes array
  quotes.push(newQuote);
  
  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
  
  // Display the newly added quote
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
  
  // Show success message
  alert('Quote added successfully!');
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Display a random quote on page load
window.addEventListener('DOMContentLoaded', () => {
  showRandomQuote();
  createAddQuoteForm();
});
