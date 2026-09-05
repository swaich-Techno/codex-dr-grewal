import Link from "next/link";
import { ProductMedia } from "./components/product-media";
import { products } from "../lib/products";

export default function Home() {
  const hero = products[0];

  return (
    <main id="main-content">
      <section className="home-hero act-water">
        <div className="hero-copy reveal-copy">
          <p className="eyebrow">Act 01 · Water / Discovery</p>
          <h1><span>Perfume oil,</span><br />close to skin.</h1>
          <p className="hero-deck">A quiet fragrance ritual from Panjab. Concentrated oils that settle slowly, stay close, and become memory.</p>
          <div className="button-row">
            <Link className="button button-dark liquid-button" href="/find-your-scent" data-cursor="DROP">Find your scent</Link>
            <Link className="text-link" href="/collection" data-cursor="VIEW">Explore the five <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-ripple" aria-hidden="true" />
          <ProductMedia product={hero} priority className="hero-product" />
          <p className="visual-caption"><span>01</span> The first Rehmat</p>
        </div>
        <div className="falling-drop" aria-hidden="true" />
        <div className="scroll-note" aria-hidden="true"><span /> Scroll to warm the oil</div>
      </section>

      <div className="transition-ripple" aria-hidden="true"><i /><i /><i /></div>

      <section className="oil-act act-oil">
        <div className="oil-sticky">
          <p className="eyebrow light">Act 02 · Oil / Fragrance</p>
          <div className="oil-heading">
            <h2>Light becomes<br /><em>fragrance.</em></h2>
            <p>The water clears. The world grows warmer. One bottle holds the frame while atmosphere changes around it.</p>
          </div>
          <div className="oil-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="bottle-silhouette" aria-hidden="true">
            <div className="bottle-cap" />
            <div className="bottle-glass"><div className="bottle-oil" /><b>R</b></div>
          </div>
          <p className="oil-caption">Concentrated perfume oil. Apply sparingly to pulse points.</p>
        </div>
      </section>

      <div className="transition-pour" aria-hidden="true"><span /></div>

      <section className="collection-edit" aria-labelledby="collection-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The collection · Five oils</p>
            <h2 id="collection-heading">Five ways<br />to wear quiet.</h2>
          </div>
          <p className="section-intro">Each Rehmat moves differently—mist, cream, amber, glass, rose—yet belongs to the same close-to-skin world.</p>
        </div>
        <div className="home-product-grid">
          {products.slice(0, 2).map((product) => (
            <article className="home-product-feature" key={product.id}>
              <Link href={`/product/${product.slug}`} data-cursor="VIEW" aria-label={`View ${product.name}`}>
                <ProductMedia product={product} />
              </Link>
              <div className="product-line"><span>{product.number}</span><h3>{product.name}</h3><span>Launching soon</span></div>
              <p>{product.subtitle}</p>
            </article>
          ))}
        </div>
        <div className="catalogue-rail">
          {products.slice(2).map((product) => (
            <article key={product.id} style={{ "--scent": product.color } as React.CSSProperties}>
              <span>{product.number}</span>
              <h3><Link href={`/product/${product.slug}`} data-cursor="VIEW">{product.name}</Link></h3>
              <p>{product.subtitle}</p>
              <Link href={`/product/${product.slug}`} aria-label={`Explore ${product.name}`}>Explore <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
        <Link className="button button-outline" href="/collection">Enter the collection</Link>
      </section>

      <div className="transition-glass" aria-hidden="true"><span>R</span></div>

      <section className="you-act act-you">
        <div className="you-title">
          <p className="eyebrow">Act 03 · You / Personalization</p>
          <h2>What Rehmat<br />are <em>you?</em></h2>
        </div>
        <div className="experience-grid">
          <Link className="experience-card quiz-card" href="/find-your-scent" data-cursor="DROP">
            <span className="experience-number">01</span>
            <div className="lens" aria-hidden="true"><i /></div>
            <div><p className="eyebrow">Six sensory choices</p><h3>Find your scent</h3><p>Tap to choose. Hold to feel.</p></div>
            <span className="card-action">Begin your profile ↗</span>
          </Link>
          <Link className="experience-card create-card" href="/create-your-fragrance" data-cursor="MIX">
            <span className="experience-number">02</span>
            <div className="mini-vessel" aria-hidden="true"><i /><b /></div>
            <div><p className="eyebrow">A preference portrait</p><h3>Create your Rehmat</h3><p>Layer colour, mood, and texture into a visual scent concept.</p></div>
            <span className="card-action">Fill the vessel ↗</span>
          </Link>
          <Link className="experience-card drop-card" href="/next-drop" data-cursor="VOTE">
            <span className="experience-number">03</span>
            <div className="drop-symbol" aria-hidden="true" />
            <div><p className="eyebrow">Community in progress</p><h3>The next Rehmat</h3><p>Shape the mood of what comes next.</p></div>
            <span className="card-action">Enter the drop room ↗</span>
          </Link>
        </div>
      </section>

      <section className="closing-house">
        <p className="eyebrow light">Rehmat Panjab</p>
        <h2>Made to be worn.<br /><em>Not announced.</em></h2>
        <Link className="button button-cream" href="/discover">Discover your Rehmat</Link>
        <div className="scent-diffusion" aria-hidden="true"><i /><i /><i /><i /></div>
      </section>
    </main>
  );
}
