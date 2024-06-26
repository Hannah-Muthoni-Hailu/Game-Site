function redirectToProject(url) {
    window.location.href = url;
}

function searchSkills() {
    let input = document.getElementById('search-input').value.toLowerCase();
    let cards = document.getElementsByClassName('project-card');
    let noResultsMessage = document.getElementById('no-results-message');
    let portfolioContainer = document.getElementById('portfolio-container');
    let found = false;

    for (let i = 0; i < cards.length; i++) {
        let skills = cards[i].getAttribute('data-skills').toLowerCase();
        if (skills.includes(input)) {
            cards[i].style.display = 'block';
            found = true;
        } else {
            cards[i].style.display = 'none';
        }
    }

    if (!found) {
        noResultsMessage.style.display = 'block';
        portfolioContainer.style.display = 'none';
    } else {
        noResultsMessage.style.display = 'none';
        portfolioContainer.style.display = 'flex';
    }
}

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;

    // Delay hiding the loading screen to allow animation to complete and additional visual effect
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        document.querySelector('.content').style.display = 'block';
        body.style.overflow = 'auto';
    }, 6000);

    // Add loaded class to body
    body.classList.add('loaded');
});

