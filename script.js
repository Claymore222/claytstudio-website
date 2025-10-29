document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // İstediğin oyun resimlerinin URL'lerini buraya ekle
    // Eğer kendi resimlerin varsa onları da kullanabilirsin
    const images = [
        'https://placehold.co/1200x500?text=Oyun+1+-+Aksiyon',
        'https://placehold.co/1200x500?text=Oyun+2+-+Strateji',
        'https://placehold.co/1200x500?text=Oyun+3+-+Macera',
        'https://placehold.co/1200x500?text=Oyun+4+-+RPG'
    ];

    let currentIndex = 0;

    function createSliderImages() {
        sliderContainer.innerHTML = ''; // Öncekileri temizle
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            sliderContainer.appendChild(img);
        });
    }

    function updateSlider() {
        const offset = -currentIndex * sliderContainer.offsetWidth;
        sliderContainer.style.transform = `translateX(${offset}px)`;
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    }

    createSliderImages();
    updateSlider();

    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);

    // Otomatik slider (isteğe bağlı)
    // setInterval(showNextImage, 5000); // Her 5 saniyede bir resim değiştir

    // Pencere boyutu değiştiğinde slider'ı güncelle
    window.addEventListener('resize', updateSlider);
});

/* ========================================= */
/* PROJELER SAYFASI İNTERAKTİF KODLARI */
/* ========================================= */

// Bu kodların sadece Projeler sayfasında çalışmasını garantilemek için
// (Diğer sayfalarda .filter-nav olmadığı için hata vermez)
document.addEventListener('DOMContentLoaded', () => {

    // --- FİLTRELEME KODU ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card-interactive');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Aktif butonu ayarla
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Kartları filtrele
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filter === 'tumu' || filter === category) {
                        card.style.display = 'block';
                        card.classList.remove('hidden');
                    } else {
                        // card.style.display = 'none'; // Animasyon için bunu kullanmıyoruz
                        card.classList.add('hidden');
                        
                        // Animasyon bittikten sonra gizle (daha pürüzsüz)
                        setTimeout(() => {
                           if (card.classList.contains('hidden')) {
                               card.style.display = 'none';
                           }
                        }, 300); // CSS'teki transition süresiyle aynı olmalı
                    }
                });
            });
        });
    }


    // --- MODAL (POP-UP) KODU ---
    const openModalButtons = document.querySelectorAll('.btn-details');
    const closeModalButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');

    // Açma butonları
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // Kapatma butonları
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-close');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Modalın dışına tıklayınca kapatma
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

});