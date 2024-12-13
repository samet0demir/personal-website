// Fetch and load projects dynamically
fetch('projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load projects.json: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const projectList = document.getElementById('project-list');
        projectList.innerHTML = ""; // Listeyi temizle
        data.forEach(project => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p><strong>Duration:</strong> ${project.duration}</p>
                ${project.link ? `<a href="${project.link}" target="_blank">View Project</a>` : ""}
            `;
            projectList.appendChild(listItem);
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
        certificateList.innerHTML = ""; // Listeyi temizle
        data.forEach(cert => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${cert.title}</h3>
                <p>Issued by: ${cert.issuer}</p>
                <p>Date: ${cert.date}</p>
                <p>Description: ${cert.description}</p>
            `;
            certificateList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error loading certificates:', error));
