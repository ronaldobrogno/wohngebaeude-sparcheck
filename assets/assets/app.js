:root{
  --bg:#0b1220;
  --card:#0f1b33;
  --muted:#9fb0d0;
  --text:#eaf0ff;
  --accent:#3ddc97;
  --accent2:#4f8cff;
  --danger:#ff5c7a;
  --border:rgba(255,255,255,.10);
  --shadow:0 12px 30px rgba(0,0,0,.35);
  --radius:16px;
  --max:1100px;
  --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
}

*{box-sizing:border-box}
html,body{margin:0;padding:0;font-family:var(--font);background:radial-gradient(1200px 700px at 20% 10%, rgba(79,140,255,.20), transparent 55%),
radial-gradient(1000px 600px at 80% 0%, rgba(61,220,151,.16), transparent 50%),
var(--bg); color:var(--text);}
a{color:inherit}
.container{max-width:var(--max); margin:0 auto; padding:22px;}
.nav{
  position:sticky; top:0; z-index:20;
  backdrop-filter: blur(10px);
  background: rgba(11,18,32,.72);
  border-bottom:1px solid var(--border);
}
.nav-inner{display:flex; align-items:center; justify-content:space-between; gap:16px;}
.brand{display:flex; align-items:center; gap:10px; text-decoration:none;}
.logo{
  width:36px;height:36px;border-radius:12px;
  background: linear-gradient(135deg, var(--accent2), var(--accent));
  box-shadow: var(--shadow);
}
.brand strong{letter-spacing:.2px}
.navlinks{display:flex; gap:12px; flex-wrap:wrap; justify-content:flex-end}
.navlinks a{
  text-decoration:none;
  padding:9px 12px;
  border:1px solid var(--border);
  border-radius:12px;
  color:var(--muted);
}
.navlinks a:hover{color:var(--text); border-color:rgba(255,255,255,.18)}
.hero{
  padding:34px 0 10px;
}
.grid-hero{
  display:grid;
  grid-template-columns: 1.1fr .9fr;
  gap:18px;
  align-items:stretch;
}
@media (max-width: 900px){
  .grid-hero{grid-template-columns:1fr}
}
.card{
  background:rgba(15,27,51,.82);
  border:1px solid var(--border);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
  padding:18px;
}
.badge{
  display:inline-flex; align-items:center; gap:8px;
  background: rgba(61,220,151,.12);
  border:1px solid rgba(61,220,151,.28);
  color: #baf7df;
  padding:6px 10px;
  border-radius:999px;
  font-size:13px;
}
h1{margin:12px 0 10px; font-size:40px; line-height:1.05}
@media(max-width:520px){h1{font-size:34px}}
p{color:var(--muted); line-height:1.6}
.kpis{display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:16px}
@media (max-width: 700px){.kpis{grid-template-columns:1fr}}
.kpi{padding:12px; border:1px solid var(--border); border-radius:14px; background:rgba(255,255,255,.03)}
.kpi b{display:block; font-size:18px; color:var(--text)}
.kpi span{font-size:13px; color:var(--muted)}
.btnrow{display:flex; gap:10px; flex-wrap:wrap; margin-top:14px}
.btn{
  cursor:pointer;
  border:0;
  border-radius:14px;
  padding:12px 14px;
  font-weight:650;
  text-decoration:none;
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
}
.btn-primary{background:linear-gradient(135deg, var(--accent2), var(--accent)); color:#071022}
.btn-ghost{background:transparent; border:1px solid var(--border); color:var(--text)}
.btn-ghost:hover{border-color:rgba(255,255,255,.18)}
.small{font-size:13px;color:var(--muted)}
.hr{height:1px; background:var(--border); margin:16px 0}
.section{padding:18px 0}
.section h2{margin:0 0 8px; font-size:26px}
.cols{
  display:grid; grid-template-columns:repeat(3,1fr);
  gap:12px;
}
@media(max-width:900px){.cols{grid-template-columns:1fr}}
.ul{margin:0; padding-left:18px; color:var(--muted); line-height:1.7}
.note{
  padding:12px;
  border-radius:14px;
  border:1px solid rgba(255,255,255,.12);
  background:rgba(255,255,255,.03);
  color:var(--muted);
  font-size:13px;
}
.footer{
  margin-top:24px; padding:22px 0;
  border-top:1px solid var(--border);
  color:var(--muted);
  font-size:13px;
}
.faq details{
  border:1px solid var(--border);
  border-radius:14px;
  padding:12px;
  background:rgba(255,255,255,.03);
  margin-bottom:10px;
}
.faq summary{cursor:pointer; color:var(--text); font-weight:650}
.faq p{margin:10px 0 0}

.modal{
  position:fixed; inset:0; display:none; z-index:50;
  background:rgba(0,0,0,.55);
  padding:18px;
}
.modal.open{display:flex; align-items:center; justify-content:center}
.modal-inner{max-width:760px; width:100%}
.stepper{display:flex; gap:8px; flex-wrap:wrap; margin:10px 0 14px}
.stepdot{width:10px;height:10px;border-radius:999px;background:rgba(255,255,255,.18)}
.stepdot.active{background:linear-gradient(135deg, var(--accent2), var(--accent))}
.formgrid{display:grid; grid-template-columns:1fr 1fr; gap:10px}
@media(max-width:700px){.formgrid{grid-template-columns:1fr}}
.field label{display:block; font-size:13px; color:var(--muted); margin:0 0 6px}
.field input, .field select, .field textarea{
  width:100%;
  padding:12px 12px;
  border-radius:12px;
  border:1px solid var(--border);
  background:rgba(0,0,0,.18);
  color:var(--text);
  outline:none;
}
.field input:focus, .field select:focus, .field textarea:focus{
  border-color: rgba(79,140,255,.55);
  box-shadow:0 0 0 4px rgba(79,140,255,.10);
}
.error{color:var(--danger); font-size:13px; margin-top:6px; display:none}
.error.show{display:block}
.inline{
  display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between;
}
.close{
  background:transparent; border:1px solid var(--border); color:var(--text);
  border-radius:12px; padding:10px 12px; cursor:pointer;
}
.pill{
  display:inline-flex; gap:8px; align-items:center;
  padding:8px 10px; border-radius:999px;
  border:1px solid var(--border);
  background:rgba(255,255,255,.03);
  color:var(--muted);
  font-size:13px;
}
.highlight{
  border:1px solid rgba(61,220,151,.28);
  background: rgba(61,220,151,.10);
  color:#c8ffe8;
}
