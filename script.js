document.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('a[href^="#"]');
  const cards = document.querySelectorAll('.card');

  for (const link of links) {
    link.addEventListener('click', smoothScroll);
  }

  window.addEventListener('scroll', showCards);

  function smoothScroll(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth'
    });
  }

  function showCards() {
    cards.forEach(card => {
      if (isVisible(card) && !card.classList.contains('active')) {
        card.classList.add('active');
      }
    });
  }

  function isVisible(element) {
    const elementPosition = element.getBoundingClientRect();
    return elementPosition.top < window.innerHeight;
  }

  // Show cards when page loads if they are already visible
  showCards();
});
