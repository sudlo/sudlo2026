/* App logic for full variant */
(async ()=>{
  const data = await fetch('data.json').then(r=>r.json()).catch(()=>({categories:[]}));
  const container = document.getElementById('app');
  const grid = document.getElementById('grid');
  const q = document.getElementById('q');
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');

  function flatten(categories){
    return categories.flatMap(c=>c.nodes.map(n=>({...n, category:c.name, icon:c.icon}))); }
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
    modalBody.innerHTML = `<h2>${it.title}</h2><p style="color:#94a3b8">${it.overview||''}</p>`+
      (it.commands?`<h4>Commands</h4><pre class="code">${it.commands}</pre>`:'')+
      (it.links?`<h4>Links</h4><ul>${it.links.map(l=>`<li><a href="${l.url}" target="_blank" rel="noopener">${l.name}</a></li>`).join('')}</ul>`:'');
    modal.classList.add('active');
  }
  document.getElementById('closeModal').onclick=()=>modal.classList.remove('active');

  q.addEventListener('input',()=>{
    const v=q.value.trim().toLowerCase();
    render(v?items.filter(i=> (i.title||'').toLowerCase().includes(v) || (i.subtitle||'').toLowerCase().includes(v) || (i.overview||'').toLowerCase().includes(v)):items);
  });

  render(items);
})();
