document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('cta');
    const orderNowLink = document.getElementById('orderNow');
    const aboutLink = document.getElementById('about');

    // Toggle between day and night mode
    function toggleDayNight() {
        const hour = new Date().getHours();
        document.body.classList.toggle('night', hour >= 18 || hour < 6);
        document.body.classList.toggle('day', hour >= 6 && hour < 18);
    }

    // Event listeners for links
    ctaButton.addEventListener('click', function() {
        alert('Ordering feature not implemented yet.');
    });

    orderNowLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Ordering feature not implemented yet.');
    });

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Learn more about URBN.');
    });

    // Initial check for day or night
    toggleDayNight();
    setInterval(toggleDayNight, 60 * 1000); // Check every minute
});