document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // İstediğin oyun resimlerinin URL'lerini buraya ekle
    // Eğer kendi resimlerin varsa onları da kullanabilirsin
    const images = [
        'https://via.placeholder.com/1200x500?text=Oyun+1+-+Aksiyon',
        'https://via.placeholder.com/1200x500?text=Oyun+2+-+Strateji',
        'https://via.placeholder.com/1200x500?text=Oyun+3+-+Macera',
        'https://via.placeholder.com/1200x500?text=Oyun+4+-+RPG'
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