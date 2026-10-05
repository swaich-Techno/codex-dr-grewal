"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { demoProducts, type DemoProduct } from "../lib/dr-grewal-products";

type Cart = Record<string, number>;
type RequestItem = { id: number; type: "Customer" | "Distributor" | "Prescription"; name: string; detail: string; status: string };
type Language = "en" | "pa";

const initialRequests: RequestItem[] = [
  { id: 1, type: "Customer", name: "Sample farm enquiry", detail: "2 items · Cattle & Buffalo", status: "New" },
  { id: 2, type: "Prescription", name: "Sample prescription", detail: "sample-prescription.pdf", status: "Awaiting review" },
];

const copy = {
  en: { products: "Products", about: "About us", support: "Support", hero: "Veterinary Care, Trusted Since 1973.", deck: "Explore Dr. Grewal veterinary homeopathic formulations for livestock and companion animals.", explore: "Explore products", talk: "Talk to our team", shop: "Shop by animal", featured: "Featured products", all: "View all", ask: "Ask about this product", add: "Add to enquiry basket", admin: "Admin demo" },
  pa: { products: "ਉਤਪਾਦ", about: "ਸਾਡੇ ਬਾਰੇ", support: "ਸਹਾਇਤਾ", hero: "ਪਸ਼ੂ ਸੰਭਾਲ, 1973 ਤੋਂ ਭਰੋਸੇਯੋਗ।", deck: "ਪਸ਼ੂਧਨ ਅਤੇ ਸਾਥੀ ਜਾਨਵਰਾਂ ਲਈ ਡਾ. ਗਰੇਵਾਲ ਦੀਆਂ ਹੋਮਿਓਪੈਥਿਕ ਤਿਆਰੀਆਂ ਵੇਖੋ।", explore: "ਉਤਪਾਦ ਵੇਖੋ", talk: "ਸਾਡੀ ਟੀਮ ਨਾਲ ਗੱਲ ਕਰੋ", shop: "ਜਾਨਵਰ ਅਨੁਸਾਰ ਖਰੀਦੋ", featured: "ਚੁਣੇ ਹੋਏ ਉਤਪਾਦ", all: "ਸਾਰੇ ਵੇਖੋ", ask: "ਇਸ ਉਤਪਾਦ ਬਾਰੇ ਪੁੱਛੋ", add: "ਪੁੱਛਗਿੱਛ ਟੋਕਰੀ ਵਿੱਚ ਪਾਓ", admin: "ਐਡਮਿਨ ਡੈਮੋ" },
};

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    basket: <><path d="M3 5h2l2 11h10l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.5-4 3-6 6-6s5.5 2 6 6M14 15c3-1 6 1 7 5"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h5"/></>,
    message: <><path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">{paths[name]}</svg>;
}

export function DrGrewalDemo() {
  const [language, setLanguage] = useState<Language>("en");
  const [view, setView] = useState<"home" | "catalogue" | "support" | "admin">("home");
  const [search, setSearch] = useState("");
  const [animal, setAnimal] = useState("All animals");
  const [cart, setCart] = useState<Cart>({});
  const [selected, setSelected] = useState<DemoProduct | null>(null);
  const [basketOpen, setBasketOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [notice, setNotice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const dialogClose = useRef<HTMLButtonElement>(null);
  const t = copy[language];

  const visibleProducts = useMemo(() => demoProducts.filter(p => (animal === "All animals" || p.category === animal) && p.name.toLowerCase().includes(search.toLowerCase())), [animal, search]);
  const cartRows = demoProducts.filter(p => cart[p.id]).map(p => ({ ...p, quantity: cart[p.id] }));
  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0);

  useEffect(() => {
    if (!selected && !basketOpen && !checkoutOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelected(null); setBasketOpen(false); setCheckoutOpen(false); } };
    document.addEventListener("keydown", onKey);
    setTimeout(() => dialogClose.current?.focus(), 0);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, basketOpen, checkoutOpen]);

  const add = (id: string, quantity = 1) => {
    setCart(current => ({ ...current, [id]: (current[id] || 0) + quantity }));
    setNotice("Added to your demonstration enquiry basket.");
  };

  const navigate = (next: typeof view) => { setView(next); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const addRequest = (request: Omit<RequestItem, "id">) => setRequests(current => [{ ...request, id: Date.now() }, ...current]);

  const submitCustomer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addRequest({ type: "Customer", name: String(data.get("name")), detail: `${cartCount} item${cartCount === 1 ? "" : "s"} · ${String(data.get("animal"))}`, status: "New" });
    setNotice("Demonstration request received. Nothing was sent."); setCheckoutOpen(false); setBasketOpen(false);
  };

  const submitDistributor = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    addRequest({ type: "Distributor", name: String(data.get("business")), detail: `${String(data.get("name"))} · ${String(data.get("city"))}`, status: "New" });
    event.currentTarget.reset(); setNotice("Demonstration distributor enquiry added to Admin demo.");
  };

  const chooseFile = (candidate?: File) => {
    setFileError(""); if (!candidate) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(candidate.type)) return setFileError("Choose a PDF, JPG or PNG file.");
    if (candidate.size > 5 * 1024 * 1024) return setFileError("The sample file must be 5 MB or smaller.");
    setFile(candidate);
  };

  const submitPrescription = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!file) return setFileError("Choose a sample document first.");
    addRequest({ type: "Prescription", name: "Sample prescription", detail: file.name, status: "Awaiting review" });
    setNotice("Awaiting review added to Admin demo. The file stayed on this device."); setFile(null);
  };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="demo-bar">Website demo — sample actions only. No messages, uploads or payments are sent.</div>
    <header className="site-header">
      <button className="brand" onClick={() => navigate("home")} aria-label="Dr. Grewal home"><span>Dr. Grewal<i>◆</i></span><small>Grewal Homeo Remedies, Mohali</small></button>
      <nav className={mobileOpen ? "nav open" : "nav"} aria-label="Main navigation">
        <button onClick={() => navigate("catalogue")}>{t.products}</button><button onClick={() => { navigate("home"); setTimeout(() => document.getElementById("about")?.scrollIntoView(), 50); }}>{t.about}</button><button onClick={() => navigate("support")}>{t.support}</button><button className="admin-link" onClick={() => navigate("admin")}>{t.admin}</button>
      </nav>
      <div className="header-tools">
        <button className="lang" onClick={() => setLanguage(language === "en" ? "pa" : "en")} aria-label="Switch English and Punjabi">{language === "en" ? "ਪੰ" : "EN"}</button>
        <button className="icon-button" onClick={() => navigate("catalogue")} aria-label="Search products"><Icon name="search" /></button>
        <button className="icon-button basket-button" onClick={() => setBasketOpen(true)} aria-label={`Enquiry basket with ${cartCount} items`}><Icon name="basket" />{cartCount > 0 && <b>{cartCount}</b>}</button>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Menu"><span/><span/><span/></button>
      </div>
    </header>
    {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss notification">×</button></div>}

    <main id="main">
      {view === "home" && <>
        <section className="hero">
          <div className="hero-copy"><p className="kicker">Grewal Homeo Remedies · Mohali</p><h1>{t.hero}</h1><p>{t.deck}</p><div className="action-row"><button className="primary" onClick={() => navigate("catalogue")}>{t.explore} <span>→</span></button><button className="secondary" onClick={() => navigate("support")}><Icon name="people" /> {t.talk}</button></div></div>
          <div className="hero-image"><Image src="/images/dr-grewal/cattle-hero.jpg" alt="Cattle grazing in a green field" fill priority sizes="(max-width: 760px) 100vw, 60vw" /></div>
        </section>
        <section className="home-grid">
          <div className="animal-section"><div className="section-title"><h2>{t.shop}</h2><button onClick={() => navigate("catalogue")}>{t.all} →</button></div><div className="animal-grid">
            {[{name:"Cattle & Buffalo",image:"/images/dr-grewal/buffalo.jpg",filter:"Cattle & Buffalo"},{name:"Dogs",image:"/images/dr-grewal/dog.jpg",filter:"Dogs"},{name:"Horses",image:"/images/dr-grewal/horse.jpg",filter:"Horses"}].map(a => <button className="animal-card" key={a.name} onClick={() => { setAnimal(a.filter); navigate("catalogue"); }}><span className="animal-image"><Image src={a.image} alt="" fill sizes="(max-width: 760px) 32vw, 16vw" /></span><strong>{a.name}</strong><span>→</span></button>)}
          </div></div>
          <div className="featured-section"><div className="section-title"><h2>{t.featured}</h2><button onClick={() => navigate("catalogue")}>{t.all} →</button></div><div className="featured-grid">{demoProducts.filter(p => p.featured).map(p => <ProductCard key={p.id} product={p} onOpen={setSelected} onAdd={() => add(p.id)} compact />)}</div></div>
        </section>
        <section className="service-band" id="about"><div className="about-panel"><p className="kicker">Established 1973</p><h2>About Dr. Grewal</h2><p>Grewal Homeo Remedies is a Mohali-based veterinary homeopathic business. This demonstration uses a small, approval-stage catalogue.</p></div><Service icon="message" title="Customer support" text="Get help with products and enquiries." action="Contact us" onClick={() => navigate("support")} /><Service icon="file" title="Prescription upload" text="Select a sample document for review." action="Upload now" onClick={() => navigate("support")} /><Service icon="people" title="Consultation" text="Preview the intended WhatsApp contact flow." action="Open contact demo" onClick={() => navigate("support")} /></section>
      </>}

      {view === "catalogue" && <section className="page-shell"><header className="page-heading"><p className="kicker">Sample catalogue · price on enquiry</p><h1>Find the right product to ask about.</h1><p>Technical product names are retained. Descriptions are neutral summaries for Version 1 approval.</p></header><div className="filters"><label><span>Search products</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Try G Appet" /></label><label><span>Animal</span><select value={animal} onChange={e => setAnimal(e.target.value)}><option>All animals</option><option>Cattle & Buffalo</option><option>Dogs</option><option>Horses</option><option>General</option></select></label><button className="text-button" onClick={() => { setSearch(""); setAnimal("All animals"); }}>Clear filters</button></div>
        {animal === "Horses" ? <div className="empty-state"><h2>No horse-specific product is confirmed yet.</h2><p>Ask the team to recommend a suitable next step. The final catalogue will only show approved species information.</p><button className="primary" onClick={() => navigate("support")}>Ask our team</button></div> : visibleProducts.length ? <div className="catalogue-grid">{visibleProducts.map(p => <ProductCard key={p.id} product={p} onOpen={setSelected} onAdd={() => add(p.id)} />)}</div> : <div className="empty-state"><h2>No matching products.</h2><p>Try another name or clear the filters.</p><button className="secondary" onClick={() => { setSearch(""); setAnimal("All animals"); }}>Clear filters</button></div>}
      </section>}

      {view === "support" && <section className="page-shell support-page"><header className="page-heading"><p className="kicker">Support demonstration</p><h1>Ask the team. Nothing leaves this page.</h1><p>All forms are simulated and reset when the page refreshes.</p></header><div className="support-grid">
        <form className="form-panel" onSubmit={submitPrescription}><div className="form-icon"><Icon name="file" /></div><h2>Prescription review</h2><p>Choose a sample PDF, JPG or PNG up to 5 MB. Its contents stay on this device.</p><label className="file-drop"><input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => chooseFile(e.target.files?.[0])} /><span>{file ? file.name : "Choose a sample document"}</span></label>{file && <button type="button" className="text-button" onClick={() => setFile(null)}>Remove file</button>}{fileError && <p className="error" role="alert">{fileError}</p>}<button className="primary" type="submit">Simulate review request</button></form>
        <div className="form-panel"><div className="form-icon"><Icon name="message" /></div><h2>Consultation & contact</h2><p>A production version can open an approved WhatsApp conversation. No number is connected in this demo.</p><button className="whatsapp" onClick={() => setNotice("WhatsApp contact flow preview only — no message was sent.")}>Preview WhatsApp-style contact</button><button className="secondary" onClick={() => setCheckoutOpen(true)}>Send customer enquiry</button></div>
        <form className="form-panel distributor" onSubmit={submitDistributor}><div className="form-icon"><Icon name="people" /></div><h2>Distributor enquiry</h2><label>Contact name<input name="name" required /></label><label>Business name<input name="business" required /></label><label>City<input name="city" required /></label><label>Enquiry<textarea name="message" required rows={3} /></label><button className="primary" type="submit">Submit demo enquiry</button></form>
        <div className="form-panel payment"><h2>Proposed payment sequence</h2><ol><li><b>1</b><span>Request submitted</span></li><li><b>2</b><span>Staff review</span></li><li><b>3</b><span>Quote shared</span></li><li><b>4</b><span>Simulated payment confirmation</span></li></ol><button className="secondary" onClick={() => setNotice("Payment confirmation simulated. No payment details were collected.")}>Simulate payment confirmation</button></div>
      </div></section>}

      {view === "admin" && <Admin requests={requests} setRequests={setRequests} onReset={() => { setRequests(initialRequests); setCart({}); setFile(null); setNotice("Demonstration reset to its initial sample state."); }} />}
    </main>

    <footer><div className="brand footer-brand"><span>Dr. Grewal<i>◆</i></span><small>Grewal Homeo Remedies, Mohali</small></div><p>Approval prototype · English/Punjabi translations are drafts awaiting review.</p><button onClick={() => navigate("admin")}>Open Admin demo →</button></footer>

    {selected && <Modal title={selected.name} onClose={() => setSelected(null)} closeRef={dialogClose}><div className="product-dialog"><div className="dialog-image"><Image src={selected.image} alt={`${selected.name} public product photograph`} fill sizes="420px" /></div><div><p className="kicker">{selected.category} · Price on enquiry</p><h2>{selected.name}</h2><p>{selected.detail}</p><p className="confirm-note">Pack size and directions to be confirmed by Dr. Grewal.</p><label>Quantity<input id="detail-quantity" type="number" min="1" defaultValue="1" /></label><button className="primary" onClick={() => { const el = document.getElementById("detail-quantity") as HTMLInputElement; add(selected.id, Math.max(1, Number(el.value))); setSelected(null); }}>{t.add}</button><button className="secondary" onClick={() => { add(selected.id); setSelected(null); setCheckoutOpen(true); }}>{t.ask}</button></div></div></Modal>}
    {basketOpen && <Modal title="Enquiry basket" onClose={() => setBasketOpen(false)} closeRef={dialogClose}>{cartRows.length ? <><div className="basket-list">{cartRows.map(row => <div key={row.id}><Image src={row.image} alt="" width={70} height={70}/><div><strong>{row.name}</strong><small>Price on enquiry</small></div><label><span className="sr-only">Quantity for {row.name}</span><input type="number" min="1" value={row.quantity} onChange={e => setCart(c => ({...c,[row.id]:Math.max(1,Number(e.target.value))}))}/></label><button className="remove" onClick={() => setCart(c => { const next={...c}; delete next[row.id]; return next; })}>Remove</button></div>)}</div><button className="primary full" onClick={() => { setBasketOpen(false); setCheckoutOpen(true); }}>Proceed to demo enquiry</button></> : <div className="empty-state"><h2>Your basket is empty.</h2><p>Add a product to prepare an enquiry.</p><button className="primary" onClick={() => { setBasketOpen(false); navigate("catalogue"); }}>Browse products</button></div>}</Modal>}
    {checkoutOpen && <Modal title="Customer enquiry" onClose={() => setCheckoutOpen(false)} closeRef={dialogClose}><form className="checkout-form" onSubmit={submitCustomer}><p>This demonstration request is not sent or stored.</p><label>Name<input name="name" required /></label><label>Phone or email<input name="contact" required /></label><label>Animal<select name="animal" required defaultValue=""><option value="" disabled>Select animal</option><option>Cattle & Buffalo</option><option>Dog</option><option>Horse</option><option>Other</option></select></label><label>Message<textarea name="message" required rows={3} /></label><div className="selected-summary"><strong>Selected items</strong>{cartRows.length ? cartRows.map(r => <span key={r.id}>{r.quantity} × {r.name}</span>) : <span>No basket items — general enquiry</span>}</div><button className="primary" type="submit">Submit demonstration request</button></form></Modal>}
  </>;
}

function ProductCard({ product, onOpen, onAdd, compact=false }: { product: DemoProduct; onOpen: (p: DemoProduct) => void; onAdd: () => void; compact?: boolean }) {
  return <article className={compact ? "product-card compact" : "product-card"}><button className="product-image" onClick={() => onOpen(product)} aria-label={`View ${product.name} details`}><Image src={product.image} alt={`${product.name} public product photograph`} fill sizes="(max-width: 760px) 80vw, 280px" /></button><div><p className="product-category">{product.category}</p><h3><button onClick={() => onOpen(product)}>{product.name}</button></h3><p>{product.short}</p><strong className="price">Price on enquiry</strong><div className="card-actions"><button className="small-primary" onClick={onAdd}>Add to basket</button><button className="arrow-button" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>→</button></div></div></article>;
}

function Service({ icon, title, text, action, onClick }: { icon:string; title:string; text:string; action:string; onClick:()=>void }) { return <div className="service"><span><Icon name={icon}/></span><h3>{title}</h3><p>{text}</p><button onClick={onClick}>{action} →</button></div>; }

function Modal({ title, children, onClose, closeRef }: { title:string; children:React.ReactNode; onClose:()=>void; closeRef:React.RefObject<HTMLButtonElement | null> }) { return <div className="modal-backdrop" onMouseDown={e => { if(e.target===e.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header><h1 id="modal-title">{title}</h1><button ref={closeRef} onClick={onClose} aria-label="Close dialog">×</button></header>{children}</section></div>; }

function Admin({ requests, setRequests, onReset }: { requests:RequestItem[]; setRequests:React.Dispatch<React.SetStateAction<RequestItem[]>>; onReset:()=>void }) {
  const update = (id:number,status:string) => setRequests(rows => rows.map(r => r.id===id ? {...r,status}:r));
  return <section className="page-shell admin-page"><header className="admin-heading"><div><p className="kicker">Presentation workspace</p><h1>Admin demonstration</h1><p>This is not a secure production admin system. Changes exist only in the current page session.</p></div><button className="secondary" onClick={onReset}>Reset demonstration</button></header><div className="admin-stats"><div><span>Products</span><b>{demoProducts.length}</b></div><div><span>Open requests</span><b>{requests.filter(r=>r.status!=="Approved").length}</b></div><div><span>Payments</span><b>Simulated</b></div></div><section className="admin-panel"><div className="section-title"><h2>Sample products</h2><span>Editing controls are illustrative</span></div><div className="admin-products">{demoProducts.map(p => <div key={p.id}><Image src={p.image} alt="" width={54} height={54}/><strong>{p.name}</strong><span>{p.category}</span><button onClick={() => alert("Demo edit control — no catalogue data was changed.")}>Edit</button></div>)}</div></section><section className="admin-panel"><div className="section-title"><h2>Enquiries & prescription review</h2><span>{requests.length} requests</span></div><div className="request-list">{requests.map(r => <article key={r.id}><div><span className="request-type">{r.type}</span><h3>{r.name}</h3><p>{r.detail}</p></div><div><label>Status<select value={r.status} onChange={e => update(r.id,e.target.value)}><option>New</option><option>Awaiting review</option><option>More information requested</option><option>Approved</option><option>Quote prepared</option><option>Payment simulated</option></select></label><div className="request-actions"><button onClick={() => update(r.id,"Approved")}>Approve</button><button onClick={() => update(r.id,"More information requested")}>Request more information</button></div></div></article>)}</div></section></section>;
}
