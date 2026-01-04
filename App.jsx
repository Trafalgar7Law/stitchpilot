import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Upload,
  Shield,
  Zap,
  Cpu,
  FileText,
  ArrowRight,
  BadgeCheck,
  Globe,
  HelpCircle,
} from "lucide-react";

// If you have shadcn/ui installed, you can swap these for shadcn components.
const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 shadow-lg ${className}`}>{children}</div>
);
const CardHeader = ({ className = "", children }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);
const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
const Button = ({
  className = "",
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    default:
      "bg-white text-black hover:bg-white/90 shadow-[0_10px_40px_rgba(255,255,255,0.12)]",
    ghost: "bg-transparent text-white hover:bg-white/10 border border-white/15",
    subtle: "bg-white/10 text-white hover:bg-white/15 border border-white/10",
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-3.5 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Pill = ({ icon: Icon, title, text }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="mt-0.5 rounded-xl bg-white/10 p-2">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{text}</div>
    </div>
  </div>
);

const Feature = ({ icon: Icon, title, text }) => (
  <div className="flex gap-3">
    <div className="mt-0.5 rounded-xl bg-white/10 p-2">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{text}</div>
    </div>
  </div>
);

const PricingCard = ({ name, price, desc, perks, highlight, cta, onSelect }) => (
  <Card className={`relative h-full ${highlight ? "border-white/25 bg-white/8" : ""}`}>
    {highlight ? (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs">
        Most popular
      </div>
    ) : null}
    <CardContent className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-semibold">{name}</div>
          <div className="mt-1 text-sm text-white/70">{desc}</div>
        </div>
        {highlight ? <BadgeCheck className="h-5 w-5" /> : null}
      </div>

      <div className="mt-6 flex items-end gap-2">
        <div className="text-3xl font-semibold">{price}</div>
        <div className="pb-1 text-sm text-white/60">/mo</div>
      </div>

      <div className="mt-6 space-y-3">
        {perks.map((p) => (
          <div key={p} className="flex items-start gap-2 text-sm text-white/80">
            <Check className="mt-0.5 h-4 w-4" />
            <span>{p}</span>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button
          className="w-full"
          variant={highlight ? "default" : "subtle"}
          size="lg"
          onClick={onSelect}
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-3 text-center text-xs text-white/55">
        Cancel anytime • No hidden fees
      </div>
    </CardContent>
  </Card>
);

const FAQ = ({ q, a }) => (
  <details className="group rounded-2xl border border-white/10 bg-white/5 p-5">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
      <span className="text-sm font-semibold">{q}</span>
      <span className="rounded-xl bg-white/10 p-2 transition group-open:rotate-180">
        <HelpCircle className="h-4 w-4" />
      </span>
    </summary>
    <div className="mt-3 text-sm text-white/70">{a}</div>
  </details>
);

function GradientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-52 -left-32 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-52 -right-32 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.08),transparent_55%)]" />
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-2">
      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white/10">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold">StitchPilot</div>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">
            by Space Junk
          </span>
        </div>
        <div className="text-xs text-white/60">Embroidery file conversion</div>
      </div>
    </div>
  );
}

export default function EmbroiderySaaSLanding() {
  const [billing, setBilling] = useState("monthly");
  const [toast, setToast] = useState("");

  const pricing = useMemo(() => {
    // NOTE: In MVP, keep it simple. Later: add annual discounts.
    const mult = billing === "annual" ? 10 : 1; // 2 months free as default annual placeholder.
    return {
      starter: 19 * mult,
      pro: 49 * mult,
      studio: 129 * mult,
      unit: billing === "annual" ? "yr" : "mo",
    };
  }, [billing]);

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2200);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <GradientBackdrop />

        {/* Top Nav */}
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <LogoMark />
          <div className="hidden items-center gap-2 md:flex">
            <a className="rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/5" href="#how">
              How it works
            </a>
            <a className="rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/5" href="#pricing">
              Pricing
            </a>
            <a className="rounded-xl px-3 py-2 text-sm text-white/70 hover:bg-white/5" href="#faq">
              FAQ
            </a>
            <Button variant="ghost" size="sm" onClick={() => showToast("Demo link: connect to your signup flow")}
            >
              Sign in
            </Button>
            <Button size="sm" onClick={() => showToast("CTA: route to /signup")}>Get started</Button>
          </div>
          <div className="md:hidden">
            <Button size="sm" onClick={() => showToast("CTA: route to /signup")}>Get started</Button>
          </div>
        </div>

        {/* Hero */}
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 md:grid-cols-2"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
                <Zap className="h-3.5 w-3.5" />
                Turn images into clean stitch-ready files
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                The fastest way to convert <span className="text-white/80">art → embroidery</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Upload your design. Choose fabric + stitch style. Get a production-ready file (DST/PES/EXP) with a
                stitch map and thread chart—without the back-and-forth.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => showToast("CTA: route to /signup")}
                >
                  Start converting <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={() => showToast("Open demo modal / video")}
                >
                  Watch demo
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Pill
                  icon={Upload}
                  title="Simple uploads"
                  text="PNG/SVG/PDF supported. Auto-preflight checks."
                />
                <Pill
                  icon={Shield}
                  title="Commercial safe"
                  text="Your files stay private. Watermarks optional."
                />
                <Pill
                  icon={Cpu}
                  title="Smart digitizing"
                  text="Auto underlay + pull comp presets (editable)."
                />
                <Pill
                  icon={FileText}
                  title="Stitch notes"
                  text="Thread chart + PDF summary for your shop." 
                />
              </div>

              <div className="mt-6 text-xs text-white/55">
                Works for hats, polos, hoodies, patches, and flat garments.
              </div>
            </div>

            {/* Mock UI */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="md:pt-4"
            >
              <Card className="overflow-hidden">
                <div className="border-b border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold">Conversion Queue</div>
                    <div className="text-xs text-white/60">Live preview • MVP mock</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">spacejunk-star.png</div>
                          <div className="mt-1 text-xs text-white/60">Hat • 2.25 in • Satin + Tatami fill</div>
                        </div>
                        <div className="text-xs text-white/60">Processing</div>
                      </div>
                      <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                        <div className="h-2 w-[62%] rounded-full bg-white/60" />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                        <span className="rounded-full bg-white/10 px-2 py-1">Auto underlay</span>
                        <span className="rounded-full bg-white/10 px-2 py-1">Pull comp: medium</span>
                        <span className="rounded-full bg-white/10 px-2 py-1">Trim optimized</span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">lucky-rabbit-coin.svg</div>
                          <div className="mt-1 text-xs text-white/60">Patch • 3.5 in • Tatami fill</div>
                        </div>
                        <div className="text-xs text-white/60">Ready</div>
                      </div>
                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        <Button
                          variant="subtle"
                          size="sm"
                          onClick={() => showToast("Download: lucky-rabbit-coin.DST")}
                        >
                          DST
                        </Button>
                        <Button
                          variant="subtle"
                          size="sm"
                          onClick={() => showToast("Download: lucky-rabbit-coin.PES")}
                        >
                          PES
                        </Button>
                        <Button
                          variant="subtle"
                          size="sm"
                          onClick={() => showToast("Open stitch map PDF")}
                        >
                          PDF
                        </Button>
                      </div>
                      <div className="mt-3 text-xs text-white/55">
                        12,340 stitches • 6 colors • est. run time 7m
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">client-logo.pdf</div>
                          <div className="mt-1 text-xs text-white/60">Polo • 3 in • Satin borders</div>
                        </div>
                        <div className="text-xs text-white/60">Needs review</div>
                      </div>
                      <div className="mt-3 text-xs text-white/70">
                        Suggested fixes: simplify tiny text, increase stroke width on outlines.
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Globe className="h-4 w-4" />
                      White-label delivery
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      Send clients a branded link to download files + stitch sheet.
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => showToast("Open: branding settings")}
                      >
                        Add your logo
                      </Button>
                      <Button size="sm" onClick={() => showToast("Create share link")}>Create link</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs text-white/60">HOW IT WORKS</div>
            <h2 className="mt-2 text-2xl font-semibold">From artwork to stitch file in minutes</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              A clean workflow that makes sense for small shops and brands. Start with automation, then layer in
              human QA for premium plans.
            </p>

            <div className="mt-6 grid gap-4">
              <Feature
                icon={Upload}
                title="1) Upload your design"
                text="Drop your file + pick target size, garment type, and fabric." 
              />
              <Feature
                icon={Cpu}
                title="2) Auto-digitize + preflight"
                text="We generate stitches, underlay, trims, and flag risky details." 
              />
              <Feature
                icon={Shield}
                title="3) Review + export"
                text="Download DST/PES/EXP plus stitch sheet and thread chart." 
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => showToast("CTA: route to /signup")}>Try it free</Button>
              <Button size="lg" variant="ghost" onClick={() => showToast("Open: sample files")}
              >
                See sample output
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <div className="text-sm font-semibold">Inputs (MVP)</div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Design</span>
                  <span className="text-white/60">PNG / SVG / PDF</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Garment type</span>
                  <span className="text-white/60">Hat / Patch / Flat</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Finish</span>
                  <span className="text-white/60">Satin / Tatami / Run</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Options</span>
                  <span className="text-white/60">Underlay / Trims / Density</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="text-sm font-semibold">Outputs</div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Stitch file</span>
                  <span className="text-white/60">DST / PES / EXP</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Stitch sheet</span>
                  <span className="text-white/60">PDF</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Thread chart</span>
                  <span className="text-white/60">Colors + order</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                  <span>Client share link</span>
                  <span className="text-white/60">White-label (Pro+)</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs text-white/60">PRICING</div>
            <h2 className="mt-2 text-2xl font-semibold">Start small. Scale when orders hit.</h2>
            <p className="mt-3 max-w-xl text-sm text-white/70">
              Choose a plan based on volume and how much review you want. Upgrade anytime.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
            <button
              className={`rounded-2xl px-4 py-2 text-sm ${billing === "monthly" ? "bg-white text-black" : "text-white/70"}`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`rounded-2xl px-4 py-2 text-sm ${billing === "annual" ? "bg-white text-black" : "text-white/70"}`}
              onClick={() => setBilling("annual")}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <PricingCard
            name="Starter"
            price={`$${pricing.starter}`}
            desc="For solo makers"
            perks={[
              "15 conversions / month",
              "DST + PES export",
              "Basic stitch sheet",
              "Email support",
            ]}
            cta="Start Starter"
            onSelect={() => showToast("Selected: Starter")}
          />
          <PricingCard
            name="Pro"
            price={`$${pricing.pro}`}
            desc="For small shops"
            highlight
            perks={[
              "60 conversions / month",
              "White-label share links",
              "Advanced presets (hats/patches)",
              "Priority processing",
            ]}
            cta="Go Pro"
            onSelect={() => showToast("Selected: Pro")}
          />
          <PricingCard
            name="Studio"
            price={`$${pricing.studio}`}
            desc="For production"
            perks={[
              "250 conversions / month",
              "Team seats (3)",
              "Human QA queue (optional add-on)",
              "API access (beta)",
            ]}
            cta="Get Studio"
            onSelect={() => showToast("Selected: Studio")}
          />
        </div>

        <div className="mt-6 text-xs text-white/55">
          *Annual shown as a placeholder (2 months free). Update pricing rules when you hook up Stripe.
        </div>
      </section>

      {/* Social proof / value props */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Zap className="h-4 w-4" /> Faster turnaround
              </div>
              <p className="mt-2 text-sm text-white/70">
                Stop waiting days for files. Get a first pass in minutes, then refine only when needed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Shield className="h-4 w-4" /> Fewer stitch-outs
              </div>
              <p className="mt-2 text-sm text-white/70">
                Preflight checks catch tiny text, thin strokes, and density issues before you waste material.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4" /> Better client experience
              </div>
              <p className="mt-2 text-sm text-white/70">
                Send a clean share link with files + stitch sheet. Looks professional, saves time.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs text-white/60">FAQ</div>
            <h2 className="mt-2 text-2xl font-semibold">Questions you’ll get from shops</h2>
            <p className="mt-3 max-w-xl text-sm text-white/70">
              This is copy you can keep, even if you rename the product.
            </p>
          </div>
          <div className="grid gap-4">
            <FAQ
              q="What file types do you export?"
              a="MVP exports DST and PES. Add EXP/JEF/VP3 as you grow. Each export includes a stitch sheet + thread chart." 
            />
            <FAQ
              q="Can I use this for hats and patches?"
              a="Yes. Hats and patches have different underlay and density needs, so we ship plan presets for both (Pro+)." 
            />
            <FAQ
              q="Is it fully automatic or reviewed by a human?"
              a="Starter/Pro are auto-digitize first. Studio can optionally add human QA for tricky designs." 
            />
            <FAQ
              q="Will my designs be private?"
              a="Yes. Files are stored securely. You can delete uploads anytime. White-label links can be password-protected." 
            />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold">Launch the MVP in a weekend</h3>
              <p className="mt-3 max-w-xl text-sm text-white/70">
                Hook up signup + Stripe + a simple job queue. Start with “auto-digitize + manual review” until the
                full pipeline is ready.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => showToast("CTA: route to /signup")}>Create account</Button>
                <Button size="lg" variant="ghost" onClick={() => showToast("Open: contact form")}
                >
                  Talk to us
                </Button>
              </div>
            </div>

            <Card>
              <CardContent>
                <div className="text-sm font-semibold">MVP checklist</div>
                <div className="mt-4 space-y-3 text-sm text-white/80">
                  {["Landing page + pricing", "Signup + auth", "Upload form", "Job queue + status", "Download page", "Stripe billing"].map(
                    (x) => (
                      <div key={x} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4" />
                        <span>{x}</span>
                      </div>
                    )
                  )}
                </div>
                <div className="mt-5 text-xs text-white/55">
                  Tip: start with a manual digitizing partner behind the scenes so you can sell before you build.
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <LogoMark />
              <span className="hidden md:inline">•</span>
              <span>© {new Date().getFullYear()} StitchPilot</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <a className="hover:text-white" href="#">Privacy</a>
              <a className="hover:text-white" href="#">Terms</a>
              <a className="hover:text-white" href="#">Status</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Toast */}
      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-sm shadow-2xl">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
