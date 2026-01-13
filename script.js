// --- 1. AESTHETIC CURSOR LOGIC ---
const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    // Smoothly follows the mouse coordinates
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// --- 2. CONFIGURATION & SELECTORS ---
const textElement = document.getElementById('typewriter');
const inputArea = document.getElementById('input-area');
const heroSection = document.getElementById('hero');
const userInput = document.getElementById('user-input');
const displayName = document.getElementById('display-name');
const resultCard = document.getElementById('card');

const phrase = "BADS";
const typingSpeed = 150;      // Speed of letter appearance
const waitBeforeFade = 3500;   // How long "BADS" stays visible (3.5s)
const fadeOutDuration = 1000;  // How long the fade-out takes

let charIndex = 0;

/**
 * 3. STYLISH ENTRANCE & TYPEWRITER
 * Triggers the CSS blur/spacing transition and types the letters
 */
function startSequence() {
    // Add 'reveal' class to trigger the CSS transition (blur out, spacing in)
    textElement.classList.add('reveal');

    if (charIndex < phrase.length) {
        textElement.textContent += phrase.charAt(charIndex);
        charIndex++;
        setTimeout(startSequence, typingSpeed);
    } else {
        // Wait for the user to admire the title, then swap to input
        setTimeout(switchToInput, waitBeforeFade);
    }
}

/**
 * 4. THE SWAP
 * Fades out the title and reveals the bold user input field
 */
function switchToInput() {
    textElement.classList.add('fade-out');

    setTimeout(() => {
        textElement.style.display = 'none'; // Clear the space
        inputArea.classList.add('fade-in'); // Show the input field
        userInput.focus();                  // Auto-focus cursor for the user
    }, fadeOutDuration);
}

/**
 * 5. INTERACTION TRIGGER
 * Handles the slide-up transition when Enter is pressed
 */
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && userInput.value.trim() !== "") {
        const inputVal = userInput.value.trim();
        
        // Trigger the luxury upward slide
        heroSection.classList.add('slide-up');
        
        // Update the name in the result section
        if (displayName) {
            displayName.textContent = inputVal;
        }
        
        // Reveal the glass result card after a short delay
        setTimeout(() => {
            if (resultCard) {
                resultCard.classList.add('show');
            }
        }, 800);

        // --- DEV NOTE: PLACE YOUR AI FETCH LOGIC HERE ---
        console.log("BADS received input:", inputVal);
    }
});

// Start the sequence when the window finishes loading
window.onload = startSequence;