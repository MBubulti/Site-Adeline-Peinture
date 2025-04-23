emailjs.init('userID'); // Ajouter le User ID
let formStart = Date.now();
document
  .querySelector('.contact__form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    if (document.getElementById('honeypot').value !== '') {
      alert('Spam détecté !');
      return;
    }
    let timeElapsed = (Date.now() - formStart) / 1000;
    if (timeElapsed < 5) {
      alert('Spam détecté !');
      return;
    }

    const infosForm = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      tel: document.getElementById('phone').value,
      message: document.getElementById('message').value,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(infosForm.email)) {
      alert('Veuillez saisir une adresse e-mail valide.');
      return;
    }
    // A ajouter le service ID template ID
    emailjs.send('serviceID', 'templateID', infosForm).then(
      function (response) {
        alert('Message envoyé avec succès !');
        document.querySelector('.contact__form').reset();
      },
      function (error) {
        alert("Erreur lors de l'envoi du message : " + error.text);
      }
    );
  });

//Gestion de la galerie
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.galerie__container img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let current = 0;

  function updateGallery() {
    const total = images.length;

    const prevIndex = (current - 1 + total) % total;
    const nextIndex = (current + 1) % total;

    images.forEach((img, i) => {
      img.classList.remove('active', 'visible', 'left', 'right');
    });

    images[prevIndex].classList.add('visible', 'left');
    images[current].classList.add('visible', 'active');
    images[nextIndex].classList.add('visible', 'right');
  }

  prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    updateGallery();
  });

  nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    updateGallery();
  });

  updateGallery();
});

//Gestion de la modale mentions légales
const modal = document.getElementById('mentions__modal');
const openModal = document.querySelector('.open__mentions');
const closeModal = document.querySelector('.fa-xmark');

openModal.addEventListener('click', function () {
  modal.classList.add('active');
  modal.classList.remove('hidden');
});
closeModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  modal.classList.remove('active');
});
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.classList.add('hidden');
    modal.classList.remove('active');
  }
});
