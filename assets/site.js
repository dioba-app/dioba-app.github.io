/* =====================================================================
   Dioba links. EDIT THESE THREE LINES ONLY: every page uses them.
   ===================================================================== */
var LINKS = {
  download: 'https://docs.google.com/forms/d/e/1FAIpQLSdmkvRK4De76SSM5qLAhP_gMtjqZ52sU_YuRro4MiieJv_djQ/viewform',      // Google Form: "Get the free Dioba Rev-Share Calculator"
  reserve:  'https://docs.google.com/forms/d/e/1FAIpQLSdpxrUon5rGOvNQc1cNCPMiDYmcLWiIUJ3HKNJ19Cbf06XjMg/viewform',   // Google Form: "Reserve a founding spot in the Dioba beta"
  email:    'dioba.app@gmail.com'      // switch to 'hello@dioba.app' once the Namecheap forwarder works
};
/* ===================================================================== */

(function () {
  function wire() {
    var links = document.querySelectorAll('[data-link]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i], key = a.getAttribute('data-link');
      var url = String(LINKS[key] || '').trim();
      if (!url || url.indexOf('PASTE_') === 0) continue;   // keep the fallback link in the HTML
      if (key === 'email') { a.href = 'mailto:' + url.replace(/^mailto:/i, ''); if (a.hasAttribute('data-show')) a.textContent = url.replace(/^mailto:/i, ''); continue; }
      if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
})();
