document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById('cards-container');
  const filterButtons = document.querySelectorAll('.filter-button');
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message';
  messageContainer.textContent = 'No hay ninguna página que mostrar en este momento.';
  cardsContainer.appendChild(messageContainer);

  fetch('https://raw.githubusercontent.com/JollyJolli/json-db/main/data/webs/web-places.json')
    .then(response => response.json())
    .then(data => {
      showCards(data.Webs); // Mostrar todas las tarjetas al principio
      showCardsWithAnimation(); // Mostrar las tarjetas con animación inicialmente

      // Agregar evento de clic a los botones de filtro
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filterValue = button.dataset.filter;
          filterCards(data.Webs, filterValue);
          updateActiveButton(button);
          showCardsWithAnimation(); // Mostrar las tarjetas con animación después de filtrar
        });
      });

      // Agregar evento de scroll para mostrar las tarjetas
      window.addEventListener('scroll', throttle(showCardsWithAnimation, 200));
    });

  function showCards(webs) {
    cardsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar tarjetas

    if (webs.length === 0) {
      messageContainer.style.display = 'block';
    } else {
      messageContainer.style.display = 'none';
      webs.forEach(web => {
        const card = createCardElement(web);
        cardsContainer.appendChild(card);
      });
    }
  }

  function createCardElement(web) {
    const card = document.createElement('div');
    card.className = 'card';
    if (web.nueva) {
      card.classList.add('bright-card');
    }
    if (web.act) {
      card.classList.add('updated-card');
    }

    card.innerHTML = `
      <div class="card-content">
        <h2><a href="${web.link}" title="Ir a la web de ${web.titulo}"><i class="${web.icon}"></i> ${web.titulo}</a></h2>
        <p>${web.descripcion}</p>
      </div>
      ${web.nueva ? '<div class="label-container"><span class="new-label">Nuevo</span></div>' : ''}
      ${web.act ? '<div class="label-container"><span class="updated-label">Actualizado</span></div>' : ''}
    `;

    return card;
  }

  function showCardsWithAnimation() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      if (isVisible(card) && !card.classList.contains('active')) {
        card.classList.add('active');
        card.style.transitionDelay = `${Math.random() * 0.5}s`; // Añadir un retraso aleatorio para efecto escalonado
      }
    });
  }

  function filterCards(webs, filterValue) {
    let filteredWebs = webs;

    if (filterValue === 'new') {
      filteredWebs = webs.filter(web => web.nueva === true);
    } else if (filterValue === 'updated') {
      filteredWebs = webs.filter(web => web.act === true);
    }

    showCards(filteredWebs);
  }

  function updateActiveButton(activeButton) {
    filterButtons.forEach(button => {
      button.classList.remove('active');
    });
    activeButton.classList.add('active');
  }

  function isVisible(element) {
    const elementPosition = element.getBoundingClientRect();
    return elementPosition.top < window.innerHeight && elementPosition.bottom >= 0;
  }

  function throttle(func, wait) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  }
});
