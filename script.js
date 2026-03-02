(function() {
  var aboutSection = document.getElementById('about');
  var aboutHand = aboutSection ? aboutSection.querySelector('.about-hand') : null;
  if (!aboutSection || !aboutHand) return;

  // No transition — scroll directly drives the animation
  aboutHand.style.transition = 'none';

  // Start under the 3 images: further left, smaller, rotated in
  var startX = -92;
  var endX = -50;
  var startScale = 0.25;
  var endScale = 1;
  var startRotate = 22;
  var endRotate = -30;
  var endOpacity = 0.88;

  function setAboutHandProgress(progress) {
    progress = Math.max(0, Math.min(1, progress));
    var x = startX + (endX - startX) * progress;
    var scale = startScale + (endScale - startScale) * progress;
    var rot = startRotate + (endRotate - startRotate) * progress;
    var opacity = endOpacity * progress;
    aboutHand.style.transform = 'translateX(' + x + '%) scale(' + scale + ') rotate(' + rot + 'deg)';
    aboutHand.style.opacity = opacity;
  }

  function updateAbout() {
    ticking = false;
    var rect = aboutSection.getBoundingClientRect();
    var vh = window.innerHeight;
    var visibleStart = vh + vh * 0.35;
    var visibleEnd = 100;
    if (rect.top >= visibleStart) {
      setAboutHandProgress(0);
      return;
    }
    if (rect.top <= visibleEnd) {
      setAboutHandProgress(1);
      return;
    }
    var progress = 1 - (rect.top - visibleEnd) / (visibleStart - visibleEnd);
    setAboutHandProgress(progress);
  }

  var ticking = false;
  function onScrollAbout() {
    if (!ticking) {
      requestAnimationFrame(updateAbout);
      ticking = true;
    }
  }

  setAboutHandProgress(0);
  window.addEventListener('scroll', onScrollAbout, { passive: true });
  window.addEventListener('resize', updateAbout);
  window.addEventListener('load', updateAbout);
  requestAnimationFrame(function() { requestAnimationFrame(updateAbout); });
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
