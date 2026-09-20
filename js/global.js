/* =========================================================
   AKSHAY CONSTRUCTION — GLOBAL BEHAVIOUR
   Navbar scroll state, mobile drawer, scroll-reveal.
   ========================================================= */
(function(){
  "use strict";

  var navbar = document.querySelector('.navbar');
  var isHome = document.body.classList.contains('page-home');

  function onScroll(){
    if(!navbar) return;
    if(window.scrollY > 40){
      navbar.classList.add('is-scrolled');
    } else if (isHome){
      navbar.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* Floating "ENQUIRE NOW" widget */
  var fwWidget = document.getElementById('floatingWidget');
  var fwToggle = document.getElementById('fwToggle');
  if(fwWidget && fwToggle){
    fwToggle.addEventListener('click', function(e){
      e.stopPropagation();
      var isOpen = fwWidget.classList.toggle('is-open');
      fwToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function(e){
      if(fwWidget.classList.contains('is-open') && !fwWidget.contains(e.target)){
        fwWidget.classList.remove('is-open');
        fwToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && fwWidget.classList.contains('is-open')){
        fwWidget.classList.remove('is-open');
        fwToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Mobile drawer */
  var hamburger = document.querySelector('.hamburger');
  var drawer = document.querySelector('.mobile-drawer');
  var overlay = document.querySelector('.drawer-overlay');
  var closeBtn = document.querySelector('.drawer-close');

  function openDrawer(){
    hamburger.classList.add('is-open');
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer(){
    hamburger.classList.remove('is-open');
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if(hamburger && drawer){
    hamburger.addEventListener('click', function(){
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
    overlay.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeDrawer);
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* Animated counters (About page experience stats) */
  var counters = document.querySelectorAll('[data-counter]');
  if(counters.length && 'IntersectionObserver' in window){
    var counterIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var el = entry.target;
        var target = el.getAttribute('data-counter');
        var numeric = parseInt(target.replace(/[^\d]/g,''), 10);
        var prefix = target.match(/^[^\d]*/)[0];
        var suffix = target.match(/[^\d]*$/)[0];
        var current = 0;
        var duration = 1200;
        var startTime = null;
        function step(ts){
          if(!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          current = Math.floor(progress * numeric);
          el.textContent = prefix + current + suffix;
          if(progress < 1){ requestAnimationFrame(step); }
          else { el.textContent = target; }
        }
        requestAnimationFrame(step);
        counterIO.unobserve(el);
      });
    }, { threshold:0.4 });
    counters.forEach(function(el){ counterIO.observe(el); });
  }

  /* ---------------------------------------------------------
     Client Reviews
     These are the actual Akshay Construction clients/projects on
     record. No verified written review or star rating has been
     collected from them yet, so `review` and `rating` are left
     empty/null rather than inventing testimonial text. A card only
     renders once a client has real `review` text; until then the
     grid shows one polished, intentional notice instead of empty
     card shells. Add verified text/rating here as it is collected
     and the matching review card will render automatically.
     --------------------------------------------------------- */
var clientReviews = [
  { client: "Mr. Karthikeyan", location: "Pallavaram", project: "Residential Construction", review: "Akshay Constructions did an excellent job with our home construction. From the initial planning to the final finishing, the team was professional, responsive, and focused on quality. We are very happy with how our dream home turned out", rating: 5 },
  { client: "Mr. Sekar", location: "Pallavaram", project: "Residential Construction", review: "We were impressed with the quality of materials and the attention to detail throughout the construction. The team maintained good coordination at every stage and made sure the work was completed properly", rating: 5},
  { client: "Mr. Ashok", location: "Guindy", project: "Apartment Construction", review: "Akshay Constructions completely transformed our existing house through their renovation work. The team was organized, transparent, and careful about every detail. The final result looks modern and fresh.", rating: 5 },
  { client: "Mr. Sathish", location: "Guduvanchery", project: "Interior Design", review: "The interior work gave our home a completely new look. The designs were elegant and practical, and the team paid close attention to our preferences and budget. We are extremely happy with the overall finish.", rating: 5},
   { client: "Mr. Srinivasan", location: "Pattinapakkam", project: "On Time Delivery", review:"What we appreciated most was the team's commitment to completing the work on schedule. They kept us updated throughout the project and handled the construction process in a professional manner", rating: 5},
    { client: "Mr. Madhan", location: "ECR", project: "Complete Experience", review:"From planning and design to construction and handover, the entire experience was smooth and well coordinated. The team was approachable whenever we had questions and maintained good communication throughout the project.", rating: 5}  

];
  var reviewGrid = document.getElementById('review-grid');
  if (reviewGrid) {
    var reviewsWithText = clientReviews.filter(function (r) { return r.review && r.review.trim().length > 0; });

    if (reviewsWithText.length === 0) {
      reviewGrid.innerHTML =
        '<div class="review-empty">' +
          '<p class="review-empty-lead">We are building long-term relationships through quality construction, clear communication and professional execution.</p>' +
          '<p class="review-empty-sub">Client stories will be updated with verified feedback.</p>' +
          '<a href="contact.html" class="btn btn--gold btn--sm">START YOUR PROJECT &rarr;</a>' +
        '</div>';
    } else {
      reviewGrid.innerHTML = reviewsWithText.map(function (r) {
        var starsHtml = r.rating
          ? '<div class="review-stars">' + '★★★★★'.slice(0, r.rating) + '</div>'
          : '';
        return (
          '<div class="review-card">' +
            starsHtml +
           
            '<p class="review-text">' + r.review + '</p>' +
            '<div class="review-foot">' +
              '<div class="review-name">' + r.client + '</div>' +
              '<div class="review-location">' + r.location + '</div>' +
              (r.project ? '<div class="review-project">' + r.project + '</div>' : '') +
            '</div>' +
          '</div>'
        );
      }).join('');
    }
  }

  /* Image error fallback — catches any image that fails to load
     (broken URL, offline asset, etc.) and swaps the browser's
     broken-image icon + alt text for a styled placeholder instead
     of letting it disrupt the layout. */
  document.querySelectorAll('img').forEach(function(img){
    img.addEventListener('error', function(){
      var wrap = img.closest('.service-card-media, .service-block-media, .project-card-media, .about-preview-media, .founder-portrait-wrap');
      (wrap || img.parentElement || img).classList.add('img-fallback');
    });
  });

  /* FAQ accordion (used on Services / Career pages) */
  document.querySelectorAll('.accordion-item').forEach(function(item){
    var trigger = item.querySelector('.accordion-trigger');
    if(!trigger) return;
    trigger.addEventListener('click', function(){
      var isOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.accordion-item').forEach(function(i){
        i.classList.remove('is-open');
      });
      if(!isOpen){ item.classList.add('is-open'); }
    });
  });

})();
