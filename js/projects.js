/* =========================================================
   PROJECTS PAGE — data, filter tabs, card rendering, modal
   Add new projects by pushing another object into PROJECTS.

   NOTE ON IMAGES: the URLs below are stock photography used
   as placeholders only. Cards and the modal are labelled
   "REPRESENTATIVE IMAGE" so they are never presented as real
   site photographs. Replace each project's `images` array
   with actual project photos (see assets/images/projects/...)
   and remove the img-note span in the markup below once real
   photos are in place.
   ========================================================= */
(function(){
  "use strict";

  /* ---- Project data ------------------------------------
     status: "completed" | "ongoing"
     images: array of image paths — first image is used on the card
  --------------------------------------------------------- */
  var PROJECTS = [
    {
      id: 1,
      client: "Mr. Karthikeyan",
      title: "Mr. Karthikeyan Residence",
      location: "Pallavaram, Chennai",
      address: "",
      category: "Residential Construction",
      status: "completed",
      images: [
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: 2,
      client: "Mr. Sekar",
      title: "Mr. Sekar Residence",
      location: "Pallavaram, Chennai",
      address: "",
      category: "Residential Construction",
      status: "completed",
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop"
      ]
    },
    {
      id: 3,
      client: "Mr. Durairaj",
      title: "Mr. Durairaj Residence",
      location: "Polichalur, Chennai",
      address: "Manimegalai Street",
      category: "Residential Construction",
      status: "ongoing",
      images: [
        "https://images.unsplash.com/photo-1541976590-713941681591?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"
      ]
    }
  ];

  var grid = document.getElementById('projectsGrid');
  var tabs = document.querySelectorAll('.filter-btn');
  var overlay = document.getElementById('projectModal');
  var modalClose = document.getElementById('modalClose');

  function badgeMarkup(status){
    if(status === 'completed'){
      return '<span class="badge badge--completed">COMPLETED</span>';
    }
    return '<span class="badge badge--ongoing">ONGOING</span>';
  }

  function cardMarkup(p){
    return (
      '<article class="project-card reveal is-visible" data-id="' + p.id + '">' +
        '<div class="project-card-media">' +
          '<img src="' + p.images[0] + '" alt="Representative residential construction image">' +
          '<span class="img-note">REPRESENTATIVE IMAGE</span>' +
          badgeMarkup(p.status) +
        '</div>' +
        '<div class="project-card-body">' +
          '<h3>' + p.client + ' — ' + p.location.split(',')[0] + '</h3>' +
          '<p class="project-category">' + p.category + '</p>' +
          '<p class="project-location">📍 ' + p.location + '</p>' +
          '<button class="project-card-view" type="button">VIEW PROJECT <span class="arrow">&rarr;</span></button>' +
        '</div>' +
      '</article>'
    );
  }

  function renderProjects(status){
    if(!grid) return;
    grid.classList.add('is-fading');
    setTimeout(function(){
      var filtered = PROJECTS.filter(function(p){ return p.status === status; });
      grid.innerHTML = filtered.map(cardMarkup).join('');
      grid.setAttribute('data-empty', filtered.length === 0 ? 'true' : 'false');
      grid.classList.remove('is-fading');
      bindCardEvents();
    }, 180);
  }

  function bindCardEvents(){
    grid.querySelectorAll('.project-card').forEach(function(card){
      card.querySelector('.project-card-view').addEventListener('click', function(){
        var id = parseInt(card.getAttribute('data-id'), 10);
        openModal(id);
      });
    });
  }

  /* ---- Tabs ---- */
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected','true');
      renderProjects(tab.getAttribute('data-filter'));
    });
  });

  /* ---- Modal ---- */
  var galleryIndex = 0;
  var currentProject = null;

  function openModal(id){
    currentProject = PROJECTS.filter(function(p){ return p.id === id; })[0];
    if(!currentProject) return;
    galleryIndex = 0;
    renderModal();
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function renderModal(){
    var p = currentProject;
    var galleryImgs = p.images.map(function(src, i){
      return '<img src="' + src + '" alt="Representative construction image ' + (i+1) + '" class="' + (i === galleryIndex ? 'is-active' : '') + '" data-i="' + i + '">';
    }).join('');
    var dots = p.images.map(function(_, i){
      return '<button class="modal-gallery-dot ' + (i === galleryIndex ? 'is-active' : '') + '" data-i="' + i + '" aria-label="Show photo ' + (i+1) + '"></button>';
    }).join('');
    var arrows = p.images.length > 1 ? (
      '<button class="modal-gallery-arrow modal-gallery-prev" aria-label="Previous photo">&larr;</button>' +
      '<button class="modal-gallery-arrow modal-gallery-next" aria-label="Next photo">&rarr;</button>'
    ) : '';

    document.getElementById('modalGallery').innerHTML = galleryImgs + '<span class="img-note">REPRESENTATIVE IMAGES — ACTUAL SITE PHOTOS TO BE ADDED</span>' + arrows + '<div class="modal-gallery-nav">' + dots + '</div>';

    var galleryEl = document.getElementById('modalGallery');
    var prevBtn = galleryEl.querySelector('.modal-gallery-prev');
    var nextBtn = galleryEl.querySelector('.modal-gallery-next');
    if(prevBtn){
      prevBtn.addEventListener('click', function(){
        galleryIndex = (galleryIndex - 1 + p.images.length) % p.images.length;
        renderModal();
      });
    }
    if(nextBtn){
      nextBtn.addEventListener('click', function(){
        galleryIndex = (galleryIndex + 1) % p.images.length;
        renderModal();
      });
    }

    document.getElementById('modalBody').innerHTML =
      '<span class="modal-badge ' + (p.status === 'ongoing' ? 'ongoing' : '') + '">' + p.status.toUpperCase() + '</span>' +
      '<h3>' + p.title + '</h3>' +
      '<div class="modal-meta">' +
        '<div><span class="m-label">CLIENT</span><span class="m-value">' + p.client + '</span></div>' +
        '<div><span class="m-label">LOCATION</span><span class="m-value">' + p.location + '</span></div>' +
        (p.address ? '<div><span class="m-label">STREET / ADDRESS</span><span class="m-value">' + p.address + '</span></div>' : '') +
        '<div><span class="m-label">CATEGORY</span><span class="m-value">' + p.category + '</span></div>' +
        '<div><span class="m-label">STATUS</span><span class="m-value">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span></div>' +
      '</div>';

    document.getElementById('modalGallery').querySelectorAll('.modal-gallery-dot').forEach(function(dot){
      dot.addEventListener('click', function(){
        galleryIndex = parseInt(dot.getAttribute('data-i'), 10);
        renderModal();
      });
    });
  }

  if(modalClose){ modalClose.addEventListener('click', closeModal); }
  if(overlay){
    overlay.addEventListener('click', function(e){
      if(e.target === overlay){ closeModal(); }
    });
  }
  document.addEventListener('keydown', function(e){
    if(!overlay.classList.contains('is-open')) return;
    if(e.key === 'Escape'){ closeModal(); }
    if(e.key === 'ArrowLeft' && currentProject && currentProject.images.length > 1){
      galleryIndex = (galleryIndex - 1 + currentProject.images.length) % currentProject.images.length;
      renderModal();
    }
    if(e.key === 'ArrowRight' && currentProject && currentProject.images.length > 1){
      galleryIndex = (galleryIndex + 1) % currentProject.images.length;
      renderModal();
    }
  });

  /* ---- Init ---- */
  var params = new URLSearchParams(window.location.search);
  var initialFilter = params.get('filter') === 'ongoing' ? 'ongoing' : 'completed';
  tabs.forEach(function(t){
    t.classList.toggle('is-active', t.getAttribute('data-filter') === initialFilter);
    t.setAttribute('aria-selected', t.getAttribute('data-filter') === initialFilter ? 'true' : 'false');
  });
  renderProjects(initialFilter);
})();
