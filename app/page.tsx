'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type App={name:string;category:string;description:string;version:string;license:string}

const apps:App[]=[
{name:'Chrome',category:'Web Browsers',description:'Fast browser by Google.',version:'153.0',license:'Free'},
{name:'Opera',category:'Web Browsers',description:'Fast and flexible Chromium browser.',version:'135.0',license:'Free'},
{name:'Firefox',category:'Web Browsers',description:'Private and extensible web browser.',version:'155.0',license:'Open Source'},
{name:'Edge',category:'Web Browsers',description:'Microsoft Edge browser.',version:'153.0',license:'Free'},
{name:'Brave',category:'Web Browsers',description:'Privacy-focused browser with built-in protection.',version:'1.95',license:'Free'},
{name:'Vivaldi',category:'Web Browsers',description:'Powerful browser built for customization.',version:'8.2',license:'Free'},
{name:'Zoom',category:'Messaging',description:'Video meetings and collaboration.',version:'7.1',license:'Freemium'},
{name:'Discord',category:'Messaging',description:'Voice, video and text chat.',version:'1.0',license:'Free'},
]

const iconLetters:Record<string,string>={Chrome:'C',Opera:'O',Firefox:'F',Edge:'E',Brave:'B',Vivaldi:'V',Zoom:'Z',Discord:'D'}

function downloadSelection(selected:App[]){
  const manifest={product:'NinteApps',createdAt:new Date().toISOString(),apps:selected.map(app=>({name:app.name,version:app.version}))}
  const blob=new Blob([JSON.stringify(manifest,null,2)],{type:'application/json'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download='ninteapps-installer.json';a.click();URL.revokeObjectURL(url)
}

export default function Home(){
 const [query,setQuery]=useState('')
 const [category,setCategory]=useState('')
 const [selected,setSelected]=useState<string[]>([])
 const categories=Array.from(new Set(apps.map(app=>app.category)))
 const shown=useMemo(()=>apps.filter(app=>{
   const text=`${app.name} ${app.description}`.toLowerCase()
   return (!category||app.category===category)&&(!query||text.includes(query.toLowerCase()))
 }),[query,category])
 const selectedApps=apps.filter(app=>selected.includes(app.name))
 const toggle=(name:string)=>setSelected(current=>current.includes(name)?current.filter(x=>x!==name):[...current,name])
 return <>
  <header className="topbar"><div className="wrap nav"><Link className="brand" href="/">NinteApps</Link><nav className="navlinks"><Link href="/">Apps</Link><Link href="#help">Help</Link><Link className="pro" href="/pro">NinteApps Pro</Link></nav></div></header>
  <section className="intro"><div className="wrap introgrid">
    <div><div className="eyebrow">NinteApps</div><h1>Install and Update All Your Programs at Once</h1><p className="lead">No toolbars. No clicking next. Just pick your apps and go.</p><p className="lead">Choose the software you need, then create one simple download package for your selected apps.</p></div>
    <div className="introcol"><h2>Always Up-to-date</h2><p>NinteApps keeps your app list organized so you can quickly find the software you use.</p><Link className="link" href="#apps">See available apps →</Link></div>
    <div className="introcol"><h2>Easy to use</h2><p>Select multiple programs from one page, review your choices, and generate your installer manifest.</p><Link className="link" href="#apps">Start choosing →</Link></div>
  </div></section>
  <main className="steps" id="apps"><div className="wrap">
    <div className="stephead"><div className="num">1</div><div><h2>Pick the apps you want</h2><p>Choose one or several programs. You can filter by category or search by name.</p></div></div>
    <div className="controls"><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search apps..." aria-label="Search apps"/></div><div className="count">{shown.length} apps</div></div>
    <div className="cats"><button className={!category?'cat active':'cat'} onClick={()=>setCategory('')}>All apps</button>{categories.map(c=><button key={c} className={category===c?'cat active':'cat'} onClick={()=>setCategory(category===c?'':c)}>{c}</button>)}</div>
    <div className="grid">{shown.map(app=>{const isSelected=selected.includes(app.name);return <article key={app.name} className={isSelected?'app selected':'app'}>
      <div className="apptop"><div className="check"><button onClick={()=>toggle(app.name)} aria-label={`${isSelected?'Remove':'Select'} ${app.name}`}>{isSelected?'✓':'+'}</button></div><div className="icon">{iconLetters[app.name]}</div><div className="badge">{app.license}</div></div>
      <div className="body"><h3>{app.name}</h3><p>{app.description}</p></div><div className="foot"><span>{app.category}</span><span>{app.version}</span></div>
    </article>})}</div>
    {selectedApps.length>0&&<div className="selection"><div><strong>{selectedApps.length} selected</strong><small>Ready to create your NinteApps installer.</small></div><div className="actions"><button className="btn dark" onClick={()=>setSelected([])}>Clear</button><button className="btn primary" onClick={()=>downloadSelection(selectedApps)}>Download installer</button></div></div>}
  </div></main>
  <section className="features" id="help"><div className="wrap featuregrid"><div className="feature"><strong>One simple page</strong><p>Find common Windows programs without navigating through complicated screens.</p></div><div className="feature"><strong>Pick several apps</strong><p>Use the checkboxes to build a collection before downloading it.</p></div><div className="feature"><strong>Free Pro experience</strong><p>NinteApps Pro is available without a paid plan or sign-in.</p></div></div></section>
  <footer className="footer"><div className="wrap footergrid"><div><div className="brand">NinteApps</div><p>Install the apps you need with less searching and less clicking.</p></div><div><h4>Explore</h4><Link href="/">Apps</Link><Link href="/pro">NinteApps Pro</Link></div><div><h4>Support</h4><Link href="#help">Help</Link></div><div><h4>Product</h4><span>Free for everyone</span></div></div></footer>
 </>
}
