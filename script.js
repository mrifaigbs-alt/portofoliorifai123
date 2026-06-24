document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mengambil semua data dari 4 file JSON sekaligus
    async function loadData() {
        try {
            const [profileRes, eduRes, expRes, projRes] = await Promise.all([
                fetch('data/profile.json'),
                fetch('data/education.json'),
                fetch('data/experience.json'),
                fetch('data/projects.json')
            ]);

            const profile = await profileRes.json();
            const education = await eduRes.json();
            const experience = await expRes.json();
            const projects = await projRes.json();

            renderProfile(profile);
            renderEducation(education);
            renderExperience(experience);
            renderProjects(projects);
            
        } catch (error) {
            console.error("Gagal memuat data JSON. Pastikan folder 'data' sudah benar!", error);
        }
    }

    // 2. Menyuntikkan data Profil & Keahlian
    function renderProfile(data) {
        document.getElementById("profile-name").textContent = data.name;
        document.getElementById("profile-description").textContent = data.description;
        document.getElementById("profile-pic").src = data.profileImage;
        document.getElementById("profile-email").textContent = data.email;
        document.getElementById("profile-phone").textContent = data.phone;
        document.getElementById("profile-location").textContent = data.location;

        const skillsGrid = document.getElementById("skills-grid");
        if (skillsGrid && data.skills) {
            skillsGrid.innerHTML = data.skills.map(skill => 
                `<div class="skill-tag"><i class="${skill.icon}"></i> ${skill.name}</div>`
            ).join('');
        }
    }

    // 3. Menyuntikkan data Pendidikan
    function renderEducation(data) {
        const eduList = document.getElementById("education-list");
        if (!eduList) return;
        
        eduList.innerHTML = data.map(item => `
            <div class="education-item">
                <h3><i class="fas fa-university" style="color: #00f2fe; margin-right: 10px;"></i>${item.university}</h3>
                <p><strong>${item.major}</strong></p>
                <span class="date-tag">${item.year}</span>
                <p style="margin-top: 10px; color: #94a3b8; font-size: 0.95rem;">${item.description}</p>
            </div>
        `).join('');
    }

    // 4. Menyuntikkan data Pengalaman Kerja
    function renderExperience(data) {
        const expList = document.getElementById("experience-list");
        if (!expList) return;
        
        expList.innerHTML = data.map(item => `
            <div class="experience-item">
                <h3><i class="fas fa-briefcase" style="color: #00f2fe; margin-right: 10px;"></i>${item.company}</h3>
                <p><strong>${item.position}</strong></p>
                <span class="date-tag">${item.year}</span>
                <p style="margin-top: 10px; color: #94a3b8; font-size: 0.95rem;">${item.description}</p>
            </div>
        `).join('');
    }

    // 5. Menyuntikkan data Proyek Elektronika/IoT
    function renderProjects(data) {
        const projectsGrid = document.getElementById("projects-grid");
        if (!projectsGrid) return;
        
        projectsGrid.innerHTML = data.map(item => `
            <div class="experience-item">
                <h3><i class="fas fa-microchip" style="color: #00f2fe; margin-right: 10px;"></i>${item.title}</h3>
                <p><strong>Role: ${item.role} (${item.year})</strong></p>
                <p style="margin-top: 10px; color: #94a3b8; font-size: 0.95rem;">${item.description}</p>
            </div>
        `).join('');
    }

    // Jalankan sistem pencari data
    loadData();

    // 6. Efek Navigasi Aktif Otomatis Saat Layar di-Scroll
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Set Tahun Otomatis di Bagian Bawah (Footer)
    document.getElementById("current-year").textContent = new Date().getFullYear();
});