// Injects a consistent top menu bar on every page.
// Uses MkDocs' per-page `base_url` global so links resolve correctly
// whether the site is served at the root or under a subpath.
(function () {
  function build() {
    var base = (typeof base_url !== 'undefined' ? base_url : '.').replace(/\/+$/, '');
    var here = window.location.pathname.replace(/\/+$/, '');

    var items = [
      { label: 'Blogs', path: 'blogs' },
      { label: 'News & Reports', path: 'news' },
      {
        label: 'Apps', path: 'apps',
        children: [
          { label: 'Market Indicators', path: 'apps/market-indicators' },
          { label: 'Model Comparison', path: 'apps/model-comparison' }
        ]
      },
      { label: 'Requests', path: 'requests' }
    ];

    function isActive(path) {
      // Blog articles live at /<slug>/, so flag Blogs via the article layout.
      if (path === 'blogs' && document.querySelector('.blog-article--blog')) return true;
      return here.indexOf('/' + path) !== -1;
    }

    function makeLink(item) {
      var a = document.createElement('a');
      a.href = base + '/' + item.path + '/';
      a.textContent = item.label;
      if (isActive(item.path)) a.className = 'active';
      return a;
    }

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

      if (item.children && item.children.length) {
        li.className = 'has-dropdown';
        var top = makeLink(item);
        // mark parent active if any child is active
        if (item.children.some(function (c) { return isActive(c.path); })) {
          top.className = 'active';
        }
        li.appendChild(top);

        var dd = document.createElement('ul');
        dd.className = 'site-menu-dropdown';
        item.children.forEach(function (child) {
          var cli = document.createElement('li');
          cli.appendChild(makeLink(child));
          dd.appendChild(cli);
        });
        li.appendChild(dd);

        // Touch/click support: toggle the dropdown when tapping the parent.
        top.addEventListener('click', function (e) {
          if (window.matchMedia('(hover: none)').matches) {
            e.preventDefault();
            li.classList.toggle('open');
          }
        });
      } else {
        li.appendChild(makeLink(item));
      }

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
