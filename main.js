/* CURSOR */
const curEl  = document.getElementById('cur'),
      curfEl = document.getElementById('curf');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;curEl.style.left=mx+'px';curEl.style.top=my+'px';});
(function tick(){fx+=(mx-fx)*.14;fy+=(my-fy)*.14;curfEl.style.left=fx+'px';curfEl.style.top=fy+'px';requestAnimationFrame(tick);})();


/* LOADER */
window.addEventListener('load', () => {
  document.fonts.ready.then(() => {
    setTimeout(() => {
      document.getElementById('loader').classList.add('out');
      
      document.body.style.overflow = '';
      setTimeout(() => {
        initSite();
      }, 500);
    }, 2500);
  });
});

/* INIT SITE */
function initSite() {
  initThree();
  initGlowFollow();
  initPhotoTilt();
  initTypewriter();
  initScrollAnimations();
  initReveal();
  initCounters();
  initNavbar();
  initHamburger();
  initScrollTracker();
  initTerminal();
  initModal();
  initForm();
  initMagnetic();
  initGlitch();
  initSmooth();
  initCursorHover();
  initFooterMatrix();
  
  
}

/* THREE.JS */
function initThree(){
  const cv=document.getElementById('cv');
  const R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:true});
  R.setPixelRatio(Math.min(devicePixelRatio,2));R.setSize(cv.offsetWidth,cv.offsetHeight);
  const S=new THREE.Scene(),C=new THREE.PerspectiveCamera(60,cv.offsetWidth/cv.offsetHeight,.1,1000);
  C.position.z=4;
  const N=2000,g=new THREE.BufferGeometry(),p=new Float32Array(N*3),c=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    p[i*3]=(Math.random()-.5)*14;p[i*3+1]=(Math.random()-.5)*14;p[i*3+2]=(Math.random()-.5)*10;
    const r=Math.random();
    if(r<.4){c[i*3]=.145;c[i*3+1]=.337;c[i*3+2]=.882;}
    else if(r<.7){c[i*3]=.22;c[i*3+1]=.745;c[i*3+2]=.984;}
    else{c[i*3]=1;c[i*3+1]=1;c[i*3+2]=1;}
  }
  g.setAttribute('position',new THREE.BufferAttribute(p,3));
  g.setAttribute('color',new THREE.BufferAttribute(c,3));
  const pts=new THREE.Points(g,new THREE.PointsMaterial({size:.024,vertexColors:true,transparent:true,opacity:.7}));
  S.add(pts);
  const lm=new THREE.LineBasicMaterial({color:0x2563eb,transparent:true,opacity:.07});
  for(let i=0;i<50;i++){const lg=new THREE.BufferGeometry();const lp=new Float32Array(6);for(let j=0;j<6;j++)lp[j]=(Math.random()-.5)*12;lg.setAttribute('position',new THREE.BufferAttribute(lp,3));S.add(new THREE.Line(lg,lm));}
  let ex=0,ey=0;
  document.addEventListener('mousemove',e=>{ex=(e.clientX/innerWidth-.5)*2;ey=(e.clientY/innerHeight-.5)*2;});
  window.addEventListener('resize',()=>{C.aspect=cv.offsetWidth/cv.offsetHeight;C.updateProjectionMatrix();R.setSize(cv.offsetWidth,cv.offsetHeight);});
  let t=0;(function a(){requestAnimationFrame(a);t+=.004;pts.rotation.y=t*.12+ex*.08;pts.rotation.x=ey*.05;pts.rotation.z=t*.06;R.render(S,C);})();
}

/* GLOW SEGUINDO MOUSE */
function initGlowFollow(){
  const glow=document.querySelector('.h-glow');if(!glow)return;
  let gx=window.innerWidth/2,gy=window.innerHeight/2,tx=gx,ty=gy;
  document.addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;});
  (function loop(){gx+=(tx-gx)*.08;gy+=(ty-gy)*.08;glow.style.left=gx+'px';glow.style.top=gy+'px';requestAnimationFrame(loop);})();
}

/* PHOTO TILT */
function initPhotoTilt(){
  const wrap=document.querySelector('.ph-wrap');if(!wrap)return;
  document.addEventListener('mousemove',e=>{
    const rx=-((e.clientY/innerHeight)-.5)*14;
    const ry= ((e.clientX/innerWidth) -.5)*14;
    wrap.style.transform=`perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
}

/* TYPEWRITER */
function initTypewriter(){
  const el=document.getElementById('h-desc-type');if(!el)return;
  const phrases=[
    'Gustavo Paes',
    'Desenvolvedor Full Stack',
    'Criando experiências digitais modernas',
    'Interfaces interativas e imersivas',
    'Soluções web de alta perfomance',
  ];
  let pi=0,ci=0,deleting=false;
  const ST=55,SD=28,PE=1800,PS=400;
  function type(){
    const ph=phrases[pi];
    if(!deleting){el.textContent=ph.slice(0,++ci);if(ci===ph.length){deleting=true;setTimeout(type,PE);return;}}
    else{el.textContent=ph.slice(0,--ci);if(ci===0){deleting=false;pi=(pi+1)%phrases.length;setTimeout(type,PS);return;}}
    setTimeout(type,deleting?SD:ST);
  }
  setTimeout(type,800);
}

/* GSAP SCROLL ANIMATIONS */
function initScrollAnimations(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined')return;
  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('section:not(.hero) .s-hdr').forEach(hdr=>{
    gsap.fromTo(hdr,{y:60,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',
      scrollTrigger:{trigger:hdr,start:'top 85%',toggleActions:'play none none none'}});
  });

  document.querySelectorAll('.p-card').forEach((card,i)=>{
    gsap.fromTo(card,{y:80,opacity:0,rotateY:8},{y:0,opacity:1,rotateY:0,
      duration:.9,ease:'power3.out',delay:i*.12,
      scrollTrigger:{trigger:card,start:'top 88%',toggleActions:'play none none none'}});
  });

  document.querySelectorAll('.f-card').forEach((card,i)=>{
    gsap.fromTo(card,{x:i%2===0?-50:50,opacity:0},{x:0,opacity:1,
      duration:.8,ease:'power2.out',delay:i*.08,
      scrollTrigger:{trigger:card,start:'top 90%',toggleActions:'play none none none'}});
  });

  const terminal=document.querySelector('.terminal');
  if(terminal){
    gsap.fromTo(terminal,{x:80,opacity:0},{x:0,opacity:1,duration:1.1,ease:'power3.out',
      scrollTrigger:{trigger:terminal,start:'top 85%',toggleActions:'play none none none'}});
  }
}

/* REVEAL */
function initReveal(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>{e.target.classList.add('on');e.target.querySelectorAll('.sk-fill').forEach(f=>{setTimeout(()=>{f.style.width=f.closest('.sk-item').dataset.lv+'%';},300);});},i*100);
        obs.unobserve(e.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll('.rev').forEach(el=>obs.observe(el));
}

/* CONTADORES */
function initCounters(){
  const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){cnt(e.target);obs.unobserve(e.target);}});},{threshold:.5});
  document.querySelectorAll('.sn').forEach(el=>obs.observe(el));
}
function cnt(el){const t=+el.dataset.t;let c=0;const iv=setInterval(()=>{c=Math.min(c+t/60,t);el.textContent=Math.floor(c);if(c>=t)clearInterval(iv);},20);}

/* NAVBAR */
function initNavbar(){
  window.addEventListener('scroll',()=>{document.getElementById('nb').classList.toggle('sc',window.scrollY>40);hilite();});
}
function hilite(){let cur='';document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});document.querySelectorAll('.n-link').forEach(l=>l.classList.toggle('act',l.getAttribute('href')==='#'+cur));}

/* HAMBURGUER */
function initHamburger(){
  const ham=document.getElementById('ham'),nl=document.getElementById('nl'),ov=document.getElementById('navOverlay');
  let savedY=0;
  function openMenu(){savedY=window.scrollY;document.body.style.position='fixed';document.body.style.top='-'+savedY+'px';document.body.style.width='100%';ham.classList.add('open');nl.classList.add('open');if(ov){ov.style.display='block';requestAnimationFrame(()=>ov.classList.add('show'));}ham.setAttribute('aria-expanded','true');}
  function closeMenu(){document.body.style.position='';document.body.style.top='';document.body.style.width='';window.scrollTo(0,savedY);ham.classList.remove('open');nl.classList.remove('open');if(ov){ov.classList.remove('show');setTimeout(()=>{ov.style.display='';},350);}ham.setAttribute('aria-expanded','false');}
  ham.addEventListener('click',()=>ham.classList.contains('open')?closeMenu():openMenu());
  if(ov)ov.addEventListener('click',closeMenu);
  nl.querySelectorAll('.n-link').forEach(l=>l.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&ham.classList.contains('open'))closeMenu();});
}

/* SCROLL TRACKER */
function initScrollTracker(){
  const track=document.getElementById('scrollTrack'),progress=document.getElementById('stProgress'),nodes=document.querySelectorAll('.st-node');
  const ids=['hero','about','projects','features','contact'];
  function update(){
    const sy=window.scrollY;
    track.classList.toggle('visible',sy>200);
    let cur=0;
    ids.forEach((id,i)=>{const el=document.getElementById(id);if(el&&sy>=el.offsetTop-window.innerHeight*.45)cur=i;});
    progress.style.height=(ids.length>1?(cur/(ids.length-1))*100:0)+'%';
    nodes.forEach((n,i)=>{n.classList.remove('active','done');if(i<cur)n.classList.add('done');if(i===cur)n.classList.add('active');});
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  update();
  nodes.forEach(n=>n.addEventListener('click',e=>{e.preventDefault();const s=document.getElementById(n.dataset.section);if(s)s.scrollIntoView({behavior:'smooth',block:'start'});}));
}

/* TERMINAL */
function initTerminal(){
  const body=document.getElementById('termBody');if(!body)return;
  const lines=[
    {type:'cmd',text:'whoami'},
    {type:'out',text:'<span class="t-hi">GT Dev</span> — Full Stack Developer'},
    {type:'blank'},
    {type:'cmd',text:'cat skills.json'},
    {type:'out',text:'{ <span class="t-key">"frontend"</span>: [<span class="t-str">"React"</span>, <span class="t-str">"HTML5"</span>, <span class="t-str">"CSS3"</span>],'},
    {type:'out',text:'  <span class="t-key">"backend"</span>: [<span class="t-str">"Node.js"</span>, <span class="t-str">"MongoDB"</span>, <span class="t-str">"REST"</span>],'},
    {type:'out',text:'  <span class="t-key">"foco"</span>: <span class="t-val">"experiencias imersivas"</span> }'},
    {type:'blank'},
    {type:'cmd',text:'echo $STATUS'},
    {type:'out',text:'<span class="t-hi">✓ Disponivel para novos projetos</span>'},
    {type:'blank'},
    {type:'cursor'},
  ];
  let triggered=false;
  const obs=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!triggered){triggered=true;typeLines(lines,body);obs.disconnect();}},{threshold:.3});
  obs.observe(body);
}
function typeLines(lines,container){
  let delay=400;
  lines.forEach(line=>{
    setTimeout(()=>{
      const div=document.createElement('div');div.className='t-line';
      if(line.type==='blank'){div.innerHTML='&nbsp;';}
      else if(line.type==='cursor'){div.innerHTML='<span class="t-prompt">$</span> <span class="t-cursor"></span>';}
      else if(line.type==='cmd'){div.innerHTML='<span class="t-prompt">$</span> <span class="t-cmd">'+line.text+'</span>';}
      else{div.innerHTML='<span class="t-out">'+line.text+'</span>';}
      container.appendChild(div);container.scrollTop=container.scrollHeight;
    },delay);
    delay+=line.type==='cmd'?600:280;
  });
}

/* MODAL */
var PD={
  financeiro:{
    tag:  'Full Stack',
    video:  'assets/video/financeiro.mp4',  
    link: 'https://github.com/gtpaes/financeiro',                                    
    t:    'Controlador Financeiro',
    d:    'Sistema completo com autentição segura, cálculo em tempo real, login e registro.',
    d2:   'JWT para autenticação, CRUD completo de financeiro, cálculo automático de saldo.',
    tech: ['Node.js','Express','MongoDB','JWT','React'],
  },
  landing:{
    tag:  'Front-end',
    img:  'assets/img/moverio.png',  
    link: 'https://gtpaes.github.io/MovieRio/index.html',                                    
    t:    'Landing Page MoveRio',
    d:    'Landing de alto impacto com GSAP e ScrollTrigger para experiência imersiva.',
    d2:   'Efeito glitch, paralaxe e microinterações em cada elemento.',
    tech: ['GSAP','ScrollTrigger','HTML5','CSS3','JS'],
  },
};

function initModal(){
  var ov = document.getElementById('mo');
  var mc = document.getElementById('mc');

  document.querySelectorAll('.om').forEach(function(b){
    b.addEventListener('click', function(){
      var p = PD[b.dataset.p];
      if (!p) return;

      var tech = p.tech.map(function(t){ return '<span>' + t + '</span>'; }).join('');

      /*  monta o HTML do modal  */
      document.getElementById('mi').innerHTML =
        '<div class="m-preview-wrap" id="mPreviewWrap"></div>' +
        '<div class="m-info">' +
          '<span class="m-tag">' + p.tag + '</span>' +
          '<h2>' + p.t + '</h2>' +
          '<p>' + p.d + '</p>' +
          '<p>' + p.d2 + '</p>' +
          '<h4>Tecnologias</h4>' +
          '<div class="m-tech">' + tech + '</div>' +
          '<div class="m-acts">' +
            '<a href="' + (p.link || '#') + '" class="btn btn-p" target="_blank"><span>Ver Projeto</span></a>' +
            '<a href="#contact" class="btn btn-o" id="mcl"><span>Solicitar Similar</span></a>' +
          '</div>' +
        '</div>';

       
      var wrap = document.getElementById('mPreviewWrap');

      if (p.video) {
        /* container do player */
        var player = document.createElement('div');
        player.className = 'm-video-player';

        /* o vídeo em si — sem autoplay */
        var vid = document.createElement('video');
        vid.src         = p.video;
        vid.className   = 'm-video-el';
        vid.preload     = 'metadata';
        vid.playsInline = true;
        /* NÃO muted, NÃO autoplay — usuário controla */

        /* overlay de play (some quando pausado) */
        var playBtn = document.createElement('button');
        playBtn.className   = 'm-play-btn';
        playBtn.innerHTML   = '<svg viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>';
        playBtn.setAttribute('aria-label', 'Play');

        /* barra de controles customizada */
        var controls = document.createElement('div');
        controls.className = 'm-controls';
        controls.innerHTML =
          '<button class="m-ctrl-btn" id="mPlayPause" aria-label="Play/Pause">' +
            '<svg class="ic-play" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>' +
            '<svg class="ic-pause" viewBox="0 0 24 24" style="display:none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>' +
          '</button>' +
          '<div class="m-progress-wrap"><div class="m-progress-bar" id="mBar"></div></div>' +
          '<span class="m-time" id="mTime">0:00</span>' +
          '<button class="m-ctrl-btn" id="mFullscreen" aria-label="Tela cheia">' +
            '<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>' +
          '</button>';

        player.appendChild(vid);
        player.appendChild(playBtn);
        player.appendChild(controls);
        wrap.appendChild(player);

        /*  lógica dos controles  */
        var ppBtn   = controls.querySelector('#mPlayPause');
        var bar     = controls.querySelector('#mBar');
        var timeEl  = controls.querySelector('#mTime');
        var fsBtn   = controls.querySelector('#mFullscreen');
        var icPlay  = ppBtn.querySelector('.ic-play');
        var icPause = ppBtn.querySelector('.ic-pause');

        function fmtTime(s) {
          var m = Math.floor(s / 60);
          var ss = Math.floor(s % 60);
          return m + ':' + (ss < 10 ? '0' : '') + ss;
        }
        function setPlaying(playing) {
          icPlay.style.display  = playing ? 'none'  : '';
          icPause.style.display = playing ? ''      : 'none';
          playBtn.style.opacity = playing ? '0'     : '1';
        }

        /* play/pause via overlay */
        playBtn.addEventListener('click', function(){
          vid.play(); setPlaying(true);
        });
        /* play/pause via controles */
        ppBtn.addEventListener('click', function(){
          if (vid.paused){ vid.play(); setPlaying(true); }
          else           { vid.pause(); setPlaying(false); }
        });
        /* clique no vídeo toggle */
        vid.addEventListener('click', function(){
          if (vid.paused){ vid.play(); setPlaying(true); }
          else           { vid.pause(); setPlaying(false); }
        });
        /* progresso */
        vid.addEventListener('timeupdate', function(){
          if (!vid.duration) return;
          bar.style.width = (vid.currentTime / vid.duration * 100) + '%';
          timeEl.textContent = fmtTime(vid.currentTime) + ' / ' + fmtTime(vid.duration);
        });
        /* seek clicando na barra */
        controls.querySelector('.m-progress-wrap').addEventListener('click', function(e){
          var rect = this.getBoundingClientRect();
          vid.currentTime = (e.clientX - rect.left) / rect.width * vid.duration;
        });
        /* tela cheia */
        fsBtn.addEventListener('click', function(){
          if (player.requestFullscreen)            player.requestFullscreen();
          else if (player.webkitRequestFullscreen) player.webkitRequestFullscreen();
        });
        /* ao terminar volta ao início */
        vid.addEventListener('ended', function(){ setPlaying(false); });

      } else if (p.img) {
        var img = document.createElement('img');
        img.src       = p.img;
        img.alt       = p.t;
        img.className = 'm-img-preview';
        wrap.appendChild(img);

      } else if (p.bg && p.ico) {
        wrap.innerHTML = '<div class="m-prev" style="background:' + p.bg + '"><svg viewBox="0 0 100 100">' + p.ico + '</svg></div>';
      }

      ov.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.getElementById('mcl').addEventListener('click', closeM);
    });
  });

  mc.addEventListener('click', closeM);
  ov.addEventListener('click', function(e){ if (e.target === ov) closeM(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeM(); });
}

function closeM(){
  /* pausa qualquer vídeo aberto antes de fechar */
  var vid = document.querySelector('#mPreviewWrap video');
  if (vid) vid.pause();
  document.getElementById('mo').classList.remove('open');
  document.body.style.overflow = '';
}

function initForm(){
  var form=document.getElementById('contactForm'),btn=document.getElementById('sb'),txt=document.getElementById('sbText');
  if(!form)return;
  form.addEventListener('submit',async function(e){
    e.preventDefault();
    var action=form.getAttribute('action');
    if(action.includes('SEU_ID')){showToast('Configure o Formspree no index.html!','warn');return;}
    btn.classList.add('btn-sending');txt.textContent='Enviando...';
    try{
      var res=await fetch(action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      if(res.ok){btn.classList.add('btn-sent');txt.textContent='Enviado! ✓';form.reset();showToast('Mensagem enviada!','ok');setTimeout(function(){btn.classList.remove('btn-sent');txt.textContent='Enviar Mensagem';},4500);}
      else throw new Error();
    }catch(err){txt.textContent='Enviar Mensagem';showToast('Erro ao enviar.','error');}
    btn.classList.remove('btn-sending');
  });
}
function showToast(msg,type){
  var t=document.getElementById('toast');
  var c={ok:{bg:'rgba(34,197,94,.1)',b:'rgba(34,197,94,.25)',col:'#4ade80'},warn:{bg:'rgba(234,179,8,.1)',b:'rgba(234,179,8,.25)',col:'#fbbf24'},error:{bg:'rgba(239,68,68,.1)',b:'rgba(239,68,68,.25)',col:'#f87171'}}[type];
  t.style.background=c.bg;t.style.borderColor=c.b;t.style.color=c.col;
  t.textContent=msg;t.classList.add('show');setTimeout(function(){t.classList.remove('show');},4500);
}

/* MAGNETISMO */
function initMagnetic(){
  document.querySelectorAll('.btn').forEach(function(b){
    b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.18)+'px,'+((e.clientY-r.top-r.height/2)*.18)+'px)';});
    b.addEventListener('mouseleave',function(){b.style.transform='';});
  });
}

/* GLITCH — pseudo-elementos CSS, nunca textShadow */
function initGlitch(){
  var l=document.getElementById('hl');if(!l)return;
  var g;
  window.addEventListener('scroll',function(){
    if(window.scrollY<10){clearTimeout(g);l.classList.add('glitch-active');g=setTimeout(function(){l.classList.remove('glitch-active');},450);}
  });
}

/* SCROLL SUAVE */
function initSmooth(){
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var t=document.querySelector(a.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });
}

/* CURSOR HOVER */
function initCursorHover(){
  document.querySelectorAll('a,button,.p-card,.f-card,.soc-l,.btn-c,.st-node').forEach(function(el){
    el.addEventListener('mouseenter',function(){curEl.classList.add('big');curfEl.classList.add('big');});
    el.addEventListener('mouseleave',function(){curEl.classList.remove('big');curfEl.classList.remove('big');});
  });
}

/* FOOTER MATRIX */
function initFooterMatrix(){
  const canvas=document.getElementById('footerCanvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const tokens=['const','let','var','function','return','async','await','import','export','class','extends','=>','{}','[]','useState','useEffect','fetch','JSON.parse','.map','.filter','.reduce','null','true','false','console.log','try','catch','Promise','void','REST','Node','MongoDB','React','npm','git','push','pull','merge','interface','type','string','number','boolean','<div>','</div>','API','JWT','Express'];
  let cols,drops,W,H,animId,running=false;
  function resize(){const rect=canvas.parentElement.getBoundingClientRect();W=canvas.width=rect.width||300;H=canvas.height=rect.height||80;cols=Math.max(1,Math.floor(W/70));drops=Array.from({length:cols},()=>Math.random()*-30);}
  function draw(){ctx.fillStyle='rgba(5,13,26,0.15)';ctx.fillRect(0,0,W,H);const colW=W/cols;drops.forEach((y,i)=>{const word=tokens[Math.floor(Math.random()*tokens.length)];const bright=Math.random()>.82,alpha=bright?.55:.18+Math.random()*.2;ctx.font=(bright?'bold ':'')+`11px 'JetBrains Mono',monospace`;ctx.fillStyle=bright?`rgba(56,189,248,${alpha})`:`rgba(37,99,235,${alpha})`;ctx.fillText(word,i*colW,y*16);drops[i]+=1;if(drops[i]*16>H&&Math.random()>.96)drops[i]=Math.random()*-15;});}
  function startLoop(){if(running)return;running=true;(function loop(){draw();animId=requestAnimationFrame(loop);})();}
  function stopLoop(){running=false;cancelAnimationFrame(animId);}
  resize();window.addEventListener('resize',resize);
  new IntersectionObserver((entries)=>{entries[0].isIntersecting?startLoop():stopLoop();},{threshold:.05}).observe(canvas.parentElement);
}