document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{let el=document.querySelector(a.getAttribute('href'));if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth'})}}));

(()=> {
  const styleId = 'sograce-language-selector-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .lang-select{position:relative;display:inline-flex;align-items:center}
      .lang-select select{appearance:none;-webkit-appearance:none;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);color:#cbd5e1;border-radius:10px;padding:8px 34px 8px 10px;font-weight:800;font-size:13px;line-height:1;cursor:pointer;outline:none;max-width:150px}
      .lang-select select:focus{border-color:rgba(96,165,250,.65);box-shadow:0 0 0 3px rgba(23,105,255,.18)}
      .lang-select select option{background:#020617;color:#fff}
      .lang-select:after{content:"";position:absolute;right:11px;width:7px;height:7px;border-right:2px solid #93c5fd;border-bottom:2px solid #93c5fd;transform:rotate(45deg);pointer-events:none;margin-top:-4px}
      @media(max-width:900px){.lang-select select{font-size:11px;padding:7px 28px 7px 8px;max-width:126px;border-radius:9px}.lang-select:after{right:9px;width:6px;height:6px}}
      @media(max-width:520px){.lang-select select{font-size:10px;padding:6px 26px 6px 7px;max-width:112px}}
    `;
    document.head.appendChild(style);
  }

  const languages = [
    {code:'en',label:'English'},
    {code:'es',label:'Español'},
    {code:'pt',label:'Português'},
    {code:'ru',label:'Русский'}
  ];

  const routes = {
    home:{en:'/',es:'/es/',pt:'/pt/',ru:'/ru/'},
    products:{en:'/products.html',es:'/es/products.html',pt:'/pt/products.html',ru:'/ru/products.html'},
    platform:{en:'/platform/',es:'/es/platform/',pt:'/pt/platform/',ru:'/ru/platform/'},
    app:{en:'/app/',es:'/es/app/',pt:'/pt/app/',ru:'/ru/app/'},
    oem:{en:'/oem-gps-tracker.html',es:'/es/',pt:'/pt/oem-gps-tracker.html',ru:'/ru/oem-gps-tracker.html'},
    contact:{en:'/contact.html',es:'/es/contact.html',pt:'/pt/contact.html',ru:'/ru/contact.html'},
    blog:{en:'/blog/',es:'/es/',pt:'/pt/blog/',ru:'/ru/blog/'}
  };

  function currentLanguage(path) {
    if (path === '/es' || path.startsWith('/es/')) return 'es';
    if (path === '/pt' || path.startsWith('/pt/')) return 'pt';
    if (path === '/ru' || path.startsWith('/ru/')) return 'ru';
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
    const select = document.createElement('select');
    select.setAttribute('aria-label','Language');
    languages.forEach(lang=>{
      const option = document.createElement('option');
      option.value = routes[key][lang.code];
      option.textContent = lang.label;
      option.selected = lang.code === selectedLang;
      select.appendChild(option);
    });
    select.addEventListener('change',()=>{window.location.href = select.value});
    switcher.className = 'lang-select';
    switcher.innerHTML = '';
    switcher.appendChild(select);
  });
})();
