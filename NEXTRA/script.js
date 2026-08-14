// ========================================
// NEXTRA - INTERACTION LOGIC (LIVE MARKET UPGRADE)
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Smooth 3D tilt interaction for cards
    const cards = document.querySelectorAll(".action-card, .btn-primary, .process-item");

    cards.forEach((card) => {
        // Only apply 3D effect on desktop to avoid weird mobile touch behavior
        if (window.innerWidth > 768) {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element.
                const y = e.clientY - rect.top;  // y position within the element.
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -5; // max 5 degrees
                const rotateY = ((x - centerX) / centerX) * 5;  // max 5 degrees

                card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                card.style.transition = "transform 0.1s ease";
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) scale(1) rotateX(0) rotateY(0)";
                card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
            });
            
            card.addEventListener("mousedown", () => {
                card.style.transform = "perspective(1000px) scale(0.98) rotateX(0) rotateY(0)";
            });

            card.addEventListener("mouseup", () => {
                card.style.transform = "perspective(1000px) scale(1.02) rotateX(0) rotateY(0)";
            });
        }
    });

    // Parallax effect for background elements (Trading Chart & Glows)
    document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const grid = document.querySelector(".background-grid");
        if (grid) {
            grid.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
        }

        const chart = document.querySelector(".bg-chart");
        if (chart) {
            // Chart moves opposite to mouse for depth
            chart.style.transform = `translate(-50%, -50%) translate(${mouseX * -30}px, ${mouseY * -30}px)`;
        }

        const glowOne = document.querySelector(".glow-one");
        const glowTwo = document.querySelector(".glow-two");
        const glowThree = document.querySelector(".glow-three");

        if (glowOne) glowOne.style.transform = `translate(${mouseX * -40}px, ${mouseY * -40}px)`;
        if (glowTwo) glowTwo.style.transform = `translate(${mouseX * 35}px, ${mouseY * 35}px)`;
        if (glowThree) glowThree.style.transform = `translate(-50%, -50%) translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    });

    // Generate Floating Live Market Prices
    const pairs = [
        { name: "XAUUSD", price: 2345.50, spread: 2.5 },
        { name: "EURUSD", price: 1.0845, spread: 0.001 },
        { name: "GBPUSD", price: 1.2673, spread: 0.0012 },
        { name: "USDJPY", price: 154.32, spread: 0.05 },
        { name: "BTCUSD", price: 64230.00, spread: 15.0 },
        { name: "US30", price: 39500.00, spread: 10.0 }
    ];

    function createFloatingPrice() {
        const el = document.createElement("div");
        const pair = pairs[Math.floor(Math.random() * pairs.length)];
        const isUp = Math.random() > 0.5;
        const change = (Math.random() * pair.spread).toFixed(4); // Use 4 decimals for subtle changes
        
        el.className = `floating-price ${isUp ? 'price-up' : 'price-down'}`;
        el.innerHTML = `${pair.name} <span>${pair.price}</span> ${isUp ? '▲' : '▼'}`;
        
        el.style.left = `${Math.random() * 90}vw`;
        el.style.top = `${Math.random() * 90}vh`;
        el.style.animationDuration = `${10 + Math.random() * 15}s`;
        
        document.body.appendChild(el);
        
        setTimeout(() => {
            el.remove();
        }, 25000); // Remove after animation
    }

    // Spawn floating prices slowly in the background
    setInterval(createFloatingPrice, 3000);
    // Initial spawn
    for(let i=0; i<4; i++) {
        setTimeout(createFloatingPrice, i * 800);
    }
});
