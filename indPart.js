
// PARTICLES.JS INTERACTIVE BACKGROUND
particlesJS("particles-js", {
  particles: {
    number: { value: 240, density: { enable: true, value_area: 800 } },
    color: { value: "#45a9e7" },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2 } },
    size: { value: 2, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#45a9e7",
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});