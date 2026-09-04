window.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.parallax-container');
    const sections = document.querySelectorAll('.parallax-item');
    const images = document.querySelectorAll('.section-image');
    
    // Add fade-in effect for images when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    images.forEach(image => {
        observer.observe(image);
    });
    
    // Parallax effect on scroll
    container.addEventListener('scroll', function() {
        const scrollPosition = container.scrollTop;
        
        sections.forEach(section => {
            const speed = parseFloat(section.getAttribute('data-speed')) || 0.5;
            const yPos = -(scrollPosition * speed);
            section.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Set different parallax speeds for each section
    document.getElementById('creation').setAttribute('data-speed', '0.5');
    document.getElementById('fall').setAttribute('data-speed', '0.4');
    document.getElementById('noah').setAttribute('data-speed', '0.3');
    document.getElementById('abraham').setAttribute('data-speed', '0.25');
    document.getElementById('moses').setAttribute('data-speed', '0.2');
    document.getElementById('kingdom').setAttribute('data-speed', '0.15');
    document.getElementById('prophets').setAttribute('data-speed', '0.1');
    document.getElementById('birth').setAttribute('data-speed', '0.08');
    document.getElementById('ministry').setAttribute('data-speed', '0.06');
    document.getElementById('crucifixion').setAttribute('data-speed', '0.04');
    document.getElementById('pentecost').setAttribute('data-speed', '0.03');
    document.getElementById('spread').setAttribute('data-speed', '0.02');
    document.getElementById('revelation').setAttribute('data-speed', '0.01');
});

function showMore(sectionId) {
    const moreInfo = document.getElementById(sectionId + 'More');
    if (moreInfo) {
        moreInfo.style.display = moreInfo.style.display === 'none' ? 'block' : 'none';
    }
}