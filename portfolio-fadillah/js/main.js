(function () {
  'use strict';

  var root = document.documentElement;

  /* Íkon merek dimuat dari Simple Icons; jika koneksi tidak tersedia, tampilkan fallback ringkas yang konsisten. */
  Array.prototype.slice.call(document.querySelectorAll('.skill-logo-img')).forEach(function (image) {
    var holder = image.parentElement;
    function markLogoState() {
      if (!holder) return;
      if (image.complete && image.naturalWidth === 0) holder.classList.add('is-failed');
      else if (image.naturalWidth > 0) holder.classList.remove('is-failed');
    }
    image.addEventListener('error', markLogoState);
    image.addEventListener('load', markLogoState);
    if (image.complete) markLogoState();
  });
  /* Tampilkan ringkasan tiga kelompok keahlian, lalu izinkan pengguna membuka seluruh kategori. */
  var skillsGrid = document.getElementById('skills-grid');
  var skillsToggle = document.getElementById('skills-toggle');
  if (skillsGrid && skillsToggle) {
    var skillCategoryCount = skillsGrid.querySelectorAll('.skill-category').length;
    var initiallyVisibleCategories = 3;
    var skillsToggleLabel = skillsToggle.querySelector('.skills-toggle-label');
    var skillsToggleCount = skillsToggle.querySelector('.skills-toggle-count');
    if (skillsToggleCount) skillsToggleCount.textContent = '+' + Math.max(0, skillCategoryCount - initiallyVisibleCategories) + ' kategori';
    skillsToggle.addEventListener('click', function () {
      var expanded = skillsToggle.getAttribute('aria-expanded') !== 'true';
      skillsGrid.classList.toggle('is-collapsed', !expanded);
      skillsToggle.setAttribute('aria-expanded', String(expanded));
      if (skillsToggleLabel) skillsToggleLabel.textContent = expanded ? 'Tampilkan lebih sedikit' : 'Lihat semua keahlian';
    });
  }

  var themeButton = document.getElementById('theme');
  var themeLabel = document.getElementById('theme-label');

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (error) { return null; }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function isDark() {
    var theme = root.getAttribute('data-theme');
    return theme ? theme === 'dark' : systemDark();
  }
  function updateThemeButton() {
    if (!themeLabel) return;
    themeLabel.textContent = isDark() ? 'Mode terang' : 'Mode gelap';
    if (themeButton) themeButton.setAttribute('aria-label', isDark() ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
  }

  var themeFromStorage = savedTheme();
  if (themeFromStorage === 'dark' || themeFromStorage === 'light') root.setAttribute('data-theme', themeFromStorage);
  updateThemeButton();
  if (themeButton) {
    themeButton.addEventListener('click', function () {
      var nextTheme = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', nextTheme);
      try { localStorage.setItem('theme', nextTheme); } catch (error) { /* Tema tetap berubah untuk sesi ini. */ }
      updateThemeButton();
    });
  }

  /* Perpindahan halus dan penanda menu yang sesuai dengan bagian yang terlihat. */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.liquid-nav .nav-link'));
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#' + targetId);
    });
  });

  function setActiveNavigation(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  /* Semua tautan menuju bagian halaman memakai gulir halus; tombol Hubungi Saya juga menyorot menu bawah. */
  Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (link) {
    if (link.classList.contains('nav-link')) return;
    link.addEventListener('click', function (event) {
      var targetId = (link.getAttribute('href') || '').slice(1);
      var target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', '#' + targetId);
      if (document.querySelector('.liquid-nav .nav-link[href="#' + targetId + '"]')) setActiveNavigation(targetId);
    });
  });
  if ('IntersectionObserver' in window) {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      visible.sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      setActiveNavigation(visible[0].target.id);
    }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach(function (section) { observer.observe(section); });
  }

  /* Foto proyek bersifat opsional: jika belum ada, kartu tetap menampilkan visual pengganti. */
  Array.prototype.slice.call(document.querySelectorAll('.project-image img')).forEach(function (image) {
    function markReady() {
      if (image.naturalWidth > 0) image.parentElement.classList.add('has-image');
    }
    image.addEventListener('load', markReady);
    image.addEventListener('error', function () { image.remove(); });
    if (image.complete) markReady();
  });

  /* Tab Sertifikasi/Pelatihan. Tambahan kartu baru langsung tercermin pada angka tab. */
  var documentTabs = Array.prototype.slice.call(document.querySelectorAll('[data-document-tab]'));
  var documentPanels = Array.prototype.slice.call(document.querySelectorAll('[data-document-panel]'));
  function activateDocumentTab(category) {
    documentTabs.forEach(function (tab) {
      var active = tab.getAttribute('data-document-tab') === category;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });
    documentPanels.forEach(function (panel) {
      var active = panel.getAttribute('data-document-panel') === category;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  }
  documentTabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { activateDocumentTab(tab.getAttribute('data-document-tab')); });
    tab.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      var direction = event.key === 'ArrowRight' ? 1 : -1;
      var nextIndex = (index + direction + documentTabs.length) % documentTabs.length;
      documentTabs[nextIndex].focus();
      activateDocumentTab(documentTabs[nextIndex].getAttribute('data-document-tab'));
    });
  });

  /* Normalisasi kartu: semua article.certificate-item menjadi anak langsung grid agar tidak bertumpuk/menyempit. */
  Array.prototype.slice.call(document.querySelectorAll('.document-panel .certificate-item')).forEach(function (item) {
    var panel = item.closest('[data-document-panel]');
    var grid = panel && panel.querySelector('.certificate-grid');
    if (!item.hasAttribute('data-document-item')) item.setAttribute('data-document-item', '');
    if (!item.hasAttribute('data-category') && panel) item.setAttribute('data-category', panel.getAttribute('data-document-panel'));
    if (grid && item.parentElement !== grid) grid.appendChild(item);
  });
  var documentItems = Array.prototype.slice.call(document.querySelectorAll('[data-document-item]'));
  documentItems.forEach(function (item) {
    var category = item.getAttribute('data-category');
    var files = (item.getAttribute('data-files') || '').split('|').filter(Boolean);
    var viewButton = item.querySelector('[data-cert-view]');
    var downloadLink = item.querySelector('[data-cert-download]');
    var empty = item.closest('[data-document-panel]') && item.closest('[data-document-panel]').querySelector('[data-empty-documents]');
    var chosenPath = '';
    var isLocalFile = window.location.protocol === 'file:';

    if (empty) empty.hidden = true;
    function enableActions(path) {
      chosenPath = path;
      if (viewButton) viewButton.disabled = false;
      if (downloadLink) {
        downloadLink.href = path;
        downloadLink.download = path.split('/').pop();
        downloadLink.classList.remove('is-disabled');
        downloadLink.removeAttribute('aria-disabled');
        downloadLink.removeAttribute('tabindex');
      }
    }
    function disableActions() {
      if (viewButton) viewButton.disabled = true;
      if (downloadLink) {
        downloadLink.classList.add('is-disabled');
        downloadLink.setAttribute('aria-disabled', 'true');
        downloadLink.setAttribute('tabindex', '-1');
      }
    }
    function checkFileAt(index) {
      if (index >= files.length) { disableActions(); return; }
      var candidate = files[index];
      fetch(candidate, { method: 'HEAD', cache: 'no-store' }).then(function (response) {
        if (!response.ok) throw new Error('Dokumen tidak ditemukan');
        var contentType = response.headers.get('content-type') || '';
        if (contentType.indexOf('text/html') !== -1) throw new Error('Alamat bukan berkas dokumen');
        enableActions(candidate);
      }).catch(function () { checkFileAt(index + 1); });
    }
    /* Berkas berada di folder statis assets/sertifikat/. Tautkan langsung agar tombol
       tidak bergantung pada permintaan HEAD yang kadang diblokir oleh server lokal/CDN. */
    if (files.length && files[0]) enableActions(files[0]);
    else disableActions();

    if (viewButton) {
      viewButton.addEventListener('click', function () {
        if (viewButton.disabled || !chosenPath || !certificateDialog) return;
        var titleNode = item.querySelector('h3');
        var dialogTitle = document.getElementById('dialog-title');
        if (dialogTitle && titleNode) dialogTitle.textContent = titleNode.textContent;
        var pdf = /\.pdf(?:$|[?#])/i.test(chosenPath);
        if (certificateFrame) {
          certificateFrame.hidden = !pdf;
          certificateFrame.src = pdf ? chosenPath : 'about:blank';
        }
        if (certificateImage) {
          certificateImage.hidden = pdf;
          certificateImage.src = pdf ? '' : chosenPath;
        }
        if (typeof certificateDialog.showModal === 'function') certificateDialog.showModal();
        else window.open(chosenPath, '_blank', 'noopener');
      });
    }

    /* Angka tab mengikuti jumlah kartu dokumen yang tercantum pada HTML. */
    var counter = document.querySelector('[data-tab-count="' + category + '"]');
    if (counter) counter.textContent = String(Number(counter.textContent || 0) + 1);
  });

  /* Perbarui status kosong setelah menghitung seluruh kartu pada tiap kategori. */
  documentPanels.forEach(function (panel) {
    var count = panel.querySelectorAll('.certificate-grid > .certificate-item').length;
    var empty = panel.querySelector('[data-empty-documents]');
    if (empty) empty.hidden = count > 0;
    var counter = document.querySelector('[data-tab-count="' + panel.getAttribute('data-document-panel') + '"]');
    if (counter) counter.textContent = String(count);
  });

  var certificateDialog = document.getElementById('certificate-dialog');
  var certificateFrame = document.getElementById('certificate-frame');
  var certificateImage = document.getElementById('certificate-image');
  function closeCertificateDialog() {
    if (certificateDialog && certificateDialog.open) certificateDialog.close();
    if (certificateFrame) certificateFrame.src = 'about:blank';
    if (certificateImage) certificateImage.src = '';
  }
  var closeTop = document.getElementById('dialog-close');
  var closeBottom = document.getElementById('dialog-close-bottom');
  if (closeTop) closeTop.addEventListener('click', closeCertificateDialog);
  if (closeBottom) closeBottom.addEventListener('click', closeCertificateDialog);
  if (certificateDialog) {
    certificateDialog.addEventListener('click', function (event) {
      if (event.target === certificateDialog) closeCertificateDialog();
    });
    certificateDialog.addEventListener('close', function () {
      if (certificateFrame) certificateFrame.src = 'about:blank';
      if (certificateImage) certificateImage.src = '';
    });
  }
})();
