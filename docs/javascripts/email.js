// Assemble the mailto address at runtime to avoid exposing it to scrapers.
document.addEventListener('DOMContentLoaded', function () {
  var link = document.querySelector('.email-link');
  if (!link) return;
  var addr = link.dataset.user + '@' + link.dataset.domain;
  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'mailto:' + addr;
  });
});
