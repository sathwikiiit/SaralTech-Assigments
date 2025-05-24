document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const greetButton = document.getElementById('greetButton');
    const greetingMessage = document.getElementById('greetingMessage');
    const errorMessage = document.getElementById('errorMessage');

    greetButton.addEventListener('click', () => {
        const userName = nameInput.value.trim();

        greetingMessage.classList.remove('show');
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';

        if (userName === '') {
            errorMessage.textContent = 'Oops! Please enter your name to get a greeting.';
            errorMessage.classList.add('show');
            greetingMessage.textContent = '';
        } else {
            greetingMessage.textContent = `Hello, ${userName}! Welcome aboard.`;
            // Force reflow to restart animation on repeated clicks
            void greetingMessage.offsetWidth;
            greetingMessage.classList.add('show');
        }
    });
});
