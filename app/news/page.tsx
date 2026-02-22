import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">新闻</h1>
      <p className="mt-3 text-zinc-600">
        这里将展示媒体报道、活动动态、最新发布等内容。
      </p>

      <div className="mt-8">
        <Link className="rounded-full border px-4 py-2 hover:bg-zinc-50" href="/">
          返回首页
        </Link>
      </div>
    </main>
  );
}