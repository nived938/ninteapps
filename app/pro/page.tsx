import Link from 'next/link'

export default function ProPage(){
 return <main className="propage"><div className="wrap">
  <section className="prohero"><span className="free">100% Free</span><h1>NinteApps Pro</h1><p>Powerful bulk app management without subscriptions, sign-in screens, or complicated setup. This version keeps the Pro experience open to everyone.</p><p>Build larger app collections, use a cleaner workflow, and manage your Windows setup from one familiar place.</p><Link href="/" className="btn primary">Choose your apps</Link></section>
  <section className="plans">
   <div className="plan"><h3>Free</h3><div className="price">₹0</div><p>App selection, search, categories, and installer creation.</p><span className="free">Included</span></div>
   <div className="plan featured"><h3>Pro</h3><div className="price">₹0</div><p>Everything in the free experience, presented as the full NinteApps Pro workflow.</p><span className="free">Free forever</span></div>
   <div className="plan"><h3>Business</h3><div className="price">₹0</div><p>Use the same simple app-picking experience for team setup collections.</p><span className="free">No payment</span></div>
  </section>
 </div></main>
}
