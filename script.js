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
    const hiddenProjects = document.querySelector('.hidden-projects');
    let isExpanded = false;

    loadMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            hiddenProjects.style.display = 'grid';
            loadMoreBtn.classList.add('active');
            loadMoreBtn.querySelector('span').textContent = 'Show Less';
            
            // Animate each new project card
            hiddenProjects.querySelectorAll('.project-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
            });
        } else {
            hiddenProjects.style.display = 'none';
            loadMoreBtn.classList.remove('active');
            loadMoreBtn.querySelector('span').textContent = 'Load More Projects';
        }
        isExpanded = !isExpanded;
    });
}); 