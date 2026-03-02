(function() {
  // First hand in the about section
  var aboutSection = document.getElementById('about');
  var aboutHand = aboutSection ? aboutSection.querySelector('.about-hand') : null;
  if (!aboutSection || !aboutHand) return;

  // Initial state: small and invisible
  aboutHand.style.transform = 'scale(0.3)';
  aboutHand.style.opacity = '0';
  aboutHand.style.transition = 'transform 1.2s ease, opacity 1.2s ease';

  var hasAnimated = false;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting || hasAnimated) return;
      hasAnimated = true;

      // Animate to full size and fully visible
      requestAnimationFrame(function() {
        aboutHand.style.transform = 'scale(1)';
        aboutHand.style.opacity = '1';
      });

      observer.unobserve(aboutSection);
    });
  }, {
    threshold: 0.3
  });

  observer.observe(aboutSection);
})();

(function() {
  var parallaxWrap = document.querySelector('.parallax-pink-wrap');
  var hand = document.querySelector('.book-hand-deco');
  if (!parallaxWrap || !hand) return;

  var startDeg = 55;
  var ticking = false;

  function setHandProgress(progress) {
    progress = Math.max(0, Math.min(1, progress));
    var deg = startDeg * (1 - progress);
    var opacity = progress;
    hand.style.transform = 'rotate(' + deg + 'deg)';
    hand.style.opacity = opacity;
  }

  function update() {
    ticking = false;
    var rect = parallaxWrap.getBoundingClientRect();
    var vh = window.innerHeight;
    var sectionH = parallaxWrap.offsetHeight;
    var visibleStart = vh + vh * 0.4;
    var visibleEnd = 120;
    if (rect.top >= visibleStart) {
      setHandProgress(0);
      return;
    }
    if (rect.top <= visibleEnd) {
      setHandProgress(1);
      return;
    }
    var progress = 1 - (rect.top - visibleEnd) / (visibleStart - visibleEnd);
    setHandProgress(progress);
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  setHandProgress(0);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  requestAnimationFrame(function() { requestAnimationFrame(update); });
})();
