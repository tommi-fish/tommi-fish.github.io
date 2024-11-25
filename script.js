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

    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.getElementById('home').appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    const codeSnippets = [
        // JavaScript/TypeScript
        'const [state, setState] = useState();',
        'export interface Props {',
        'async function fetchData() {',
        'useEffect(() => {}, []);',
        'npm install @types/react',
        
        // React/Next.js
        'import { NextPage } from "next";',
        '<Component {...pageProps} />',
        'getStaticProps({ params })',
        'return <Layout>...</Layout>',
        
        // Node.js
        'app.listen(PORT, () => {',
        'const express = require("express");',
        'mongoose.connect(process.env.DB_URL);',
        
        // Go
        'func main() {',
        'package main',
        'type Interface interface {',
        'if err != nil {',
        'go func() { ... }()',
        'fmt.Println("Hello")',
        'make(chan bool)',
        
        // SQL
        'SELECT * FROM users WHERE',
        'JOIN orders ON users.id =',
        'GROUP BY category HAVING',
        'CREATE TABLE users (',
        'INSERT INTO products',
        
        // Python
        'def __init__(self, data):',
        'if __name__ == "__main__":',
        'with open("file.txt") as f:',
        'except Exception as e:',
        
        // Docker/DevOps
        'docker-compose up -d',
        'kubectl get pods',
        'nginx.conf',
        'FROM node:alpine',
        'COPY . /app',
        
        // Git
        'git checkout -b feature/',
        'git rebase main',
        'git push origin',
        
        // Shell
        'chmod +x script.sh',
        'ssh-keygen -t rsa',
        'curl -X POST http://',
        
        // Testing
        'describe("test suite", () => {',
        'expect(result).toBe(true);',
        'test("should return", () => {',
        
        // HTML/CSS
        '@media (max-width: 768px) {',
        'display: flex;',
        'grid-template-columns:',
        
        // Database
        'db.collection.find({',
        'redis-cli SET key value',
        'CASCADE ON DELETE',
    ];

    const background = document.createElement('div');
    background.className = 'code-background';
    document.getElementById('home').appendChild(background);

    function createCodeLine() {
        const line = document.createElement('div');
        line.className = 'code-line';
        line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        line.style.left = Math.random() * 100 + '%';
        line.style.animationDelay = Math.random() * 5 + 's';
        background.appendChild(line);

        // Remove the element after animation completes
        setTimeout(() => {
            line.remove();
        }, 15000);
    }

    // Create more initial lines
    for (let i = 0; i < 25; i++) { // Increased from 15 to 25
        setTimeout(createCodeLine, Math.random() * 5000);
    }

    // Create new lines more frequently
    setInterval(createCodeLine, 900); // Decreased from 2000 to 1500
}); 