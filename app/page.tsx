// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 0; // 开发期不缓存：你后台一改前台就变

// ✅ 中文标签（展示用）
const TAGS = ["国画", "油画", "水彩/水粉", "版画", "素描", "书法与篆刻"];

// ✅ 中文标签 -> 路由
const TAG_TO_ROUTE: Record<string, string> = {
  国画: "guohua",
  油画: "oil",
  "水彩/水粉": "watercolor",
  版画: "print",
  素描: "sketch",
  书法与篆刻: "calligraphy",
};

type SiteText = {
  key: string;
  content?: string;
};

type Artwork = {
  _id: string;
  title?: string;
  categorySlug?: string;
  order?: number;
  images?: any[];
};

async function getSiteText(keys: string[]) {
  const rows: SiteText[] = await client.fetch(
    `*[_type=="siteText" && key in $keys]{key, content}`,
    { keys }
  );
  const map = new Map(rows.map((r) => [r.key, r.content || ""]));
  return {
    site_title: map.get("site_title") || "艺术鉴赏",
    profile_name: map.get("profile_name") || "Artist",
    profile_bio:
      map.get("profile_bio") || "请在 Sanity 后台 siteText 填写 profile_bio。",
    home_intro:
      map.get("home_intro") ||
      "按类别浏览：国画、油画、水彩/水粉、版画、素描、书法与篆刻。",
  };
}

async function getFeaturedArtworks() {
  const works: Artwork[] = await client.fetch(`
    *[_type=="artwork" && published != false]
    | order(coalesce(order, 999999) asc, _createdAt desc)[0...3]{
      _id,
      title,
      order,
      "categorySlug": category->slug.current,
      images
    }
  `);
  return works;
}

export default async function Home() {
  const text = await getSiteText([
    "site_title",
    "profile_name",
    "profile_bio",
    "home_intro",
  ]);

  const featured = await getFeaturedArtworks();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            {text.site_title}
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
              <div className="text-base font-semibold leading-6">
                {text.profile_name}
              </div>
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

          <div className="mt-6 whitespace-pre-line text-sm leading-6 text-zinc-600">
            {text.profile_bio}
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
            后台已连接：改完会自动更新前台（开发期 revalidate=0）。
          </div>
        </section>

        {/* Hero + Featured */}
        <section className="rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                代表作品
              </h1>
              <p className="mt-5 max-w-2xl whitespace-pre-line text-lg leading-8 text-zinc-600">
                {text.home_intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {TAGS.map((t) => {
                  const route = TAG_TO_ROUTE[t] ?? "guohua";
                  return (
                    <Link
                      key={t}
                      href={`/works/${route}`}
                      className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
                    >
                      {t}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <div className="text-xs uppercase tracking-wider text-zinc-500">
                Featured
              </div>
              <div className="mt-3 text-xl font-semibold">精选作品索引</div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                这里会自动展示你在 Sanity 后台上传的作品（每个作品取第一张图）。
              </p>
              <div className="mt-4 text-xs text-zinc-500">入口：/works</div>
            </div>
          </div>

          {/* ✅ Work section（从 Sanity 自动拉取 3 个作品） */}
          <div className="mt-12">
            <div className="text-2xl font-semibold">Work</div>
            <div className="mt-1 text-zinc-600">
              自动从后台拉取最新/排序靠前的 3 个作品。
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {featured.map((w) => {
                const firstImg = w.images?.[0];
                const imgUrl = firstImg
                  ? urlFor(firstImg).width(1200).height(900).fit("crop").url()
                  : null;

                const href = w.categorySlug ? `/works/${w.categorySlug}` : "/works";

                return (
                  <Link
                    key={w._id}
                    href={href}
                    className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                  >
                    <div className="relative aspect-[4/3] bg-zinc-100">
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={w.title || "Artwork"}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
                          暂无图片
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="font-medium">{w.title || "未命名作品"}</div>
                    </div>
                  </Link>
                );
              })}
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