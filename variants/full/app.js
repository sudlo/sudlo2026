/* App logic for full variant with goforit button support */
(async ()=>{
  const data = await fetch('data.json').then(r=>r.json()).catch(()=>({categories:[]}));
  const grid = document.getElementById('grid');
  const q = document.getElementById('q');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const goBtn = document.getElementById('goforitBtn');
  const closeBtn = document.getElementById('closeModal');

  function flatten(categories){
    return (categories||[]).flatMap(c=> (c.nodes||[]).map(n=>({...n, category:c.name, icon:c.icon}))); }
  const items = flatten(data.categories||[]);

  function render(list){
    grid.innerHTML='';
    if(list.length===0){ grid.innerHTML='<div style="grid-column:1/-1;color:#94a3b8">No results</div>'; return }
    list.forEach(it=>{
      const d=document.createElement('button'); d.className='card'; d.innerHTML=`<h3>${it.title}</h3><p>${it.subtitle||''}</p>`;
      d.onclick=()=>open(it);
      grid.appendChild(d);
    });
  }

  function open(it){
    modalBody.innerHTML = `<h2 style="color:var(--accent);margin-top:0">${it.title}</h2><p style="color:#94a3b8">${it.overview||''}</p>`+
      (it.commands?`<h4 style="color:var(--accent);">Commands</h4><pre class="code">${it.commands}</pre>`:'')+
      (it.links?`<h4 style="color:var(--accent);">Links</h4><ul>${it.links.map(l=>`<li><a href="${l.url}" target="_blank" rel="noopener">${l.name}</a></li>`).join('')}</ul>`:'');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden','false');
  }
  closeBtn.onclick=()=>{ modal.classList.remove('active'); modal.setAttribute('aria-hidden','true'); };

  function doSearch(){
    const v = q.value.trim().toLowerCase();
    render(v?items.filter(i=> (i.title||'').toLowerCase().includes(v) || (i.subtitle||'').toLowerCase().includes(v) || (i.overview||'').toLowerCase().includes(v)):items);
  }

  q.addEventListener('input', ()=>{ doSearch(); });
  goBtn.addEventListener('click', ()=>{ /* mysterious action — perform search with a little flair */
    // brief UI flourish
    goBtn.disabled = true;
    goBtn.textContent = 'seeking...';
    setTimeout(()=>{ doSearch(); goBtn.textContent = 'goforit'; goBtn.disabled = false; }, 350);
  });

  // initial render
  render(items);
})();
