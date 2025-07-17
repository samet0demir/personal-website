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
        data.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
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
        });
    })
    .catch(error => console.error('Error loading projects:', error));

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
        data.forEach(cert => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${cert.title}</h3>
                <p><strong>Issuer:</strong> ${cert.issuer} | <strong>Date:</strong> ${cert.date}</p>
                <p>${cert.description}</p>
            `;
            certificateList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error loading certificates:', error));

// Dynamically update footer year
document.addEventListener('DOMContentLoaded', () => {
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
