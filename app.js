// Language management
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'tr';
    const languageToggle = document.getElementById('language-toggle');

    // Apply saved language
    switchLanguage(savedLanguage);
    updateLanguageIcon(savedLanguage);

    // Language toggle event listener
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const currentLanguage = document.documentElement.getAttribute('lang');
            const newLanguage = currentLanguage === 'tr' ? 'en' : 'tr';

            switchLanguage(newLanguage);
            localStorage.setItem('language', newLanguage);
            updateLanguageIcon(newLanguage);
        });
    }
}

function switchLanguage(language) {
    document.documentElement.setAttribute('lang', language);
    currentLanguage = language;

    // Update all elements with data attributes
    document.querySelectorAll('[data-tr][data-en]').forEach(element => {
        const newText = element.getAttribute(`data-${language}`);
        if (newText) {
            // Handle HTML content in contact section
            if (element.innerHTML.includes('<a')) {
                element.innerHTML = newText;
            } else {
                element.textContent = newText;
            }
        }
    });

    // Update dynamic content
    loadProjects(language);
    loadCertificates(language);

    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const title = document.querySelector('title');

    if (language === 'tr') {
        if (metaDescription) metaDescription.setAttribute('content', 'Samet Demir - Yapay Zeka Uzmanı, Veri Bilimci ve Problem Çözücü. Yenilikçi yapay zeka ve veri bilimi projelerimi sergileyen portföyümü keşfedin.');
        if (ogTitle) ogTitle.setAttribute('content', 'Samet Demir | Yapay Zeka & Veri Bilimi Portföyü');
        if (ogDescription) ogDescription.setAttribute('content', 'Yapay Zeka Uzmanı, Veri Bilimci ve Problem Çözücü');
        if (title) title.textContent = 'Samet Demir | Yapay Zeka & Veri Bilimi Portföyü';
    } else {
        if (metaDescription) metaDescription.setAttribute('content', 'Samet Demir - AI Enthusiast, Data Scientist, and Problem Solver. Explore my portfolio showcasing innovative AI and data science projects.');
        if (ogTitle) ogTitle.setAttribute('content', 'Samet Demir | AI & Data Science Portfolio');
        if (ogDescription) ogDescription.setAttribute('content', 'AI Enthusiast, Data Scientist, and Problem Solver');
        if (title) title.textContent = 'Samet Demir | AI & Data Science Portfolio';
    }
}

function updateLanguageIcon(language) {
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.textContent = language === 'tr' ? '🇺🇸' : '🇹🇷';
        languageToggle.setAttribute('aria-label',
            language === 'tr' ? 'Switch to English' : 'Switch to Turkish'
        );
    }
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeToggle = document.getElementById('theme-toggle');

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }
}

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

// Smooth scrolling for navigation links with header offset
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
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20; // 20px extra padding

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Account for header height in active section detection
        if (window.scrollY >= (sectionTop - headerHeight - 50)) {
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
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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

// Global variables for dynamic content
let projectsData = null;
let certificatesData = null;
let currentLanguage = 'tr';

// Fetch and load projects as case studies
function loadProjects(language = 'tr') {
    if (!projectsData) return;

    const projectList = document.getElementById('project-list');
    projectList.innerHTML = "";

    projectsData.projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;

        const technologies = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

        const title = typeof project.title === 'object' ? project.title[language] : project.title;
        const problem = typeof project.problem === 'object' ? project.problem[language] : project.problem;
        const solution = typeof project.solution === 'object' ? project.solution[language] : project.solution;
        const outcome = typeof project.outcome === 'object' ? project.outcome[language] : project.outcome;

        projectCard.innerHTML = `
            <h3>${title}</h3>
            <p class="project-duration">${project.duration}</p>

            <h4 data-tr="Problem" data-en="Problem">${language === 'tr' ? 'Problem' : 'Problem'}</h4>
            <p>${problem}</p>

            <h4 data-tr="Çözüm" data-en="Solution">${language === 'tr' ? 'Çözüm' : 'Solution'}</h4>
            <p>${solution}</p>

            <h4 data-tr="Sonuç" data-en="Outcome">${language === 'tr' ? 'Sonuç' : 'Outcome'}</h4>
            <p>${outcome}</p>

            <div class="project-footer">
                <div class="technologies">
                    <strong data-tr="Teknolojiler:" data-en="Technologies:">${language === 'tr' ? 'Teknolojiler:' : 'Technologies:'}</strong> ${technologies}
                </div>
                ${project.link && project.link !== "-" ? `<a href="${project.link}" target="_blank" class="project-link" data-tr="GitHub'da Görüntüle" data-en="View on GitHub">${language === 'tr' ? 'GitHub\'da Görüntüle' : 'View on GitHub'}</a>` : ""}
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
}

fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load projects.json: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        projectsData = data;
        loadProjects(currentLanguage);
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

// Load certificates function
function loadCertificates(language = 'tr') {
    if (!certificatesData) return;

    const certificateList = document.getElementById('certificate-list');
    certificateList.innerHTML = "";

    certificatesData.forEach((cert, index) => {
        const listItem = document.createElement('li');
        listItem.style.animationDelay = `${index * 0.1}s`;

        const title = typeof cert.title === 'object' ? cert.title[language] : cert.title;
        const description = typeof cert.description === 'object' ? cert.description[language] : cert.description;

        listItem.innerHTML = `
            <h3>${title}</h3>
            <p><strong data-tr="Kurum:" data-en="Issuer:">${language === 'tr' ? 'Kurum:' : 'Issuer:'}</strong> ${cert.issuer} | <strong data-tr="Tarih:" data-en="Date:">${language === 'tr' ? 'Tarih:' : 'Date:'}</strong> ${cert.date}</p>
            <p>${description}</p>
        `;
        certificateList.appendChild(listItem);
    });
}

// Fetch and load certificates dynamically
fetch('certificates.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load certificates.json: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        certificatesData = data;
        loadCertificates(currentLanguage);
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
    // Initialize language and theme
    initializeLanguage();
    initializeTheme();

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
