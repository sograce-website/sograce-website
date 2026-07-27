document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{let el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

(()=> {
  const styleId = 'sograce-language-selector-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .lang-select{position:relative;display:inline-flex;align-items:center}
      .lang-select-button{display:inline-flex;align-items:center;justify-content:space-between;gap:12px;width:148px;min-width:148px;height:36px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#cbd5e1;border-radius:10px;padding:8px 12px 8px 10px;font-weight:800;font-size:13px;line-height:1;cursor:pointer;outline:none;white-space:nowrap}
      .lang-select-button:focus{border-color:rgba(96,165,250,.65);box-shadow:0 0 0 3px rgba(23,105,255,.18)}
      .lang-select-button:after{content:"";width:7px;height:7px;border-right:2px solid #93c5fd;border-bottom:2px solid #93c5fd;transform:rotate(45deg);pointer-events:none;margin-top:-4px;flex:0 0 auto}
      .lang-select-menu{position:absolute;right:0;top:calc(100% + 8px);z-index:80;display:none;min-width:148px;padding:6px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#020617;box-shadow:0 18px 45px rgba(0,0,0,.35)}
      .lang-select.open .lang-select-menu{display:grid;gap:4px}
      .lang-select-menu a{display:block;padding:9px 10px;border-radius:9px;color:#cbd5e1;font-weight:800;font-size:13px;white-space:nowrap}
      .lang-select-menu a:hover,.lang-select-menu a.active{background:rgba(23,105,255,.18);color:#fff}
      @media(max-width:900px){.lang-select-button{width:126px;min-width:126px;height:32px;font-size:11px;padding:7px 10px 7px 8px;border-radius:9px}.lang-select-menu{min-width:126px}.lang-select-menu a{font-size:11px;padding:8px 9px}}
      @media(max-width:520px){.lang-select-button{width:112px;min-width:112px;height:30px;font-size:10px;padding:6px 9px 6px 7px}.lang-select-menu{min-width:112px}.lang-select-menu a{font-size:10px}}
    `;
    document.head.appendChild(style);
  }

  const languages = [
    {code:'en',label:'English'},
    {code:'es',label:'Español'},
    {code:'pt',label:'Português'},
    {code:'ru',label:'Русский'},
    {code:'fr',label:'Français'}
  ];

  const routes = {
    home:{en:'/',es:'/es/',pt:'/pt/',ru:'/ru/',fr:'/fr/'},
    products:{en:'/products.html',es:'/es/products.html',pt:'/pt/products.html',ru:'/ru/products.html',fr:'/fr/products.html'},
    platform:{en:'/platform/',es:'/es/platform/',pt:'/pt/platform/',ru:'/ru/platform/',fr:'/fr/platform.html'},
    app:{en:'/app/',es:'/es/app/',pt:'/pt/app/',ru:'/ru/app/',fr:'/fr/app.html'},
    oem:{en:'/oem-gps-tracker.html',es:'/es/',pt:'/pt/oem-gps-tracker.html',ru:'/ru/oem-gps-tracker.html',fr:'/fr/oem.html'},
    contact:{en:'/contact.html',es:'/es/contact.html',pt:'/pt/contact.html',ru:'/ru/contact.html',fr:'/fr/contact.html'},
    blog:{en:'/blog/',es:'/es/',pt:'/pt/blog/',ru:'/ru/blog/',fr:'/fr/blog/'}
  };

  function currentLanguage(path) {
    if (path === '/es' || path.startsWith('/es/')) return 'es';
    if (path === '/pt' || path.startsWith('/pt/')) return 'pt';
    if (path === '/ru' || path.startsWith('/ru/')) return 'ru';
    if (path === '/fr' || path.startsWith('/fr/')) return 'fr';
    return 'en';
  }

  function pageKey(path) {
    const normalized = path.replace(/\/index\.html$/,'/');
    if (normalized.includes('/products.html') || normalized === '/products.html') return 'products';
    if (normalized.includes('/platform/')) return 'platform';
    if (normalized.includes('/app/')) return 'app';
    if (normalized.includes('oem-gps') || normalized.includes('private-label')) return 'oem';
    if (normalized.includes('/contact.html') || normalized === '/contact.html') return 'contact';
    if (normalized.includes('/blog/')) return 'blog';
    return 'home';
  }

  document.querySelectorAll('.lang-switch').forEach(switcher=>{
    const path = window.location.pathname || '/';
    const selectedLang = currentLanguage(path);
    const key = pageKey(path);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lang-select-button';
    button.setAttribute('aria-label','Language');
    button.setAttribute('aria-haspopup','true');
    button.setAttribute('aria-expanded','false');
    button.textContent = languages.find(lang=>lang.code === selectedLang)?.label || languages[0].label;
    const menu = document.createElement('div');
    menu.className = 'lang-select-menu';
    languages.forEach(lang=>{
      const link = document.createElement('a');
      link.href = routes[key][lang.code];
      link.textContent = lang.label;
      if (lang.code === selectedLang) {
        link.className = 'active';
        link.setAttribute('aria-current','true');
      }
      menu.appendChild(link);
    });
    button.addEventListener('click',event=>{
      event.stopPropagation();
      const isOpen = switcher.classList.toggle('open');
      button.setAttribute('aria-expanded',String(isOpen));
    });
    document.addEventListener('click',()=>{
      switcher.classList.remove('open');
      button.setAttribute('aria-expanded','false');
    });
    switcher.className = 'lang-select';
    switcher.innerHTML = '';
    switcher.appendChild(button);
    switcher.appendChild(menu);
  });
})();
