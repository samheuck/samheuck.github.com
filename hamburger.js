window.addEventListener('load', function () {
  document.getElementById('hamburger').addEventListener('click', function (evt) {
    evt.target.parentNode.querySelector('ul').classList.toggle('show');
  });

  this.document.getElementById('nav-main').querySelector("span[data-action='close']").addEventListener('click', function (evt) {
    evt.target.parentNode.classList.remove('show');
  })

  // Close the menu when clicking outside it (ignoring clicks on the hamburger itself,
  // so opening it doesn't immediately get closed by this same click).
  document.addEventListener('click', function (evt) {
    var menu = document.getElementById('nav-main').querySelector('ul');
    var hamburger = document.getElementById('hamburger');
    if (menu.classList.contains('show')
        && !menu.contains(evt.target)
        && !hamburger.contains(evt.target)) {
      menu.classList.remove('show');
    }
  });
})
