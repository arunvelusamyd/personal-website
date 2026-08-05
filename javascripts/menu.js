// Injects a consistent top menu bar on every page.
// Uses MkDocs' per-page `base_url` global so links resolve correctly
// whether the site is served at the root or under a subpath.
(function () {
  function build() {
    var base = (typeof base_url !== 'undefined' ? base_url : '.').replace(/\/+$/, '');
    var here = window.location.pathname.replace(/\/+$/, '');

    var items = [
      { label: 'Blogs', path: 'blogs' },
      { label: 'News', path: 'news' },
      { label: 'Apps', path: 'apps' },
      { label: 'Requests', path: 'requests' }
    ];

    var nav = document.createElement('nav');
    nav.className = 'site-menu';

    var inner = document.createElement('div');
    inner.className = 'site-menu-inner';

    var brand = document.createElement('a');
    brand.className = 'site-menu-brand';
    brand.href = base + '/';
    brand.textContent = 'Arunkumar Velusamy';
    inner.appendChild(brand);

    var list = document.createElement('ul');
    list.className = 'site-menu-links';

    items.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = base + '/' + item.path + '/';
      a.textContent = item.label;
      if (here.indexOf('/' + item.path) !== -1) {
        a.className = 'active';
      }
      li.appendChild(a);
      list.appendChild(li);
    });

    inner.appendChild(list);
    nav.appendChild(inner);
    document.body.insertBefore(nav, document.body.firstChild);
    document.body.classList.add('has-site-menu');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
