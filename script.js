document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById('cards-container');
  fetch('webs.json')
    .then(response => response.json())
    .then(data => {
      data.Webs.forEach(web => {
        const card = document.createElement('div');
        card.className = 'card';
        if (web.nueva) {
          card.classList.add('bright-card');
        }

        card.innerHTML = `
          <div class="card-content">
            <h2><a href="${web.link}" title="Ir a la web de ${web.titulo}"><i class="${web.icon}"></i> ${web.titulo}</a></h2>
            <p>${web.descripcion}</p>
          </div>
          ${web.nueva ? '<div class="label-container"><span class="new-label">Nuevo</span></div>' : ''}
        `;

        cardsContainer.appendChild(card);
      });

      // Show cards when page loads if they are already visible
      showCards();

      // Add scroll event listener for lazy loading cards
      window.addEventListener('scroll', throttle(showCards, 200));
    });

  function showCards() {
    const cards = document.querySelectorAll('.card');
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
});
