const canvas = document.getElementById("space");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let numStars = 1000;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = (Math.random() - 0.5) * canvas.width;
      this.y = (Math.random() - 0.5) * canvas.height;
      this.z = Math.random() * canvas.width;
    }
    update() {
      this.z -= 10; // speed
      if (this.z <= 0) this.reset();
    }
    draw() {
      let sx = (this.x / this.z) * canvas.width + canvas.width / 2;
      let sy = (this.y / this.z) * canvas.height + canvas.height / 2;
      let r = (1 - this.z / canvas.width) * 3;
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#ff2a2a";
      ctx.fill();
    }
  }

  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();