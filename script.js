// Mood-Based Quote Data
const quotes = {
    happy: [
        { text: "The most important thing is to enjoy your life—to be happy—it's all that matters.", author: "Audrey Hepburn" },
        { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" }
    ],
    sad: [
        { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine" },
        { text: "Tears come from the heart and not from the brain.", author: "Leonardo da Vinci" },
        { text: "Every man has his secret sorrows which the world knows not.", author: "Henry Wadsworth Longfellow" },
        { text: "Don't cry because it's over, smile because it happened.", author: "Dr. Seuss" },
        { text: "Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.", author: "Christopher Morley" }
    ],
    motivated: [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" }
    ],
    calm: [
        { text: "Calmness is the cradle of power.", author: "Josiah Gilbert Holland" },
        { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
        { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
        { text: "Breath is the bridge which connects life to consciousness.", author: "Thich Nhat Hanh" },
        { text: "Silence is a source of great strength.", author: "Lao Tzu" }
    ],
    angry: [
        { text: "For every minute you are angry you lose sixty seconds of happiness.", author: "Ralph Waldo Emerson" },
        { text: "Anger is an acid that can do more harm to the vessel in which it is stored than to anything on which it is poured.", author: "Mark Twain" },
        { text: "When anger rises, think of the consequences.", author: "Confucius" },
        { text: "He who angers you conquers you.", author: "Elizabeth Kenny" },
        { text: "Speak when you are angry and you will make the best speech you will ever regret.", author: "Ambrose Bierce" }
    ],
    love: [
        { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
        { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
        { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
        { text: "Love recognizes no barriers.", author: "Maya Angelou" },
        { text: "There is always some madness in love. But there is also always some reason in madness.", author: "Friedrich Nietzsche" }
    ],
    stressed: [
        { text: "It's not stress that kills us, it is our reaction to it.", author: "Hans Selye" },
        { text: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day costs my reality.", author: "John Lubbock" },
        { text: "Breathe. It's just a bad day, not a bad life.", author: "Unknown" },
        { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James" },
        { text: "Give your stress wings and let it fly away.", author: "Terri Guillemets" }
    ]
};

// DOM Elements
const moodCards = document.querySelectorAll('.mood-card');
const heroSection = document.querySelector('.hero-section');
const quoteSection = document.querySelector('.quote-section');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const twitterBtn = document.getElementById('twitter-btn');
const root = document.documentElement;

// State
let currentMood = null;

// Mood Colors/Gradients (Sync with CSS)
const gradients = {
    happy: 'var(--gradient-happy)',
    sad: 'var(--gradient-sad)',
    motivated: 'var(--gradient-motivated)',
    calm: 'var(--gradient-calm)',
    angry: 'var(--gradient-angry)',
    love: 'var(--gradient-love)',
    stressed: 'var(--gradient-stressed)'
};

const buttonColors = {
    happy: '#fda085',
    sad: '#a18cd1',
    motivated: '#84fab0',
    calm: '#8ec5fc',
    angry: '#ff9a9e',
    love: '#ff758c',
    stressed: '#4facfe'
};

// Event Listeners
moodCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedMood = card.getAttribute('data-mood');
        setMood(selectedMood);
        scrollToQuotes();
    });
});

newQuoteBtn.addEventListener('click', () => {
    if (currentMood) {
        displayQuote(currentMood);
    }
});

twitterBtn.addEventListener('click', tweetQuote);

// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMenu = document.querySelector('.close-menu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
});

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Functions
function setMood(mood) {
    currentMood = mood;
    
    // Update Active Card
    moodCards.forEach(card => card.classList.remove('active'));
    document.querySelector(`.mood-card[data-mood="${mood}"]`).classList.add('active');
    
    // Update Theme
    root.style.setProperty('--current-gradient', gradients[mood]);
    root.style.setProperty('--primary-color', buttonColors[mood]);
    
    // Update Buttons
    newQuoteBtn.disabled = false;
    twitterBtn.disabled = false;
    
    // Generate First Quote for this Mood
    displayQuote(mood);
}

function displayQuote(mood) {
    const moodQuotes = quotes[mood];
    const randomQuote = moodQuotes[Math.floor(Math.random() * moodQuotes.length)];
    
    // Animation
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    
    setTimeout(() => {
        quoteText.textContent = `"${randomQuote.text}"`;
        quoteAuthor.textContent = `- ${randomQuote.author}`;
        
        quoteText.style.opacity = 1;
        quoteAuthor.style.opacity = 1;
        
        // Add fade-in animation class
        quoteText.classList.remove('fade-in');
        void quoteText.offsetWidth; // Trigger reflow
        quoteText.classList.add('fade-in');
    }, 500);
}

function scrollToQuotes() {
    quoteSection.scrollIntoView({ behavior: 'smooth' });
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + ' ' + author)}`;
    window.open(twitterUrl, '_blank');
}

// Initial Animation Check
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
});

document.querySelectorAll('.mood-card').forEach(card => observer.observe(card));
