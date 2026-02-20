export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-200/70 bg-zinc-50/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-zinc-900" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Xinran Cai</div>
              <div className="text-xs text-zinc-500">Artist · Landscape · Visual</div>
            </div>
          </div>

          <nav className="flex items-center gap-2 text-sm">
            <a className="rounded-full px-3 py-2 hover:bg-zinc-100" href="#work">Work</a>
            <a className="rounded-full px-3 py-2 hover:bg-zinc-100" href="#about">About</a>
            <a className="rounded-full px-3 py-2 hover:bg-zinc-100" href="#contact">Contact</a>
            <a
              className="ml-1 rounded-full bg-zinc-900 px-4 py-2 text-zinc-50 hover:bg-zinc-800"
              href="/admin"
            >
              Admin
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-14 pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              A small home for my works.
            </h1>
            <p className="max-w-prose text-base leading-7 text-zinc-600">
              I make images, drawings, and design studies. This site is a curated collection
              of selected works and experiments.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#work"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                View works
              </a>
              <a
                href="#contact"
                className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-50"
              >
                Contact
              </a>
            </div>

            <div className="pt-4 text-xs text-zinc-500">
              Tip: click “Admin” to update content later.
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <div className="text-xs font-medium text-zinc-500">Featured</div>
              <div className="text-xl font-semibold">Selected Works 2024–2026</div>
              <p className="text-sm leading-6 text-zinc-600">
                Watercolor sketches, spatial analysis maps, and design narratives.
                Minimal layout, maximum clarity.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Sketch", "Watercolor", "GIS", "Landscape"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work grid */}
      <section id="work" className="mx-auto max-w-5xl px-6 pb-14">
        <div className="flex items-end justify-between gap-6 pb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Work</h2>
            <p className="text-sm text-zinc-600">A few placeholders. Replace them with your real projects.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Watercolor Series", note: "Campus sketching & atmosphere" },
            { title: "Mineral Aesthetics", note: "Form, light, and material study" },
            { title: "Heat & Canopy", note: "LST + urban forest mapping" },
            { title: "Riverside Restoration", note: "Ecology-driven design narrative" },
            { title: "Pavilion Concept", note: "Structure + circulation" },
            { title: "Photo Essays", note: "Daily fragments & composition" },
          ].map((p) => (
            <article
              key={p.title}
              className="group rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200" />
              <div className="mt-4 space-y-1">
                <div className="text-base font-semibold">{p.title}</div>
                <div className="text-sm text-zinc-600">{p.note}</div>
              </div>
              <div className="mt-4 text-sm font-medium text-zinc-900 opacity-70 group-hover:opacity-100">
                View →
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <div className="mt-4 grid gap-8 md:grid-cols-3">
            <p className="md:col-span-2 text-base leading-7 text-zinc-700">
              I’m Xinran. I work across visual storytelling, landscape design thinking,
              and data-informed environmental analysis. I like clean typography, calm spacing,
              and images that speak softly but clearly.
            </p>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
              <div className="text-sm font-semibold">Currently</div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-700">
                <li>• Building an artist portfolio site</li>
                <li>• Curating sketches & projects</li>
                <li>• Updating content via /admin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-6 py-14">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-3 text-sm text-zinc-600">
            Add your email/Instagram links here later. For now, this is a placeholder.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              href="mailto:your@email.com"
            >
              Email
            </a>
            <a
              className="rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-50"
              href="#"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Xinran Cai · Built with Next.js & Vercel
        </div>
      </footer>
    </div>
  );
}