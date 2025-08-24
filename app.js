// Loading animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Remove active class from all nav links
        document.querySelectorAll('header nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        this.classList.add('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for navigation highlighting
window.addEventListener('scroll', updateActiveNavigation);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 12px 40px rgba(31, 38, 135, 0.45)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Fetch and load projects as case studies
fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load projects.json: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = ""; // Clear the list
        data.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            const technologies = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p class="project-duration">${project.duration}</p>
                
                <h4>Problem</h4>
                <p>${project.problem}</p>
                
                <h4>Solution</h4>
                <p>${project.solution}</p>
                
                <h4>Outcome</h4>
                <p>${project.outcome}</p>
                
                <div class="project-footer">
                    <div class="technologies">
                        <strong>Technologies:</strong> ${technologies}
                    </div>
                    ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View on GitHub</a>` : ""}
                </div>
            `;
            projectList.appendChild(projectCard);
            
            // Add hover effect for tech tags
            projectCard.querySelectorAll('.tech-tag').forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });
                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = `
            <div class="error-message">
                <p>Sorry, there was an error loading the projects. Please try refreshing the page.</p>
            </div>
        `;
    });

// Fetch and load certificates dynamically
fetch('certificates.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load certificates.json: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const certificateList = document.getElementById('certificate-list');
        certificateList.innerHTML = ""; // Clear the list
        data.forEach((cert, index) => {
            const listItem = document.createElement('li');
            listItem.style.animationDelay = `${index * 0.1}s`;
            listItem.innerHTML = `
                <h3>${cert.title}</h3>
                <p><strong>Issuer:</strong> ${cert.issuer} | <strong>Date:</strong> ${cert.date}</p>
                <p>${cert.description}</p>
            `;
            certificateList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error loading certificates:', error);
        const certificateList = document.getElementById('certificate-list');
        certificateList.innerHTML = `
            <div class="error-message">
                <p>Sorry, there was an error loading the certificates. Please try refreshing the page.</p>
            </div>
        `;
    });

// Dynamically update footer year
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
    
    // Add typing effect to header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const text = headerTitle.textContent;
        headerTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        setTimeout(typeWriter, 1000);
    }
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.body;
    const speed = scrolled * 0.5;
    parallax.style.backgroundPosition = `center ${speed}px`;
});

// Add click effect to project cards
document.addEventListener('click', (e) => {
    if (e.target.closest('.project-card')) {
        const card = e.target.closest('.project-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or return to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
