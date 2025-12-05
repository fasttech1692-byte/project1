
(function(){
  const form = document.getElementById('contact-form');
  const statusEl = document.querySelector('.form-status');

  function setError(id, msg){
    const el = document.querySelector(`small.error[data-for="${id}"]`);
    if(el) el.textContent = msg || '';
  }

  function validate(){
    let ok = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if(!name.value.trim()){ setError('name','Please enter your name'); ok = false; } else setError('name','');
    if(!email.value.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)){ setError('email','Please enter a valid email'); ok = false; } else setError('email','');
    if(!message.value.trim()){ setError('message','Please tell us about your project'); ok = false; } else setError('message','');
    return ok;
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    statusEl.textContent = '';
    if(!validate()) return;

    const data = new FormData(form);
    try {
      const resp = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      if(resp.ok){
        form.reset();
        statusEl.textContent = 'Thanks! Your message has been sent.';
      } else {
        statusEl.textContent = 'Sorry, something went wrong. Please try again.';
      }
    } catch(err){
      statusEl.textContent = 'Network error. Please try again later.';
    }
  });
})();
