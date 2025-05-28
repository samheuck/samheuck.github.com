window.addEventListener('load', function () {
  document.getElementById('hamburger').addEventListener('click', function (evt) {
    evt.target.parentNode.querySelector('ul').classList.add('show');
  });

  this.document.getElementById('nav-main').querySelector("span[data-action='close']").addEventListener('click', function (evt) {
    evt.target.parentNode.classList.remove('show');
  })
})
