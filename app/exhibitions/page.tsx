import Link from "next/link";

export default function ExhibitionsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">展览</h1>
      <p className="mt-3 text-zinc-600">
        这里将展示陈家泠的主要展览、年份、地点与策展信息。
      </p>

      <div className="mt-8 flex gap-3">
        <Link className="rounded-full border px-4 py-2 hover:bg-zinc-50" href="/">
          返回首页
        </Link>
        <Link className="rounded-full border px-4 py-2 hover:bg-zinc-50" href="/works">
          去看作品
        </Link>
      </div>
    </main>
  );
}