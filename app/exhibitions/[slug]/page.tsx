// app/exhibitions/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import content from "@/data/content.json";

type Exhibition = {
  slug: string;
  title: string;
  year?: string;
  date?: string;
  location?: string;
  summary?: string;
  body?: string; // longer text
  cover?: string;
  images?: string[]; // gallery
  tags?: string[];
};

const fallbackExhibitions: Exhibition[] = [
  {
    slug: "selected-works-2024",
    title: "Selected Works",
    year: "2024",
    date: "2024",
    location: "Shanghai",
    summary: "A small selection of recent works across mediums.",
    cover: "/next.svg",
    images: ["/next.svg", "/vercel.svg"],
    tags: ["Painting", "Sketch"],
    body: "Write your exhibition description here.",
  },
];

function getExhibitions(): Exhibition[] {
  const anyContent = content as any;
  const list = (anyContent?.exhibitions ?? []) as Exhibition[];
  return Array.isArray(list) && list.length > 0 ? list : fallbackExhibitions;
}

export default function ExhibitionDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const exhibitions = getExhibitions();
  const ex = exhibitions.find((x) => x.slug === params.slug);

  if (!ex) return notFound();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <header className="mx-auto max-w-5xl px-6 pt-10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/exhibitions"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50"
          >
            ← 返回展览目录
          </Link>
          <div className="text-sm text-zinc-600">
            {ex.date ?? ex.year ?? ""}
          </div>
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          {ex.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
          {ex.location ? (
            <span className="rounded-full bg-zinc-100 px-3 py-1">{ex.location}</span>
          ) : null}
          {(ex.tags ?? []).map((t) => (
            <span
              key={t}
              className="rounded-full border border-zinc-200 bg-white px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {ex.summary ? (
          <p className="mt-4 max-w-3xl text-zinc-700 leading-7">{ex.summary}</p>
        ) : null}
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {ex.cover ? (
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl border border-zinc-200 bg-white">
            <Image
              src={ex.cover}
              alt={ex.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}

        {ex.body ? (
          <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">展览说明</h2>
            <p className="mt-3 text-zinc-700 leading-7 whitespace-pre-line">
              {ex.body}
            </p>
          </section>
        ) : null}

        {(ex.images ?? []).length > 0 ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold">图集</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(ex.images ?? []).map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                >
                  <Image
                    src={src}
                    alt={`${ex.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}