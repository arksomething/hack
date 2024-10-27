// Function to handle text selection
function logHighlightedText() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        console.log('Selected text:', selectedText);
    }
}

// Add event listener for text selection
document.addEventListener('mouseup', logHighlightedText);

// Log message to confirm it's working
console.log('Text highlight logger is now active. Highlight some text to see it in the console!');


