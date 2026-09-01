import React from "react";
import aboutUs from "../assets/sliders/aboutUs.png";

const About = () => {
  return (
    <main className="min-h-screen bg-premium-bg">
      {/* ================= HERO ================= */}
      <section className="border-b border-premium-border bg-premium-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Content */}
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold">
                About E-Shop
              </p>

              <h1 className="max-w-xl text-3xl font-bold uppercase tracking-tight text-premium-charcoal sm:text-4xl lg:text-5xl leading-tight">
                Shopping made
                <span className="block text-premium-gold mt-2">
                  pure & simple.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-premium-muted font-normal">
                We believe shopping should be simple, reliable, and enjoyable.
                E-Shop brings quality products together with a seamless
                experience designed around our customers.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-md border border-premium-border bg-premium-bg px-5 py-4 shadow-sm">
                  <p className="text-xl font-bold text-premium-charcoal">
                    100+
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-premium-gold">
                    Products
                  </p>
                </div>

                <div className="rounded-md border border-premium-border bg-premium-bg px-5 py-4 shadow-sm">
                  <p className="text-xl font-bold text-premium-charcoal">
                    24/7
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-premium-gold">
                    Support
                  </p>
                </div>

                <div className="rounded-md border border-premium-border bg-premium-bg px-5 py-4 shadow-sm">
                  <p className="text-xl font-bold text-premium-charcoal">
                    100%
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-premium-gold">
                    Commitment
                  </p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-premium-border bg-premium-bg shadow-sm">
                <img
                  src={aboutUs}
                  alt="About E-Shop"
                  className="h-full w-full object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* Small floating card */}
              <div className="absolute -bottom-6 -left-4 hidden rounded-md border border-premium-border bg-white px-6 py-4 shadow-premium sm:block lg:-left-8">
                <p className="text-[9px] font-bold uppercase tracking-widest text-premium-gold">
                  Our Promise
                </p>

                <p className="mt-1 text-xs font-semibold text-premium-charcoal uppercase tracking-wider">
                  Quality. Trust. Simplicity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="bg-premium-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold">
              Our Story
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold uppercase tracking-tight text-premium-charcoal">
              Built around better shopping
            </h2>

            <p className="mt-6 text-xs sm:text-sm leading-relaxed text-premium-muted">
              Welcome to E-Shop. We are dedicated to providing quality products
              while making every part of your shopping journey simple and
              convenient. From discovering products to placing an order, our
              goal is to create an experience that feels effortless.
            </p>
          </div>

          {/* Values */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-md border border-premium-border bg-premium-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-premium-hover">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-premium-border bg-premium-bg text-xs font-bold text-premium-gold">
                01
              </div>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-wider text-premium-charcoal">
                Quality First
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-premium-muted">
                We focus on offering products that deliver genuine value,
                quality, and reliability.
              </p>
            </div>

            <div className="rounded-md border border-premium-border bg-premium-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-premium-hover">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-premium-border bg-premium-bg text-xs font-bold text-premium-gold">
                02
              </div>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-wider text-premium-charcoal">
                Customer Focus
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-premium-muted">
                Every decision we make starts with understanding and improving
                the customer experience.
              </p>
            </div>

            <div className="rounded-md border border-premium-border bg-premium-card p-8 transition duration-300 hover:-translate-y-1 hover:shadow-premium-hover">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border border-premium-border bg-premium-bg text-xs font-bold text-premium-gold">
                03
              </div>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-wider text-premium-charcoal">
                Simple Experience
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-premium-muted">
                From browsing to checkout, we keep the experience clean,
                intuitive, and easy to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-premium-charcoal">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-gold mb-3">
            E-Shop
          </p>

          <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white leading-tight">
            Everything you need.
            <span className="block text-premium-gold mt-2">
              Nothing you don't.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-premium-muted/80">
            Discover quality products and enjoy a shopping experience designed
            to be simple, fast, and reliable.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
