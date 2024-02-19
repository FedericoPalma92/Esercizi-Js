function toggleButton(selector) {
    const button = document.querySelector(selector);
    if (!button.classList.contains('is-toggle')) {
        turnOffButton();
        button.classList.add('is-toggle');
    } else {
        
        button.classList.remove('is-toggle');
    }
}

function turnOffButton() {
    const button = document.querySelector(".is-toggle");
    if (button)
        button.classList.remove('is-toggle');
}