'use strict';

// require('prismjs');

var dom = {};

dom.nav = document.getElementById('nav');
dom.navMenu = document.getElementById('nav-menu');
dom.navToggle = dom.nav.querySelector('a[href="#nav"]');
dom.navLinks = dom.navMenu.querySelectorAll('a');

function setActiveNavItem(pathname) {
  var noIndex = function noIndex(str) {
    return str.replace(/index\.html$/, '');
  };
  var isMatch = function isMatch(a) {
    return noIndex(a.pathname) === noIndex(pathname);
  };
  var item = Array.from(dom.navLinks).find(isMatch);
  if (item) {
    item.classList.add('is-active');
  }
}

dom.navToggle.addEventListener('click', function (event) {
  event.preventDefault();
  dom.nav.classList.toggle('is-active');
});

setActiveNavItem(window.location.pathname);

dom.frameContainers = document.querySelectorAll('[data-drizzle-append-iframe]');

if (dom.frameContainers.length) {
  window.addEventListener('load', function () {
    Array.from(dom.frameContainers).forEach(function (container) {
      var src = container.getAttribute('data-drizzle-append-iframe');
      var iframe = document.createElement('iframe');
      iframe.addEventListener('load', function () {
        container.classList.add('is-loaded');
      });
      iframe.setAttribute('src', src);
      container.appendChild(iframe);
    });
  });
}