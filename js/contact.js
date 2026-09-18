/* =========================================================
   CONTACT PAGE — enquiry form
   NOTE: This is frontend-only. To go live, replace the
   fetch() call inside handleSubmit() with a real endpoint
   (e.g. a serverless function that emails the enquiry to
   kumarancivil007@gmail.com). No credentials or API keys are
   stored in this file.
   ========================================================= */
(function(){
  "use strict";

  var form = document.getElementById('enquiryForm');
  if(!form) return;
  var successBox = document.getElementById('enquirySuccess');
  var submitBtn = form.querySelector('button[type="submit"]');

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
      projectType: form.projectType.value,
      location: form.location.value.trim(),
      area: form.area.value.trim(),
      message: form.message.value.trim()
    };

    var originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'SENDING...';
    successBox.classList.remove('is-visible', 'is-error');

    /* ---------------------------------------------------
       Backend integration point.
       Replace this block with a real request, e.g.:

       fetch('/api/enquiry', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload)
       })
       .then(function(res){ if(!res.ok) throw new Error('Request failed'); ... })
       .catch(function(){
         successBox.classList.add('is-visible','is-error');
         successBox.textContent = 'Something went wrong sending your enquiry. Please call or WhatsApp us directly.';
       })
       .finally(function(){ submitBtn.disabled = false; submitBtn.textContent = originalLabel; });
    --------------------------------------------------- */
    console.log('Enquiry ready to submit:', payload);

    setTimeout(function(){
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
      successBox.classList.add('is-visible');
      successBox.textContent = 'Thank you, ' + payload.fullName.split(' ')[0] + '. Your enquiry has been received. Our team will contact you shortly.';
      form.reset();
    }, 600);
  });
})();
