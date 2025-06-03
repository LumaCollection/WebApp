// index.js (sin cambios)

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Footer ---
    const footer = document.querySelector('.site-footer');
    const scrollThreshold = 20; // Pixeles antes de llegar al final para mostrar el footer

    function handleScrollFooter() {
        // Calcula la altura total de la página que puede hacer scroll
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Obtiene la posición actual del scroll
        const currentScroll = window.scrollY;

        // Si estamos cerca del final de la página (dentro del umbral), muestra el footer
        if (currentScroll >= scrollableHeight - scrollThreshold) {
            footer.classList.add('show-footer');
        } else {
            footer.classList.remove('show-footer');
        }
    }

    window.addEventListener('scroll', handleScrollFooter);
    // Llama la función una vez al cargar para verificar el estado inicial
    handleScrollFooter();

    // --- Lógica del Menú Lateral ---
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');

    const tabItems = document.querySelectorAll('.side-menu .tab-item');
    const submenus = document.querySelectorAll('.side-menu .submenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sideMenu) {
                sideMenu.classList.add('open');
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            if (sideMenu) {
                sideMenu.classList.remove('open');
            }
        });
    }

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(t => t.classList.remove('active'));
            item.classList.add('active');

            submenus.forEach(s => s.classList.remove('active'));

            const category = item.dataset.category;
            const targetSubmenu = document.getElementById(`submenu-${category}`);
            if (targetSubmenu) {
                targetSubmenu.classList.add('active');
            }
        });
    });

    // --- Lógica de la Barra de Búsqueda y Responsive ---
    const searchBarFull = document.getElementById('searchBarFull');
    const searchIconMobile = document.getElementById('searchIconMobile');

    function handleResize() {
        if (window.innerWidth <= 768) {
            if (searchBarFull) searchBarFull.style.display = 'none';
            if (searchIconMobile) searchIconMobile.style.display = 'block';
        } else {
            if (searchBarFull) searchBarFull.style.display = 'flex';
            if (searchIconMobile) searchIconMobile.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    if (searchIconMobile) {
        searchIconMobile.addEventListener('click', () => {
            if (searchBarFull) {
                if (searchBarFull.style.display === 'none' || searchBarFull.style.display === '') {
                    searchBarFull.style.display = 'flex';
                    searchBarFull.querySelector('input').focus();
                } else {
                    searchBarFull.style.display = 'none';
                }
            }
        });
    }
});