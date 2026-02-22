import Image from "next/image";
import Link from "next/link";

const TAGS = ["国画", "油画", "水彩/水粉", "版画", "素描", "书法与篆刻"];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            陈家泠艺术鉴赏
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link className="hover:opacity-70" href="/works">
              作品
            </Link>
            <Link className="hover:opacity-70" href="/exhibitions">
              展览
            </Link>
            <Link className="hover:opacity-70" href="/books">
              书籍
            </Link>
            <Link className="hover:opacity-70" href="/news">
              新闻
            </Link>
            <Link className="hover:opacity-70" href="/archive">
              个人文献
            </Link>

            <Link
              href="/admin"
              className="rounded-full border border-zinc-200 px-4 py-2 hover:bg-zinc-50"
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[360px_1fr]">
        {/* Profile card */}
        <section className="rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 overflow-hidden rounded-full bg-zinc-200" />
            <div>
              <div className="text-base font-semibold leading-6">Jialin Chen</div>
              <div className="text-sm text-zinc-500">Artist</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <span
                key={t}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 text-sm leading-6 text-zinc-600">
            以东方笔墨为根，以现代审美为翼。这里汇集代表作品、展览与文献资料，
            便于系统浏览与研究。
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/works"
              className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-medium text-white hover:opacity-90"
            >
              View works
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-200 px-5 text-sm font-medium hover:bg-zinc-50"
            >
              Contact
            </Link>
          </div>

          <div className="mt-4 text-xs text-zinc-400">
            Tip: 点击右上角 Admin 可上传/编辑作品与内容。
          </div>
        </section>

        {/* Hero + Featured */}
        <section className="rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                代表作品
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
                按类别浏览：国画、油画、水彩/水粉、版画、素描、书法与篆刻。
                你也可以在“作品”里按系列或年代继续细分。
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {TAGS.map((t) => (
                  <Link
                    key={t}
                    href={`/works/${encodeURIComponent(t)}`}
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Featured
              </div>
              <div className="mt-3 text-xl font-semibold">精选作品索引</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                先把作品上传到后台，然后这里的分类入口会带你进入对应类别的作品列表。
              </p>
              <div className="mt-4 text-xs text-zinc-500">
                入口：/works 、/works/国画 等
              </div>
            </div>
          </div>

          {/* Work section (placeholder, later we can make it dynamic from content.json) */}
          <div className="mt-12">
            <div className="text-2xl font-semibold">Work</div>
            <div className="mt-1 text-zinc-600">
              先上传作品图片与信息，然后这里会显示作品卡片。
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/3] rounded-2xl border border-zinc-200 bg-zinc-100"
                />
              ))}
            </div>
          </div>

          <div id="contact" className="mt-14 border-t border-zinc-200 pt-8">
            <div className="text-lg font-semibold">Contact</div>
            <p className="mt-2 text-sm text-zinc-600">
              你可以在这里放邮箱/机构/版权说明等信息。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}