document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project loading functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const projectCards = Array.from(document.querySelectorAll('.hidden-projects .project-card'));
    const projectsPerLoad = 3;
    let currentlyShown = 0;

    // Initially hide all projects
    projectCards.forEach(card => {
        card.style.display = 'none';
    });

    loadMoreBtn.addEventListener('click', function() {
        const nextProjects = projectCards.slice(currentlyShown, currentlyShown + projectsPerLoad);
        
        if (nextProjects.length === 0) {
            // Reset if we've shown all projects
            projectCards.forEach(card => {
                card.style.display = 'none';
                card.style.opacity = '0';
            });
            currentlyShown = 0;
            loadMoreBtn.querySelector('span').textContent = 'Load More Projects';
            loadMoreBtn.classList.remove('active');
            document.querySelector('.hidden-projects').style.display = 'none';
            return;
        }

        // Show the container if this is the first batch
        if (currentlyShown === 0) {
            document.querySelector('.hidden-projects').style.display = 'grid';
        }

        // Show next batch of projects
        nextProjects.forEach((card, index) => {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Trigger animation with delay for each card
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });

        currentlyShown += projectsPerLoad;

        // Update button text and state
        if (currentlyShown >= projectCards.length) {
            loadMoreBtn.querySelector('span').textContent = 'Show Less';
            loadMoreBtn.classList.add('active');
        }
    });
}); 