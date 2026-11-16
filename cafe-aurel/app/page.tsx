"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type AnchorHTMLAttributes,
} from "react";
import { Coffee, Clock3, Heart, MapPin, Menu, X, Wheat } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MenuItem = {
  name: string;
  description: string;
  price: number;
  special?: boolean;
};
const menu: Record<string, MenuItem[]> = {
  coffee: [
    {
      name: "Espresso",
      description: "A little cup with a lot of character.",
      price: 220,
    },
    {
      name: "Cappuccino",
      description: "Rich espresso under a cloud of silky milk.",
      price: 320,
    },
    {
      name: "Flat white",
      description: "Double espresso. Velvet milk. Beautiful balance.",
      price: 350,
    },
    {
      name: "The Aurel latte",
      description: "Honey, vanilla, and a whisper of cinnamon.",
      price: 390,
      special: true,
    },
    {
      name: "Iced latte",
      description: "Our house espresso, milk, and a little chill.",
      price: 360,
    },
    {
      name: "Slow-brewed filter",
      description: "A rotating single origin, brewed with patience.",
      price: 300,
    },
  ],
  other: [
    {
      name: "Matcha latte",
      description: "Ceremonial matcha whisked into creamy milk.",
      price: 420,
    },
    {
      name: "Hot chocolate",
      description: "Deep, dark chocolate. A hug in a cup.",
      price: 360,
    },
    {
      name: "Earl Grey",
      description: "Black tea with a bright touch of bergamot.",
      price: 260,
    },
    {
      name: "Honey & ginger",
      description: "Fresh ginger, lemon, and golden honey.",
      price: 280,
    },
    {
      name: "House lemonade",
      description: "Fresh lemon, mint, and sparkling water.",
      price: 320,
    },
    {
      name: "Fresh orange juice",
      description: "Just oranges. Squeezed when you ask.",
      price: 380,
    },
  ],
  sweet: [
    {
      name: "Butter croissant",
      description: "Golden layers, a soft centre, a buttery finish.",
      price: 260,
    },
    {
      name: "Almond croissant",
      description: "Twice baked with almond cream and a little crunch.",
      price: 340,
    },
    {
      name: "Pain au chocolat",
      description: "Flaky pastry wrapped around dark chocolate.",
      price: 300,
    },
    {
      name: "Cinnamon knot",
      description: "Soft dough, brown sugar, and warm spice.",
      price: 290,
    },
    {
      name: "Basque cheesecake",
      description: "Caramelised on top. Wonderfully creamy inside.",
      price: 420,
    },
    {
      name: "Chocolate cookie",
      description: "A soft middle and generous chocolate chunks.",
      price: 220,
    },
  ],
};

function Fan({ className = "" }: { className?: string }) {
  return (
    <div className={`deco-fan ${className}`} aria-hidden="true">
      {Array.from({ length: 13 }, (_, i) => (
        <i
          key={i}
          style={{ "--angle": `${i * 15 - 90}deg` } as CSSProperties}
        />
      ))}
      <span className="fan-arc arc-one" />
      <span className="fan-arc arc-two" />
      <span className="fan-arc arc-three" />
    </div>
  );
}
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="Café Aurel — home"
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-name">
        AUREL<small>NEIGHBOURHOOD CAFÉ</small>
      </span>
    </a>
  );
}
function LiquidLink({
  href,
  children,
  outline = false,
  className = "",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { outline?: boolean }) {
  return (
    <a
      href={href}
      className={`liquid-button ${outline ? "button-outline" : ""} ${className}`}
      {...rest}
    >
      <span>{children}</span>
    </a>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("coffee");
  const photoRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && navOpen) {
        setNavOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 760) setNavOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("resize", onResize);
    };
  }, [navOpen]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight)
        element.classList.add("will-reveal");
      observer.observe(element);
    });
    const onChange = () => {
      if (reduced.matches)
        document
          .querySelectorAll(".will-reveal")
          .forEach((el) => el.classList.add("is-visible"));
    };
    reduced.addEventListener("change", onChange);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const stage = photoRef.current;
    if (
      !stage ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let targetX = 0,
      targetY = 0,
      x = 0,
      y = 0,
      frame = 0;
    const animate = () => {
      if (reduced.matches) {
        stage.style.setProperty("--photo-x", "0px");
        stage.style.setProperty("--photo-y", "0px");
        frame = 0;
        return;
      }
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      stage.style.setProperty("--photo-x", `${x.toFixed(2)}px`);
      stage.style.setProperty("--photo-y", `${y.toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05)
        frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (reduced.matches) return;
      const rect = stage.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const leave = () => {
      targetX = targetY = 0;
      if (!frame) frame = requestAnimationFrame(animate);
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", leave);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const closeNav = () => setNavOpen(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <main id="main">
        <div className="dark-opening" id="home">
          <header className="site-header" role="banner">
            <div className="header-inner container">
              <Brand />
              <button
                ref={menuButtonRef}
                type="button"
                className="mobile-toggle"
                aria-label={navOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={navOpen}
                aria-controls="main-nav"
                onClick={() => setNavOpen(!navOpen)}
              >
                {navOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <nav
                id="main-nav"
                className={`main-nav ${navOpen ? "nav-open" : ""}`}
                aria-label="Main navigation"
              >
                <a href="#menu" onClick={closeNav}>
                  Our menu
                </a>
                <a href="#story" onClick={closeNav}>
                  Our story
                </a>
                <a href="#visit" onClick={closeNav}>
                  Find us
                </a>
                <LiquidLink href="#visit" outline onClick={closeNav}>
                  Come on in
                </LiquidLink>
              </nav>
            </div>
          </header>
          <section className="hero container" aria-labelledby="hero-heading">
            <div className="hero-copy">
              <p className="eyebrow hero-kicker">
                <span className="tiny-diamond" /> A LITTLE EVERYDAY INDULGENCE
              </p>
              <h1 id="hero-heading">
                <span>Good coffee.</span>
                <span>Golden</span>
                <em>moments.</em>
              </h1>
              <p className="hero-description">
                Beautifully brewed coffee, freshly baked little joys,
                <br className="desktop-break" /> and a warm corner of the world.
                Make yourself at home.
              </p>
              <div className="hero-actions">
                <LiquidLink href="#menu">Explore our menu</LiquidLink>
                <a className="quiet-link" href="#story">
                  Get to know us
                </a>
              </div>
              <div className="hero-footnote">
                <MapPin size={15} strokeWidth={1.5} />
                <span>DORĆOL, BELGRADE</span>
                <span className="footnote-separator" />
                <span>GOOD DAYS START HERE</span>
              </div>
              <Fan className="hero-fan" />
            </div>
            <div className="hero-visual">
              <div ref={photoRef} className="photo-stage">
                <div className="arch-outline outline-outer" />
                <div className="arch-outline outline-inner" />
                <div className="hero-photo">
                  <img
                    src="/images/hero-latte.jpg"
                    alt="Velvety latte art in a cream ceramic cup on a sunlit wooden table"
                    width="3000"
                    height="2000"
                    fetchPriority="high"
                  />
                </div>
                <span className="photo-corner corner-left" />
                <span className="photo-corner corner-right" />
                <div className="welcome-seal">
                  <span>ALWAYS A</span>
                  <em>
                    warm
                    <br />
                    welcome
                  </em>
                  <Heart size={13} strokeWidth={1.3} />
                </div>
              </div>
              <div className="photo-caption">
                <span>CRAFTED WITH CARE</span>
                <span className="tiny-diamond" />
                <span>SAVOURED SLOWLY</span>
              </div>
            </div>
          </section>
          <div className="ritual-strip">
            <div className="container">
              <span>EXCEPTIONAL COFFEE</span>
              <span className="deco-star" aria-hidden="true">
                ✦
              </span>
              <span>FRESH FROM THE OVEN</span>
              <span className="deco-star" aria-hidden="true">
                ✦
              </span>
              <span>A MOMENT FOR YOURSELF</span>
              <span className="deco-star strip-last-star" aria-hidden="true">
                ✦
              </span>
            </div>
          </div>
        </div>

        <section
          id="menu"
          className="menu-section section-pad"
          aria-labelledby="menu-heading"
        >
          <div className="container">
            <div className="section-heading reveal">
              <span className="eyebrow">THE SIMPLE PLEASURES</span>
              <h2 id="menu-heading">
                A cup. A bite. <em>A little bliss.</em>
              </h2>
              <p>Made with care. Enjoyed at your own pace.</p>
              <div className="deco-divider" aria-hidden="true">
                <span />
                <i />
                <span />
              </div>
            </div>
            <div className="menu-layout reveal">
              <aside className="pairing-card">
                <div className="pairing-photo">
                  <img
                    src="/images/coffee-croissant.jpg"
                    alt="Golden butter croissant paired with a heart-art cappuccino"
                    width="3000"
                    height="4799"
                    loading="lazy"
                  />
                </div>
                <div className="pairing-copy">
                  <span className="eyebrow">BETTER TOGETHER</span>
                  <h3>
                    A match made
                    <br />
                    <em>in the morning.</em>
                  </h3>
                  <p>
                    A flaky butter croissant. A silky cappuccino. Some things
                    just belong together.
                  </p>
                  <span className="pairing-flourish" aria-hidden="true">
                    ✦
                  </span>
                </div>
              </aside>
              <div className="menu-browser">
                <Tabs
                  value={activeMenu}
                  onValueChange={setActiveMenu}
                  className="cafe-tabs"
                >
                  <TabsList
                    className="menu-tabs"
                    aria-label="Menu category"
                    style={
                      {
                        "--tab-index": ["coffee", "other", "sweet"].indexOf(
                          activeMenu,
                        ),
                      } as CSSProperties
                    }
                  >
                    <span className="tab-fluid" aria-hidden="true" />
                    <TabsTrigger className="menu-tab" value="coffee">
                      Coffee
                    </TabsTrigger>
                    <TabsTrigger className="menu-tab" value="other">
                      Not coffee
                    </TabsTrigger>
                    <TabsTrigger className="menu-tab" value="sweet">
                      Something sweet
                    </TabsTrigger>
                  </TabsList>
                  {Object.entries(menu).map(([category, items]) => (
                    <TabsContent
                      value={category}
                      key={category}
                      className="menu-panel"
                    >
                      <div className="menu-items">
                        {items.map((item, index) => (
                          <article
                            className="menu-item"
                            key={item.name}
                            style={
                              {
                                "--item-delay": `${index * 35}ms`,
                              } as CSSProperties
                            }
                          >
                            <div className="menu-item-top">
                              <h3>
                                {item.name}
                                {item.special && (
                                  <span className="favourite-tag">
                                    HOUSE FAVOURITE
                                  </span>
                                )}
                              </h3>
                              <span className="item-price">
                                {item.price}
                                <small>RSD</small>
                              </span>
                            </div>
                            <p>{item.description}</p>
                          </article>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
                <div className="menu-notes">
                  <Wheat size={17} strokeWidth={1.5} />
                  <p>
                    Oat milk +60 RSD <span>·</span> Decaf available
                    <br />
                    Please ask our team about allergens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="story"
          className="story-section section-pad"
          aria-labelledby="story-heading"
        >
          <div className="container story-layout">
            <div className="story-visual reveal">
              <div className="story-frame">
                <img
                  src="/images/cafe-interior.jpg"
                  alt="Warm afternoon light falling across wooden chairs and tables in a cosy café"
                  width="3000"
                  height="4500"
                  loading="lazy"
                />
              </div>
              <div className="story-note">
                <span>LESS RUSH.</span>
                <em>More ritual.</em>
              </div>
            </div>
            <div className="story-copy reveal">
              <p className="eyebrow">A LITTLE ABOUT AUREL</p>
              <h2 id="story-heading">
                Come for the coffee.
                <br />
                <em>Stay for a while.</em>
              </h2>
              <p>
                We believe the best things in life deserve a little time. The
                first sip of your morning coffee. A conversation that runs long.
                The last crumb of a really good croissant.
              </p>
              <p>
                That’s why we made Aurel. A neighbourhood café with an old soul
                and an open door, right here in Dorćol. Beautiful coffee, honest
                ingredients, and a place where there’s no need to hurry.
              </p>
              <div className="story-values">
                <div>
                  <Coffee size={24} strokeWidth={1.2} />
                  <h3>Care in every cup</h3>
                  <p>
                    Thoughtfully sourced.
                    <br />
                    Patiently prepared.
                  </p>
                </div>
                <div>
                  <Heart size={24} strokeWidth={1.2} />
                  <h3>A place to belong</h3>
                  <p>
                    Bring a book, a friend,
                    <br />
                    or just yourself.
                  </p>
                </div>
              </div>
              <a className="quiet-link dark-link" href="#visit">
                Find your favourite corner
              </a>
            </div>
          </div>
        </section>

        <section
          id="visit"
          className="visit-section section-pad"
          aria-labelledby="visit-heading"
        >
          <div className="container visit-layout">
            <div className="visit-copy reveal">
              <p className="eyebrow">THERE’S A PLACE FOR YOU HERE</p>
              <h2 id="visit-heading">
                Your daily escape.
                <br />
                <em>Just around the corner.</em>
              </h2>
              <p>
                A morning ritual, an afternoon pause, or a catch-up
                <br className="desktop-break" /> that turns into the whole day.
                We’ll put the coffee on.
              </p>
              <div className="visit-location">
                <MapPin size={21} strokeWidth={1.3} />
                <span>
                  Dorćol, Belgrade
                  <small>
                    A little haven in the heart of the neighbourhood.
                  </small>
                </span>
              </div>
              <LiquidLink
                href="https://www.google.com/maps/search/?api=1&query=Dorcol+Belgrade"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the neighbourhood
              </LiquidLink>
            </div>
            <div className="hours-card reveal">
              <Fan className="hours-fan" />
              <Clock3 size={23} strokeWidth={1.2} />
              <h3>
                Make time
                <br />
                <em>for something lovely.</em>
              </h3>
              <dl>
                <div>
                  <dt>Monday – Friday</dt>
                  <dd>08:00 – 20:00</dd>
                </div>
                <div>
                  <dt>Saturday</dt>
                  <dd>09:00 – 20:00</dd>
                </div>
                <div>
                  <dt>Sunday</dt>
                  <dd>09:00 – 18:00</dd>
                </div>
              </dl>
              <p className="hours-note">Walk in. Settle in. Stay a little.</p>
              <span className="tiny-diamond" aria-hidden="true" />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <Brand footer />
            <p>
              Good coffee. Golden moments.
              <br />
              Always a warm welcome.
            </p>
            <a className="quiet-link" href="#home">
              Back to the top
            </a>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Café Aurel</span>
            <span>MADE FOR UNHURRIED DAYS</span>
            <details className="photo-credits">
              <summary>Photography credits</summary>
              <div>
                Photography via Unsplash by{" "}
                <a
                  href="https://unsplash.com/photos/coffee-latte-serve-in-ceramic-mug-72qDM1TA5p8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Matt Hoffman
                </a>
                ,{" "}
                <a
                  href="https://unsplash.com/photos/wooden-chairs-and-table-in-a-sunlit-cafe-interior-QGPzFMeVfr4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Alan Zhang
                </a>
                , and{" "}
                <a
                  href="https://unsplash.com/photos/a-cup-of-coffee-and-a-croissant-on-a-wooden-table-fCUHx-iVGBE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fajar Imani Firdaus
                </a>
                .
              </div>
            </details>
          </div>
        </div>
      </footer>
    </>
  );
}
