// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 700, once: true });

    // Year
    document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());
    document.getElementById('year2') && (document.getElementById('year2').textContent = new Date().getFullYear());

    // Top button show/hide & smooth scroll (safety checks)
    const topBtn = document.getElementById('topBtn');
    if (topBtn) {
        const check = () => {
            if (window.scrollY > 300) topBtn.classList.add('show');
            else topBtn.classList.remove('show');
        };
        window.addEventListener('scroll', check);
        check();
        topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Theme toggle (both pages) - unified key "siteTheme"
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-2');

    const updateToggleIcon = (theme) => {
        const iconClass = theme === 'dark' ? 'fa-regular fa-sun' : 'fa-regular fa-moon';
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) icon.className = iconClass;
        });
    }

    const applyTheme = (theme) => {
        // update both <html> and <body> so pages using either one stay in sync
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);

        localStorage.setItem('siteTheme', theme);
        updateToggleIcon(theme);
    }

    // apply saved theme (unified key: siteTheme)
    const current = localStorage.getItem('siteTheme') || 'light';
    applyTheme(current);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const next = document.body.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(next);
        });
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDropdown = document.getElementById('mobileDropdown');
    if (menuToggle && mobileDropdown) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle('show');
            const expanded = mobileDropdown.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', expanded.toString());
        });

        // close when clicking a link in mobile menu
        mobileDropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            mobileDropdown.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
        }));

        // close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileDropdown.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                mobileDropdown.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for internal anchors (only hashes)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href') || '';
            if (href.startsWith('#')) {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Projects data and rendering (existing logic)
    const projectsData = [
        {
            title: `Hospital Performance <br> ( SQL & Power BI )`,
            desc: `This project delivers a comprehensive $\text{Power BI}$ solution that transforms raw hospital data into actionable insights across Finance, Operations, and Patient Analytics. The goal is to optimize decision-making, enhance operational efficiency (e.g., workload and resource planning),
             and drive profitability by understanding key performance drivers and patient demographics.`,
            link: "https://app.powerbi.com/view?r=eyJrIjoiN2MyZWMyZmUtZmMxOS00ODMwLWI4YzEtZGFkNGQ4YTkxOTBmIiwidCI6IjJiYjZlNWJjLWMxMDktNDdmYi05NDMzLWMxYzZmNGZhMzNmZiIsImMiOjl9",
            thumb: "imgs/hospital.png"
        },
        {
            title: ` Costa Caffe (Excel)`,
            desc: `Interactive Excel dashboard analyzing Costa Caffe sales, customer behavior, and product popularity. Features dynamic charts,
 PivotTables, and slicers for clear insights and trends.`,
            link: "https://github.com/essam1212/coffe-Shop",
            thumb: "imgs/cafe.png"
        },
        {
            title: `📚Online Courses<br>(Power BI)`,
            desc: `An interactive Power BI dashboard analyzing the performance, pricing, and content distribution of online courses. It reveals key insights into subscriber behavior, subject popularity, and value perception —
             helping guide smarter decisions in content creation, pricing strategy, and course optimization.`,
            link: "https://app.powerbi.com/view?r=eyJrIjoiOGNlOWEyYWEtMmUzNy00YTBmLWFjMzctNjQ0MWQ5ODcxMTBkIiwidCI6IjJiYjZlNWJjLWMxMDktNDdmYi05NDMzLWMxYzZmNGZhMzNmZiIsImMiOjl9",
            thumb: "imgs/online_courses.png"
        },
        {
            title: "📚  Seles-Store <br>(Power-Bi)",
            desc: `A Power BI interactive sales dashboard designed to analyze key KPIs across products, customers, regions, and shipping modes. It transforms complex sales data into clear visual insights, helping highlight 
            top-performing categories, profitable regions, and improvement opportunities for smarter business decisions.`,
            link: "https://app.powerbi.com/view?r=eyJrIjoiMmYzMjYzYjktOWEzMi00NDRlLWFjNTMtNWFlZWJhODIxMjA4IiwidCI6IjJiYjZlNWJjLWMxMDktNDdmYi05NDMzLWMxYzZmNGZhMzNmZiIsImMiOjl9",
            thumb: "imgs/sales_store.png"
        },
        {
            title: "📚 Service Branch <br>( SQL & Power BI )",
            desc: `A Power BI dashboard built on SQL Server data to analyze service performance across regions, departments, and clients. It delivers clear insights on revenue, 
            hours worked, and business trends to support data-driven decision making.`,
            link: "https://app.powerbi.com/view?r=eyJrIjoiOTUxMTcyZTktNWUzNi00ZGExLWJjYmUtY2MwMzgzYzRlMzUyIiwidCI6IjJiYjZlNWJjLWMxMDktNDdmYi05NDMzLWMxYzZmNGZhMzNmZiIsImMiOjl9",
            thumb: "imgs/services_data.png"
        },
        {
            title: "📚 Sales Dashboard (Excel)",
            desc: `An interactive Excel sales dashboard built using Pivot Tables, Slicers, and Charts to analyze key sales metrics across branches, categories, and payment methods. It transforms raw data into clear insights on performance, 
            customer trends, and revenue distribution to support smarter business decisions.`,
            link: "https://github.com/essam1212/Seles-Dashboard-By-Excel",
            thumb: "imgs/seles_dashboard.png"
        },

    ];

    // If on projects.html: render projects with pagination
    if (document.getElementById('projectsGrid')) {

        const projects = [...projectsData];
        // add dummy projects to demo pagination
        for (let i = projects.length + 1; i <= projects.length; i++) {
            projects.push({
                id: i,
                title: `Dummy Project ${i}`,
                desc: `Short description for dummy project ${i}.`,
                thumb: `placeholder${((i - 1) % 6) + 1}.jpg`,
                link: '#'
            });
        }

        const pageSize = 20; // pagination after 20 projects
        const grid = document.getElementById('projectsGrid');
        const paginationEl = document.getElementById('pagination');

        function renderPage(page = 1) {
            grid.innerHTML = '';
            const start = (page - 1) * pageSize;
            const pageItems = projects.slice(start, start + pageSize);
            pageItems.forEach((p, idx) => {
                const a = document.createElement('a');
                a.className = 'project-card';
                a.href = p.link;
                a.target = '_blank';
                a.setAttribute('data-aos', 'fade-up');
                a.setAttribute('data-aos-delay', (idx % pageSize) * 50);
                a.innerHTML = `
                    <div class="project-thumb" style="background-image:url('${p.thumb}')"></div>
                    <div class="project-body"><h3>${p.title}</h3><p>${p.desc}</p></div>
                `;
                grid.appendChild(a);
            });

            // pagination controls
            paginationEl.innerHTML = '';
            const pages = Math.ceil(projects.length / pageSize);
            if (pages <= 1) return;
            for (let i = 1; i <= pages; i++) {
                const btn = document.createElement('button');
                btn.className = 'page-btn' + (i === page ? ' active' : '');
                btn.textContent = i;
                btn.addEventListener('click', () => renderPage(i));
                paginationEl.appendChild(btn);
            }
        }

        renderPage(1);
    }

    // Update home projects on index if present
    if (document.getElementById('homeProjects')) {
        const homeProjects = document.getElementById('homeProjects');
        homeProjects.innerHTML = '';
        projectsData.slice(0, 4).forEach((p, idx) => {
            const a = document.createElement('a');
            a.className = 'project-card';
            a.href = p.link;
            a.target = '_blank';
            a.setAttribute('data-aos', 'fade-up');
            a.setAttribute('data-aos-delay', (idx + 1) * 50);
            a.innerHTML = `
                <div class="project-thumb" style="background-image:url('${p.thumb}')"></div>
                <div class="project-body"><h3>${p.title}</h3><p>${p.desc}</p></div>
            `;
            homeProjects.appendChild(a);
        });
    }


});