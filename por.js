// ========== ATTENDRE QUE LE DOM SOIT CHARGÉ ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== NAVIGATION ACTIVE ET SCROLL DOUX ==========
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // ========== SCROLL DOUX POUR LA NAVIGATION ==========
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ========== MENU BURGER POUR MOBILE ==========
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksMenu = document.getElementById('navLinks');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksMenu.classList.toggle('active');
        });
    }
    
    // ========== MODE SOMBRE ==========
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Mode clair';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                this.textContent = '☀️ Mode clair';
                localStorage.setItem('theme', 'dark');
            } else {
                this.textContent = '🌙 Mode sombre';
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // ========== BOUTON ME CONTACTER ==========
    const meContacterBtn = document.getElementById('meContacterBtn');
    const contactDiv = document.getElementById('contact');
    
    if (meContacterBtn) {
        meContacterBtn.addEventListener('click', function() {
            if (contactDiv.style.display === 'none' || contactDiv.style.display === '') {
                contactDiv.style.display = 'block';
                contactDiv.scrollIntoView({ behavior: 'smooth' });
                // Cacher les infos profil si affichées
                const infosContainer = document.getElementById('infosContainer');
                if (infosContainer) infosContainer.style.display = 'none';
            } else {
                contactDiv.style.display = 'none';
            }
        });
    }
    
    // ========== BOUTON VOIR MON PROFIL (CORRIGÉ) ==========
    const voirProfilBtn = document.getElementById('voirProfilBtn');
    const infosContainer = document.getElementById('infosContainer');
    
    if (voirProfilBtn) {
        voirProfilBtn.addEventListener('click', function() {
            console.log('Bouton voir profil cliqué'); // Pour debug
            if (infosContainer) {
                if (infosContainer.style.display === 'none' || infosContainer.style.display === '') {
                    infosContainer.style.display = 'block';
                    // Cacher le formulaire de contact si affiché
                    if (contactDiv) contactDiv.style.display = 'none';
                    // Scroll vers les infos
                    setTimeout(() => {
                        infosContainer.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } else {
                    infosContainer.style.display = 'none';
                }
            } else {
                console.error('infosContainer non trouvé');
            }
        });
    }
    
    // ========== FORMULAIRE DE CONTACT ==========
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!nom || !email || !message) {
                formFeedback.textContent = '❌ Veuillez remplir tous les champs.';
                formFeedback.style.color = '#dc3545';
                return;
            }
            
            formFeedback.textContent = `✅ Merci ${nom} ! Votre message a bien été envoyé. Je vous répondrai sous 48h.`;
            formFeedback.style.color = '#28a745';
            contactForm.reset();
            
            setTimeout(() => {
                formFeedback.textContent = '';
            }, 5000);
        });
    }
    
    // ========== ANIMATION DES BARRES DE COMPÉTENCES ==========
    function animateSkillBars() {
        const skillItems = document.querySelectorAll('.skill-item');
        const windowHeight = window.innerHeight;
        
        skillItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < windowHeight - 100;
            
            if (isVisible && !item.classList.contains('animated')) {
                item.classList.add('animated');
                const skillValue = parseInt(item.getAttribute('data-skill')) || 0;
                const fillBar = item.querySelector('.skill-fill');
                const percentSpan = item.querySelector('.skill-percent');
                
                if (fillBar) {
                    fillBar.style.width = `${skillValue}%`;
                }
                
                // Animation du pourcentage
                if (percentSpan) {
                    let currentPercent = 0;
                    const interval = setInterval(() => {
                        if (currentPercent >= skillValue) {
                            clearInterval(interval);
                        } else {
                            currentPercent++;
                            percentSpan.textContent = `${currentPercent}%`;
                        }
                    }, 15);
                }
            }
        });
    }
    
    // ========== ANIMATION DES STATISTIQUES ==========
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statNumbers = document.querySelectorAll('.stat-number');
        const windowHeight = window.innerHeight;
        const statsSection = document.getElementById('stats');
        
        if (statsSection) {
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < windowHeight - 100;
            
            if (isVisible) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const targetCount = parseInt(stat.getAttribute('data-count')) || 0;
                    let currentCount = 0;
                    const duration = 2000;
                    const increment = targetCount / (duration / 16);
                    
                    const updateCount = setInterval(() => {
                        currentCount += increment;
                        if (currentCount >= targetCount) {
                            stat.textContent = targetCount;
                            clearInterval(updateCount);
                        } else {
                            stat.textContent = Math.floor(currentCount);
                        }
                    }, 16);
                });
            }
        }
    }
    
    // ========== OBSERVATEUR POUR LES ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'competences') {
                    animateSkillBars();
                }
                if (entry.target.id === 'stats') {
                    animateStats();
                }
            }
        });
    }, observerOptions);
    
    const competencesSection = document.getElementById('competences');
    const statsSection = document.getElementById('stats');
    
    if (competencesSection) observer.observe(competencesSection);
    if (statsSection) observer.observe(statsSection);
    
    // Déclencher aussi au scroll pour les barres
    window.addEventListener('scroll', function() {
        animateSkillBars();
        animateStats();
    });
    
    // Déclencher une fois au chargement
    setTimeout(() => {
        animateSkillBars();
        animateStats();
    }, 500);
    
    // ========== PROJETS : OUVERTURE MODALE ==========
    const projetsData = {
        boutique: {
            titre: "🛍️ Boutique en ligne interactive",
            description: "Site e-commerce complet développé avec HTML5, CSS3 et JavaScript. Intégration d'un panier d'achat dynamique, filtres de produits et interface responsive.",
            technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage"],
            statut: "Disponible sur demande",
            lien: "#"
        },
        qgis: {
            titre: "🗺️ Analyse spatiale avec QGIS",
            description: "Projet universitaire de cartographie thématique. Analyse de l'occupation des sols, géoréférencement d'images satellites et production de cartes cartographiques professionnelles.",
            technologies: ["QGIS", "PostGIS", "Shapefiles", "GDAL"],
            statut: "Projet académique",
            lien: "#"
        },
        python: {
            titre: "🐍 Automatisation Python pour données géospatiales",
            description: "Scripts Python utilisant GeoPandas et Fiona pour le traitement automatisé de données géospatiales, conversion de formats et analyses statistiques.",
            technologies: ["Python", "GeoPandas", "Fiona", "Matplotlib"],
            statut: "En cours de développement",
            lien: "#"
        }
    };
    
    const modal = document.getElementById('modalProjet');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    function ouvrirModal(projetId) {
        const projet = projetsData[projetId] || projetsData.boutique;
        
        if (modalBody) {
            modalBody.innerHTML = `
                <h2 style="color: #1f8a7c; margin-bottom: 1rem;">${projet.titre}</h2>
                <p style="line-height: 1.6; margin-bottom: 1rem;">${projet.description}</p>
                <div class="tech-tags" style="display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;">
                    ${projet.technologies.map(tech => `<span style="background: #e0eceb; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem;">${tech}</span>`).join('')}
                </div>
                <div style="display: flex; gap: 15px; margin: 20px 0;">
                    <button class="btn-demo" style="background: #1f8a7c; color: white; border: none; padding: 10px 20px; border-radius: 30px; cursor: pointer;">🔗 Voir la démo</button>
                    <button class="btn-code" style="background: #333; color: white; border: none; padding: 10px 20px; border-radius: 30px; cursor: pointer;">📁 Code source</button>
                </div>
                <p style="font-size: 0.85rem; color: #888; font-style: italic;">📌 ${projet.statut}</p>
            `;
            
            // Ajouter les événements aux boutons
            const btnDemo = modalBody.querySelector('.btn-demo');
            const btnCode = modalBody.querySelector('.btn-code');
            
            if (btnDemo) {
                btnDemo.addEventListener('click', () => {
                    alert('Démonstration disponible prochainement. Contactez-moi pour un aperçu !');
                });
            }
            if (btnCode) {
                btnCode.addEventListener('click', () => {
                    alert('Code source disponible sur demande.');
                });
            }
        }
        
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Ajouter l'événement sur chaque carte projet
    const cartesProjet = document.querySelectorAll('.cartep1');
    const projetsIds = ['boutique', 'qgis', 'python'];
    
    cartesProjet.forEach((carte, index) => {
        carte.addEventListener('click', (e) => {
            // Éviter de déclencher si on clique sur le bouton
            if (e.target.classList.contains('voir-projet-btn')) {
                e.stopPropagation();
            }
            ouvrirModal(projetsIds[index % projetsIds.length]);
        });
        
        // Bouton "Voir le projet" dans la carte
        const voirBtn = carte.querySelector('.voir-projet-btn');
        if (voirBtn) {
            voirBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                ouvrirModal(projetsIds[index % projetsIds.length]);
            });
        }
    });
    
    // Fermer la modale
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    window.addEventListener('click', (e) => {
        if (modal && e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // ========== TÉLÉCHARGEMENT CV ==========
    const downloadBtn = document.getElementById('downloadCvBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cvContent = `
                AMINATA KOUNTA
                ===============
                Géomaticienne & Développeuse
                
                📞 +221 78 560 85 69
                📧 aminata021104@gmail.com
                
                FORMATION
                ---------
                2024 - Présent : Licence en Géomatique - UFR Sciences de l'Ingénieur
                2024 : Baccalauréat Scientifique (S2) - Lycée Ababacar Sy de Tivaouane
                
                COMPÉTENCES TECHNIQUES
                ----------------------
                SIG : QGIS, ArcGIS, AutoCAD, PostGIS, Leaflet.js
                Développement : HTML5, CSS3, JavaScript, Python, PHP/MySQL
                Données : Excel avancé, Pandas, Power BI, SQL
                
                LANGUES
                -------
                Français : Courant (95%)
                Anglais : Intermédiaire (65%)
                Espagnol : Notions (40%)
                
                CENTRES D'INTÉRÊT
                -----------------
                Cartographie numérique, Innovation technologique, SIG & environnement
                Développement web, Data visualisation, Travail collaboratif
            `;
            
            const blob = new Blob([cvContent], {type: 'application/pdf'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CV_Aminata_Kounta.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
    
    // ========== CORRECTION DES BARRES DE POURCENTAGE (initialisation à 0) ==========
    // S'assurer que tous les pourcentages commencent à 0%
    const allSkillPercent = document.querySelectorAll('.skill-percent');
    allSkillPercent.forEach(percent => {
        percent.textContent = '0%';
    });
    
    const allSkillFills = document.querySelectorAll('.skill-fill');
    allSkillFills.forEach(fill => {
        fill.style.width = '0%';
    });
    
    console.log('JavaScript chargé avec succès !');
});
// ========== GÉNÉRATION PDF DU CV ==========
function genererCV() {
    const btn = document.getElementById('downloadCvBtn');
    btn.textContent = '⏳ Génération en cours...';
    btn.disabled = true;

    // Créer le contenu du CV (copie de votre CV HTML)
    const cvContent = document.createElement('div');
    cvContent.id = 'cv-pdf-content';
    cvContent.style.cssText = `
        padding: 0;
        margin: 0;
        background: #f4f7fc;
        font-family: 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        max-width: 1100px;
        width: 100%;
        display: flex;
    `;

    // Copie de votre SIDEBAR (bleue)
    cvContent.innerHTML = `
        <!-- ============ SIDEBAR BLEU ============ -->
        <aside style="
            width: 32%;
            background: #0b2b4a;
            color: #eef5fb;
            padding: 35px 22px 30px;
            display: flex;
            flex-direction: column;
            gap: 28px;
        ">
            <header style="text-align: center; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 22px;">
                <img src="../Image/WhatsApp Image 2026-01-17 at 21.03.44.jpeg" alt="Photo Aminata Kounta" style="
                    width: 130px;
                    height: 130px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #7bb3e0;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
                    margin-bottom: 16px;
                    background: #fff;
                ">
                <h1 style="font-size: 1.9rem; font-weight: 600; color: #ffffff; margin-bottom: 6px;">Aminata Kounta</h1>
                <span style="
                    display: inline-block;
                    background: #1f4b6e;
                    padding: 5px 18px;
                    border-radius: 30px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #d6eaff;
                    margin: 8px 0 12px;
                "><i class="fas fa-graduation-cap"></i> L2 Géomatique</span>
                
                <address style="font-style: normal; font-size: 0.95rem; line-height: 1.7; color: #c9dff5;">
                    <p style="margin: 8px 0;"><i class="fas fa-phone-alt" style="width:22px; color:#7bb3e0;"></i> +221 78 560 85 69</p>
                    <p style="margin: 8px 0;"><i class="fas fa-envelope" style="width:22px; color:#7bb3e0;"></i> aminata021104@gmail.com</p>
                    <p style="margin: 8px 0;"><i class="fas fa-paper-plane" style="width:22px; color:#7bb3e0;"></i> <a href="mailto:aminata021104@gmail.com" style="color:#b3d6f5; text-decoration:none;">Envoyer un mail</a></p>
                </address>
            </header>

            <!-- Compétences -->
            <section style="margin-top: 4px;">
                <h4 style="
                    font-size: 1.1rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #b3d6f5;
                    border-bottom: 2px solid #1f4b6e;
                    padding-bottom: 10px;
                    margin-bottom: 18px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                "><i class="fas fa-code" style="color:#7bb3e0;"></i> Compétences</h4>
                
                <div style="margin-bottom: 20px;">
                    <h5 style="font-size:0.9rem; font-weight:500; color:#b3d6f5; text-transform:uppercase; margin-bottom:8px;">Techniques</h5>
                    <ul style="list-style:none; padding-left:6px;">
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);">SIG</li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);">Cartographie</li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);">Télédétection</li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);">Informatique</li>
                    </ul>
                </div>
                <div style="margin-bottom: 20px;">
                    <h5 style="font-size:0.9rem; font-weight:500; color:#b3d6f5; text-transform:uppercase; margin-bottom:8px;">Outils</h5>
                    <ul style="list-style:none; padding-left:6px;">
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);"><b style="color:#ffffff;">QGIS</b></li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);"><b style="color:#ffffff;">ArcGIS</b></li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);"><b style="color:#ffffff;">AutoCAD</b></li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);"><b style="color:#ffffff;">PyCharm</b></li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);"><b style="color:#ffffff;">RStudio</b></li>
                    </ul>
                </div>
                <div style="margin-bottom: 20px;">
                    <h5 style="font-size:0.9rem; font-weight:500; color:#b3d6f5; text-transform:uppercase; margin-bottom:8px;">Langues</h5>
                    <ul style="list-style:none; padding-left:6px;">
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);">Français</li>
                        <li style="padding:5px 0 5px 22px; position:relative; font-size:0.95rem; border-bottom:1px solid rgba(255,255,255,0.05);">Anglais</li>
                    </ul>
                </div>
            </section>
        </aside>

        <!-- ============ CONTENU PRINCIPAL ============ -->
        <main style="
            width: 68%;
            padding: 35px 30px 30px;
            background: #ffffff;
        ">
            <!-- Profil -->
            <section style="margin-bottom:28px;">
                <h4 style="
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0b2b4a;
                    border-bottom: 3px solid #1f4b6e;
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                "><i class="fas fa-user-circle" style="color:#1f4b6e;"></i> Profil</h4>
                <p style="
                    background: #f0f6fe;
                    padding: 18px 20px;
                    border-radius: 14px;
                    font-size: 0.98rem;
                    color: #1e2b3a;
                    border-left: 5px solid #1f4b6e;
                    line-height: 1.6;
                ">
                    Étudiante en deuxième année de Licence en Géomatique, passionnée par les systèmes d'information géographique,
                    la collecte et l'analyse de données. Rigoureuse, motivée et en recherche active d'un stage pour
                    consolider mes compétences techniques et professionnelles dans le domaine de la géomatique.
                </p>
            </section>

            <!-- Expériences -->
            <section style="margin-bottom:28px;">
                <h4 style="
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0b2b4a;
                    border-bottom: 3px solid #1f4b6e;
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                "><i class="fas fa-briefcase" style="color:#1f4b6e;"></i> Expériences</h4>
                <ul style="list-style:none; padding-left:0;">
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <b style="color:#0b2b4a;">Commissaire au comité du club Géomatique</b> – Projet universitaire & académique
                        <br><span style="font-size:0.9rem; color:#3a5a7a;">Organisation d'événements, coordination et gestion des activités du club.</span>
                    </li>
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <b style="color:#0b2b4a;">Compétences techniques appliquées</b> – Réalisation de travaux pratiques en SIG, cartographie et télédétection.
                    </li>
                </ul>
            </section>

            <!-- Formation -->
            <section style="margin-bottom:28px;">
                <h4 style="
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0b2b4a;
                    border-bottom: 3px solid #1f4b6e;
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                "><i class="fas fa-graduation-cap" style="color:#1f4b6e;"></i> Formation</h4>
                <ul style="list-style:none; padding-left:0;">
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <b style="color:#0b2b4a;">Baccalauréat Scientifique (S2)</b> – 2024
                        <br>Lycée Ababacar Sy de Tivaouane
                    </li>
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <b style="color:#0b2b4a;">Licence Géomatique</b> – en cours (L2)
                        <br>Université Iba Der Thiam de Thies
                    </li>
                </ul>
            </section>

            <!-- Projets -->
            <section style="margin-bottom:28px;">
                <h4 style="
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0b2b4a;
                    border-bottom: 3px solid #1f4b6e;
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                "><i class="fas fa-map-marked-alt" style="color:#1f4b6e;"></i> Projets</h4>
                <ul style="list-style:none; padding-left:0;">
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <b style="color:#0b2b4a;">Rapport sur le trafic routier – Ville de Thiès</b>
                        <p style="
                            margin-top:5px;
                            padding-left:8px;
                            font-size:0.95rem;
                            color:#2a4055;
                            background:#f8fbff;
                            border-radius:10px;
                            padding:10px 14px;
                            border-left:3px solid #7bb3e0;
                        ">
                            <i class="fas fa-car" style="color:#1f4b6e; margin-right:8px;"></i>
                            Comptage du nombre de véhicules aux carrefours à l'aide de <b>KOBOTOOLBOX</b> (formulaire)
                            et <b>KOBOcollect</b> (collecte). Cartographie des résultats avec <b>QGIS</b>.
                        </p>
                    </li>
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <b style="color:#0b2b4a;">Numérisation de l'université</b>
                        <p style="
                            margin-top:5px;
                            padding-left:8px;
                            font-size:0.95rem;
                            color:#2a4055;
                            background:#f8fbff;
                            border-radius:10px;
                            padding:10px 14px;
                            border-left:3px solid #7bb3e0;
                        ">
                            <i class="fas fa-draw-polygon" style="color:#1f4b6e; margin-right:8px;"></i>
                            Création de couches vectorielles et production d'une carte thématique à partir d'une photo aérienne,
                            dans le cadre du cours de cartographie (QGIS).
                        </p>
                    </li>
                </ul>
            </section>

            <!-- Centre d'intérêt -->
            <section style="margin-bottom:28px;">
                <h4 style="
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0b2b4a;
                    border-bottom: 3px solid #1f4b6e;
                    padding-bottom: 8px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                "><i class="fas fa-heart" style="color:#1f4b6e;"></i> Centres d'intérêt</h4>
                <ul style="list-style:none; padding-left:0;">
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <i class="fas fa-globe-africa" style="color:#1f4b6e; margin-right:10px;"></i> Cartographie et exploration géographique
                    </li>
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <i class="fas fa-users" style="color:#1f4b6e; margin-right:10px;"></i> Activités associatives universitaires
                    </li>
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <i class="fas fa-chart-line" style="color:#1f4b6e; margin-right:10px;"></i> Analyse de données & nouvelles technologies
                    </li>
                    <li style="padding:8px 0 8px 30px; position:relative; font-size:0.98rem; border-bottom:1px solid #edf2f7;">
                        <i class="fas fa-book-open" style="color:#1f4b6e; margin-right:10px;"></i> Développement personnel, veille technologique et apprentissage continu
                    </li>
                </ul>
            </section>
        </main>
    `;

    document.body.appendChild(cvContent);

    // Générer le PDF
    html2pdf()
        .set({
            margin: [10, 10, 10, 10],
            filename: 'CV_Aminata_Kounta.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(cvContent)
        .save()
        .then(function() {
            btn.textContent = '✅ Téléchargé !';
            setTimeout(() => {
                btn.textContent = '📥 Télécharger mon CV (PDF)';
                btn.disabled = false;
            }, 2000);
            document.body.removeChild(cvContent);
        })
        .catch(function(error) {
            alert('❌ Erreur : ' + error.message);
            btn.textContent = '📥 Télécharger mon CV (PDF)';
            btn.disabled = false;
            document.body.removeChild(cvContent);
        });
}
// ========== TRADUCTION ==========
const translations = {
    fr: {
        nav_home: "Accueil",
        nav_projects: "Projets",
        nav_skills: "Compétences",
        nav_stats: "Chiffres",
        nav_home_footer: "Accueil",
        nav_projects_footer: "Projets",
        nav_skills_footer: "Compétences",
        nav_stats_footer: "Chiffres",
        badge: "📍 Thiès, Sénégal",
        title: 'Mon <span>Portfolio</span>',
        subtitle: "Création de solutions géospatiales innovantes",
        presentation: "Titulaire d'un baccalauréat scientifique (S2) obtenu en 2024 au lycée Ababacar Sy de Tivaouane, je poursuis actuellement une licence en Géomatique. Passionnée par l'ingénierie et l'innovation, j'oriente mon parcours vers les technologies géospatiales et le développement web.",
        email_link: "📧 Email",
        linkedin_link: "🔗 LinkedIn",
        contact_me: "📩 Me contacter",
        view_profile: "📄 Voir mon profil",
        available: "● Disponible",
        dark_mode: "🌙 Mode sombre",
        contact_title: "✉️ Contactez-moi",
        name_label: "Nom complet",
        name_placeholder: "Votre nom",
        email_label: "Email",
        email_placeholder: "Votre email",
        message_label: "Message",
        message_placeholder: "Votre message",
        send_btn: "Envoyer le message",
        languages_title: "🌍 Langues parlées",
        french: "Français",
        english_lang: "Anglais",
        spanish: "Espagnol",
        education_title: "🎓 Parcours académique",
        current_date: "2024 - Présent",
        geomatics_degree: "Licence en Géomatique",
        ufr: "UFR des Sciences de l'Ingénieur",
        bac_degree: "Baccalauréat Scientifique (S2)",
        highschool: "Lycée Ababacar Sy de Tivaouane | Mention Assez Bien",
        interests_title: "💫 Centres d'intérêt",
        interest1: "🗺️ Cartographie numérique",
        interest2: "📱 Innovation technologique",
        interest3: "🌍 SIG & environnement",
        interest4: "💻 Développement web",
        interest5: "📊 Data visualisation",
        interest6: "🤝 Travail collaboratif",
        objectives_title: "🎯 Objectifs professionnels",
        objectives_text: "À court terme, je souhaite approfondir mes compétences en SIG et en développement web pour créer des solutions innovantes. À long terme, j'aspire à contribuer à des projets d'aménagement territorial et de gestion environnementale en tant qu'ingénieure géomaticienne.",
        cv_title: "📄 Mon CV",
        cv_text: "Téléchargez mon CV pour découvrir mon parcours complet.",
        cv_download: "📥 Télécharger mon CV (PDF)",
        projects_title: "🚀 Mes projets",
        projects_count: "06 projets réalisés",
        project1_title: "Boutique en ligne",
        project1_desc: "Site e-commerce responsive avec panier interactif",
        project2_title: "Méthode de collecte et d'analyse de données",
        project2_desc: "Rapport sur le trafic routier dans la région de Thiès",
        project3_title: "Site pour les heures de prières",
        project3_desc: "Site créé avec HTML, CSS, JS pour les heures de prières selon la position géographique",
        project4_title: "Cartographie thématique",
        project4_desc: "Création de cartes thématiques",
        project5_title: "Géolocalisation",
        project5_desc: "Carte des Établissements Scolaires de la région de Dakar",
        project6_title: "Projet sur l'implantation et le nivellement",
        project6_desc: "Travail pratique sur le terrain pour faire un nivellement et implantation afin de réaliser un plan topographie",
        view_project: "Voir le projet →",
        skills_title: "💡 Mes Compétences",
        skills_count: "15+ compétences maîtrisées",
        skills_gis: "🗺️ SIG & Géomatique",
        skills_web: "💻 Développement web",
        skills_data: "📊 Analyse de données",
        stats_title: "📊 Chiffres-clés",
        stats_projects: "Projets réalisés",
        stats_skills: "Compétences maîtrisées",
        stats_software: "Logiciels SIG",
        stats_languages: "Langages",
        footer_name: "Aminata Kounta",
        footer_title: "Géomaticienne",
        footer_nav: "Navigation",
        footer_contact: "Contact",
        footer_copyright: "© 2026 Aminata Kounta - Portfolio Géomatique"
    },
    en: {
        nav_home: "Home",
        nav_projects: "Projects",
        nav_skills: "Skills",
        nav_stats: "Stats",
        nav_home_footer: "Home",
        nav_projects_footer: "Projects",
        nav_skills_footer: "Skills",
        nav_stats_footer: "Stats",
        badge: "📍 Thiès, Senegal",
        title: 'My <span>Portfolio</span>',
        subtitle: "Creating innovative geospatial solutions",
        presentation: "Holder of a scientific baccalaureate (S2) obtained in 2024 at Lycée Ababacar Sy de Tivaouane, I am currently pursuing a degree in Geomatics. Passionate about engineering and innovation, I am focusing my career on geospatial technologies and web development.",
        email_link: "📧 Email",
        linkedin_link: "🔗 LinkedIn",
        contact_me: "📩 Contact me",
        view_profile: "📄 View my profile",
        available: "● Available",
        dark_mode: "🌙 Dark mode",
        contact_title: "✉️ Contact me",
        name_label: "Full name",
        name_placeholder: "Your name",
        email_label: "Email",
        email_placeholder: "Your email",
        message_label: "Message",
        message_placeholder: "Your message",
        send_btn: "Send message",
        languages_title: "🌍 Languages spoken",
        french: "French",
        english_lang: "English",
        spanish: "Spanish",
        education_title: "🎓 Academic background",
        current_date: "2024 - Present",
        geomatics_degree: "Bachelor's in Geomatics",
        ufr: "UFR of Engineering Sciences",
        bac_degree: "Scientific Baccalaureate (S2)",
        highschool: "Ababacar Sy High School of Tivaouane | Good Mention",
        interests_title: "💫 Interests",
        interest1: "🗺️ Digital cartography",
        interest2: "📱 Technological innovation",
        interest3: "🌍 GIS & Environment",
        interest4: "💻 Web development",
        interest5: "📊 Data visualization",
        interest6: "🤝 Teamwork",
        objectives_title: "🎯 Professional objectives",
        objectives_text: "In the short term, I want to deepen my skills in GIS and web development to create innovative solutions. In the long term, I aspire to contribute to territorial planning and environmental management projects as a geomatics engineer.",
        cv_title: "📄 My CV",
        cv_text: "Download my CV to discover my complete background.",
        cv_download: "📥 Download my CV (PDF)",
        projects_title: "🚀 My Projects",
        projects_count: "06 projects completed",
        project1_title: "Online Store",
        project1_desc: "Responsive e-commerce site with interactive shopping cart",
        project2_title: "Data collection and analysis method",
        project2_desc: "Report on road traffic in the Thiès region",
        project3_title: "Prayer Times Website",
        project3_desc: "Website created with HTML, CSS, JS for prayer times based on geographic location",
        project4_title: "Thematic Cartography",
        project4_desc: "Creation of thematic maps",
        project5_title: "Geolocation",
        project5_desc: "Map of Schools in the Dakar region",
        project6_title: "Surveying and leveling project",
        project6_desc: "Fieldwork for leveling and surveying to create a topographic plan",
        view_project: "View project →",
        skills_title: "💡 My Skills",
        skills_count: "15+ mastered skills",
        skills_gis: "🗺️ GIS & Geomatics",
        skills_web: "💻 Web Development",
        skills_data: "📊 Data Analysis",
        stats_title: "📊 Key Figures",
        stats_projects: "Projects completed",
        stats_skills: "Skills mastered",
        stats_software: "GIS Software",
        stats_languages: "Languages",
        footer_name: "Aminata Kounta",
        footer_title: "Geomatics Engineer",
        footer_nav: "Navigation",
        footer_contact: "Contact",
        footer_copyright: "© 2026 Aminata Kounta - Geomatics Portfolio"
    }
};

let currentLang = 'fr';

function changeLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = lang === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN';
    }

    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.textContent = lang === 'fr' ? '🌙 Mode sombre' : '🌙 Dark mode';
    }

    document.documentElement.lang = lang;
    document.title = lang === 'fr' ? 'Mon Portfolio - Aminata Kounta' : 'My Portfolio - Aminata Kounta';
}

document.addEventListener('DOMContentLoaded', function() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', function() {
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            changeLanguage(newLang);
        });
    }
});

// ========== GÉNÉRATION PDF DU CV ==========
function genererCV() {
    const btn = document.getElementById('downloadCvBtn');
    btn.textContent = '⏳ Génération en cours...';
    btn.disabled = true;

    const cvContent = document.createElement('div');
    cvContent.id = 'cv-pdf-content';
    cvContent.style.cssText = `
        padding: 0;
        margin: 0;
        background: #ffffff;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    `;

    cvContent.innerHTML = `
        <div style="background: #0b2b4a; color: white; padding: 40px 50px 30px; display: flex; align-items: center; gap: 40px; flex-wrap: wrap;">
            <img src="../Image/mapho.jpeg" alt="Photo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #7bb3e0;">
            <div>
                <h1 style="font-size: 2.2rem; font-weight: 700; margin: 0; color: #ffffff;">Aminata Kounta</h1>
                <p style="font-size: 1.1rem; color: #b3d6f5; margin: 5px 0 10px;"><i class="fas fa-graduation-cap"></i> L2 Géomatique</p>
                <div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 0.95rem; color: #c9dff5;">
                    <span><i class="fas fa-phone-alt" style="width:20px;"></i> +221 78 560 85 69</span>
                    <span><i class="fas fa-envelope" style="width:20px;"></i> aminata021104@gmail.com</span>
                    <span><i class="fas fa-map-marker-alt" style="width:20px;"></i> Thiès, Sénégal</span>
                </div>
            </div>
        </div>
        <div style="padding: 35px 50px 40px; background: #ffffff;">
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-user-circle" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Profil' : 'Profile'}</h2>
                <p style="font-size: 0.95rem; line-height: 1.7; color: #2d3e50; margin: 0;">${currentLang === 'fr' ? 'Étudiante en Licence Géomatique, passionnée par les SIG, la cartographie et l\'analyse de données. Rigoureuse et motivée, je recherche un stage pour consolider mes compétences techniques.' : 'Geomatics student, passionate about GIS, cartography and data analysis. Rigorous and motivated, I am looking for an internship to consolidate my technical skills.'}</p>
            </div>
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-code" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Compétences' : 'Skills'}</h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px 30px;">
                    <div>
                        <p style="font-weight:600; color:#0b2b4a; margin:5px 0;">${currentLang === 'fr' ? 'Techniques' : 'Technical'}</p>
                        <ul style="list-style:none; padding:0; margin:0;">
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ SIG</li>
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ Cartographie</li>
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ Télédétection</li>
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ Informatique</li>
                        </ul>
                    </div>
                    <div>
                        <p style="font-weight:600; color:#0b2b4a; margin:5px 0;">${currentLang === 'fr' ? 'Outils' : 'Tools'}</p>
                        <ul style="list-style:none; padding:0; margin:0;">
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ QGIS, ArcGIS</li>
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ AutoCAD</li>
                            <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ PyCharm, RStudio</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-graduation-cap" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Formation' : 'Education'}</h2>
                <div style="padding-left:5px;">
                    <div style="margin-bottom:10px;">
                        <p style="font-weight:600; color:#0b2b4a; margin:0;">${currentLang === 'fr' ? 'Licence en Géomatique' : 'Bachelor\'s in Geomatics'}</p>
                        <p style="font-size:0.9rem; color:#5a6f82; margin:2px 0;">${currentLang === 'fr' ? '2024 - Présent · Université Iba Der Thiam de Thiès' : '2024 - Present · Iba Der Thiam University of Thiès'}</p>
                    </div>
                    <div>
                        <p style="font-weight:600; color:#0b2b4a; margin:0;">${currentLang === 'fr' ? 'Baccalauréat Scientifique (S2)' : 'Scientific Baccalaureate (S2)'}</p>
                        <p style="font-size:0.9rem; color:#5a6f82; margin:2px 0;">${currentLang === 'fr' ? '2024 · Lycée Ababacar Sy de Tivaouane' : '2024 · Ababacar Sy High School of Tivaouane'}</p>
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-briefcase" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Expériences' : 'Experience'}</h2>
                <div style="padding-left:5px;">
                    <div style="margin-bottom:10px;">
                        <p style="font-weight:600; color:#0b2b4a; margin:0;">${currentLang === 'fr' ? 'Commissaire · Club Géomatique' : 'Commissioner · Geomatics Club'}</p>
                        <p style="font-size:0.9rem; color:#5a6f82; margin:2px 0;">${currentLang === 'fr' ? 'Organisation d\'événements et coordination des activités' : 'Event organization and activity coordination'}</p>
                    </div>
                    <div>
                        <p style="font-weight:600; color:#0b2b4a; margin:0;">${currentLang === 'fr' ? 'Travaux pratiques en SIG' : 'GIS Practical Work'}</p>
                        <p style="font-size:0.9rem; color:#5a6f82; margin:2px 0;">${currentLang === 'fr' ? 'Cartographie, télédétection et analyse de données' : 'Cartography, remote sensing and data analysis'}</p>
                    </div>
                </div>
            </div>
            <div style="margin-bottom: 25px;">
                <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-map-marked-alt" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Projets' : 'Projects'}</h2>
                <div style="padding-left:5px;">
                    <div style="margin-bottom:10px;">
                        <p style="font-weight:600; color:#0b2b4a; margin:0;">${currentLang === 'fr' ? 'Trafic routier – Ville de Thiès' : 'Road traffic – Thiès City'}</p>
                        <p style="font-size:0.9rem; color:#5a6f82; margin:2px 0;">${currentLang === 'fr' ? 'Collecte avec Kobotoolbox · Cartographie QGIS' : 'Data collection with Kobotoolbox · QGIS mapping'}</p>
                    </div>
                    <div>
                        <p style="font-weight:600; color:#0b2b4a; margin:0;">${currentLang === 'fr' ? 'Numérisation de l\'université' : 'University digitization'}</p>
                        <p style="font-size:0.9rem; color:#5a6f82; margin:2px 0;">${currentLang === 'fr' ? 'Création de couches vectorielles · Carte thématique' : 'Vector layer creation · Thematic map'}</p>
                    </div>
                </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                    <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-language" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Langues' : 'Languages'}</h2>
                    <ul style="list-style:none; padding:0; margin:0;">
                        <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ ${currentLang === 'fr' ? 'Français - Courant' : 'French - Fluent'}</li>
                        <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ ${currentLang === 'fr' ? 'Anglais - Intermédiaire' : 'English - Intermediate'}</li>
                    </ul>
                </div>
                <div>
                    <h2 style="font-size: 1.1rem; font-weight: 700; color: #0b2b4a; text-transform: uppercase; letter-spacing: 1px; border-bottom: 3px solid #0b2b4a; padding-bottom: 8px; margin-bottom: 12px;"><i class="fas fa-heart" style="color:#0b2b4a; margin-right:10px;"></i> ${currentLang === 'fr' ? 'Centres d\'intérêt' : 'Interests'}</h2>
                    <ul style="list-style:none; padding:0; margin:0;">
                        <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ ${currentLang === 'fr' ? 'Cartographie & exploration' : 'Cartography & exploration'}</li>
                        <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ ${currentLang === 'fr' ? 'Activités associatives' : 'Associative activities'}</li>
                        <li style="padding:4px 0; font-size:0.92rem; color:#2d3e50;">▸ ${currentLang === 'fr' ? 'Analyse de données' : 'Data analysis'}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cvContent);

    html2pdf()
        .set({
            margin: [8, 8, 8, 8],
            filename: 'CV_Aminata_Kounta.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(cvContent)
        .save()
        .then(function() {
            btn.textContent = '✅ Téléchargé !';
            setTimeout(() => {
                btn.textContent = '📥 Télécharger mon CV (PDF)';
                btn.disabled = false;
            }, 2000);
            document.body.removeChild(cvContent);
        })
        .catch(function(error) {
            alert('❌ Erreur : ' + error.message);
            btn.textContent = '📥 Télécharger mon CV (PDF)';
            btn.disabled = false;
            document.body.removeChild(cvContent);
        });
}
// Stocker dans localStorage
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
document.getElementById('visit-counter').textContent = `👀 ${visits} visiteurs`;