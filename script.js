document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  const cards = document.querySelectorAll('.card');

  for (const link of links) {
    link.addEventListener('click', smoothScroll);
  }

  window.addEventListener('scroll', throttle(showCards, 200));

  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  }

  function showCards() {
    cards.forEach(card => {
      if (card && isVisible(card) && !card.classList.contains('active')) {
        card.classList.add('active');
      }
    });
  }

  function isVisible(element) {
    const elementPosition = element.getBoundingClientRect();
    return elementPosition.top < window.innerHeight && elementPosition.bottom >= 0;
  }

  // Throttle function to limit the number of times `showCards` is called while scrolling
  function throttle(func, wait) {
    let context, args, result;
    let timeout = null;
    let previous = 0;

    const later = function() {
      previous = Date.now();
      timeout = null;
      result = func.apply(context, args);
    };

    return function() {
      const now = Date.now();
      const remaining = wait - (now - previous);

      context = this;
      args = arguments;

      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        result = func.apply(context, args);
        previous = now;
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }

      return result;
    };
  }

  // Show cards when page loads if they are already visible
  showCards();
});
