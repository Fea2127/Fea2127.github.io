window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    const creation = document.getElementById('creation');
    const fall = document.getElementById('fall');
    const noah = document.getElementById('noah');
    const abraham = document.getElementById('abraham');
    const moses = document.getElementById('moses');
    const kingdom = document.getElementById('kingdom');
    const prophets = document.getElementById('prophets');
    const birth = document.getElementById('birth');
    const ministry = document.getElementById('ministry');
    const crucifixion = document.getElementById('crucifixion');
    const pentecost = document.getElementById('pentecost');
    const spread = document.getElementById('spread');
    const revelation = document.getElementById('revelation');

    // Apply parallax effect with requestAnimationFrame for smoother animation
    requestAnimationFrame(() => {
        creation.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        fall.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        noah.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        abraham.style.transform = `translateY(${scrollPosition * 0.15}px)`;
        moses.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        kingdom.style.transform = `translateY(${scrollPosition * 0.08}px)`;
        prophets.style.transform = `translateY(${scrollPosition * 0.06}px)`;
        birth.style.transform = `translateY(${scrollPosition * 0.04}px)`;
        ministry.style.transform = `translateY(${scrollPosition * 0.03}px)`;
        crucifixion.style.transform = `translateY(${scrollPosition * 0.02}px)`;
        pentecost.style.transform = `translateY(${scrollPosition * 0.01}px)`;
        spread.style.transform = `translateY(${scrollPosition * 0.008}px)`;
        revelation.style.transform = `translateY(${scrollPosition * 0.005}px)`;
    });
});

// Add fade-in effect for images when they come into view
window.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.section-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, { threshold: 0.5 });
    
    images.forEach(image => {
        observer.observe(image);
    });
});