/* =========================================================
   CAREER PAGE — job openings modal + application form
   NOTE: This is frontend-only. To go live, replace the
   fetch() call inside handleSubmit() with a real endpoint
   (e.g. a serverless function that emails the submission to
   kumarancivil007@gmail.com). No credentials or API keys are
   stored in this file.
   ========================================================= */
(function(){
  "use strict";

  var modal = document.getElementById('applyModal');
  var modalClose = document.getElementById('applyModalClose');
  var applyBtns = document.querySelectorAll('.apply-btn');
  var positionField = document.getElementById('position');

  function openModal(position){
    if(!modal) return;
    if(positionField) positionField.value = position || '';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    if(!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  applyBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      openModal(btn.getAttribute('data-position'));
    });
  });
  if(modalClose){ modalClose.addEventListener('click', closeModal); }
  if(modal){
    modal.addEventListener('click', function(e){
      if(e.target === modal){ closeModal(); }
    });
  }
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ closeModal(); }
  });

  var form = document.getElementById('careerForm');
  if(!form) return;
  var successBox = document.getElementById('careerSuccess');
  var fileInput = document.getElementById('resumeUpload');
  var fileLabel = document.getElementById('resumeFileName');

  if(fileInput){
    fileInput.addEventListener('change', function(){
      fileLabel.textContent = fileInput.files.length ? fileInput.files[0].name : 'Click to upload your resume (PDF or Word)';
    });
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }

    var payload = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      position: form.position.value.trim(),
      qualification: form.qualification.value.trim(),
      experience: form.experience.value.trim(),
      currentLocation: form.currentLocation.value.trim(),
      message: form.message.value.trim(),
      resumeFileName: fileInput && fileInput.files.length ? fileInput.files[0].name : ''
    };

    var submitBtn = form.querySelector('button[type="submit"]');
    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';
    successBox.classList.remove('is-visible', 'is-error');

    /* ---------------------------------------------------
       Backend integration point.
       Replace this block with a real request, e.g.:

       fetch('/api/career-application', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload)
       }).then(...).catch(...);
    --------------------------------------------------- */
    console.log('Career application ready to submit:', payload);

    setTimeout(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      successBox.classList.add('is-visible');
      successBox.textContent = 'Thank you, ' + payload.fullName.split(' ')[0] + '. Your application has been received. We will get back to you if a suitable opportunity comes up.';
      form.reset();
      if(fileLabel) fileLabel.textContent = 'Click to upload your resume (PDF or Word)';
      setTimeout(closeModal, 2200);
    }, 600);
  });
})();
