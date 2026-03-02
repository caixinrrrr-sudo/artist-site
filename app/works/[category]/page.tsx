// app/works/[category]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-static"; // ✅ 明确告诉 Next：静态导出

type CategorySlug = { slug: string };

type Category = {
  title: string;
  slug: string;
  description?: string;
};

type Artwork = {
  _id: string;
  title: string;
  year?: number;
  imageUrl?: string;
};

// ✅ output:"export" 必须提供：要预生成哪些 /works/[category]
export async function generateStaticParams() {
  const slugs = await client.fetch<CategorySlug[]>(
    `*[_type=="category" && defined(slug.current)]{"slug": slug.current}`
  );

  return slugs.map((c) => ({ category: c.slug }));
}

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  // ✅ Next 16: params 是 Promise，必须 await
  const { category } = await params;

  // 1) 拉分类信息（标题/简介）
  const cat = await client.fetch<Category | null>(
    `*[_type=="category" && slug.current==$slug][0]{
      title,
      "slug": slug.current,
      description
    }`,
    { slug: category }
  );

  // 2) 拉该分类下的作品（artwork.category 是 reference -> category）
  const works = await client.fetch<Artwork[]>(
    `*[_type=="artwork" && defined(image) && category->slug.current==$slug]
      | order(year desc, _createdAt desc) {
        _id,
        title,
        year,
        "imageUrl": image.asset->url
      }`,
    { slug: category }
  );

  const pageTitle = cat?.title ?? category;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{pageTitle}</h1>
          {cat?.description ? (
            <p className="mt-2 text-zinc-600 leading-7">{cat.description}</p>
          ) : null}
        </div>

        <Link
          href="/works"
          className="rounded-xl border bg-white px-4 py-2 text-sm hover:shadow-sm transition"
        >
          ← 返回作品分类
        </Link>
      </div>

      {works.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 text-zinc-700">
          这个分类下还没有作品。请去 Sanity 后台在“作品(artwork)”里新增作品，并选择分类为：{pageTitle}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <div key={w._id} className="rounded-2xl border bg-white overflow-hidden">
              <div className="relative aspect-[4/3] bg-zinc-100">
                {w.imageUrl ? (
                  <Image
                    src={w.imageUrl}
                    alt={w.title ?? "Artwork"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : null}
              </div>

              <div className="p-4">
                <div className="font-semibold">{w.title || "未命名作品"}</div>
                {w.year ? <div className="text-sm text-zinc-600 mt-1">{w.year}</div> : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}