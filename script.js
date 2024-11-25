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
    const hiddenProjectsContainer = document.querySelector('.hidden-projects');
    const projectsPerLoad = 3;
    let currentlyShown = 0;
    let isAnimating = false;

    // Initially hide all projects
    projectCards.forEach(card => {
        card.style.display = 'none';
    });

    async function hideProjects() {
        const visibleProjects = projectCards.slice(0, currentlyShown);
        
        // Animate each card out in reverse order
        for (let i = visibleProjects.length - 1; i >= 0; i--) {
            const card = visibleProjects[i];
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Wait for the last animation to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // Hide all cards and reset container
        projectCards.forEach(card => {
            card.style.display = 'none';
            card.style.opacity = '0';
        });
        hiddenProjectsContainer.style.display = 'none';
        
        // Reset states
        currentlyShown = 0;
        loadMoreBtn.querySelector('span').textContent = 'Load More Projects';
        loadMoreBtn.classList.remove('active');
        isAnimating = false;
    }

    async function showProjects() {
        if (currentlyShown === 0) {
            hiddenProjectsContainer.style.display = 'grid';
        }

        const nextProjects = projectCards.slice(currentlyShown, currentlyShown + projectsPerLoad);
        
        // Show and animate each new card
        for (const card of nextProjects) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            await new Promise(resolve => setTimeout(resolve, 100));
            
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }

        currentlyShown += projectsPerLoad;

        if (currentlyShown >= projectCards.length) {
            loadMoreBtn.querySelector('span').textContent = 'Show Less';
            loadMoreBtn.classList.add('active');
        }
        
        isAnimating = false;
    }

    loadMoreBtn.addEventListener('click', async function() {
        if (isAnimating) return;
        isAnimating = true;

        if (loadMoreBtn.classList.contains('active')) {
            await hideProjects();
        } else {
            await showProjects();
        }
    });
}); 