window.addEventListener('load', function () {
  Array.from(document.getElementsByClassName('contact-me')).map(e => e.addEventListener('click', function () {
    const openDate = new Date();
    contactForm(openDate);
  }));
}, { once: true })

function contactForm(openDate) {
  if (!openDate instanceof Date) {
    console.error("Input must be a date object.");
    return;
  }

  let form = `
    <div class="modal">
      <span data-action='close'>ⓧ</span>
      <form name="contact">
        <label for="name">Name</label>
        <input type="text" name="name" required />

        <label for="email">Email</label>
        <input type="email" pattern=".+@.+" name="email" required />

        <label for="company">Company</label>
        <input name="company" />

        <input name="hpf" />

        <label for="message">What can Sam Heuck Web Development do for you?</label>
        <textarea name="message" rows=5 cols=60></textarea>

        <input type="submit" value="Send" />
      </form>
    </div>
  `;

  let fragment = document.createRange().createContextualFragment(form);

  fragment.querySelector('span[data-action="close"').addEventListener('click', function() {
    closeContactForm();
  })

  fragment.querySelector('form').addEventListener('submit', function(evt) {
    evt.preventDefault();
    const submissionDate = new Date();
    submitContactForm(openDate, submissionDate);
  });

  document.getElementById('contact-form').replaceChildren(fragment);
}

function closeContactForm() {
  let formEl = document.getElementById('contact-form');
  formEl.removeChild(formEl.querySelector("div.modal"));
}

function submitContactForm(openDate, submissionDate) {
  const data = new FormData(document.forms.contact);
  const tts = submissionDate - openDate;
  if (tts < 1500) {
    return;
  }

  if ("" !== data.get('hpf')) {
    closeContactForm();
    return;
  }

  //  { name, email, company, message, hpf, tts }
  fetch("https://lco6xjc4wjj5g2ckknlt5xffo40bisys.lambda-url.us-east-1.on.aws/", {
    method: "POST",
    body: JSON.stringify({
      name: data.get('name'),
      email: data.get('email'),
      company: data.get('company'),
      message: data.get('message'),
      hpf: data.get('hpf'),
      tts: tts,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log(res);
    if (res.ok) {
      showSuccess();
    } else {
      showError();
    }

  });
}

function showSuccess() {
  let feedback = `
    <div>
      <p class="success">Thanks! We'll be in touch soon.</p>
    </div>
  `;

  const fragment = document.createRange().createContextualFragment(feedback);
  let parent = document.getElementById('contact-form').querySelector('div.modal');
  parent.removeChild(parent.querySelector("form[name='contact']"));
  parent.appendChild(fragment);
}

function showError() {
  let feedback = `
    <div>
      <p class="error">Sorry! There was an error sending your message. Try again tomorrow.</p>
    </div>
  `;

  const fragment = document.createRange().createContextualFragment(feedback);
  let parent = document.getElementById('contact-form').querySelector('div.modal');
  parent.removeChild(parent.querySelector("form[name='contact']"));
  parent.appendChild(fragment);
}
