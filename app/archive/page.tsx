import Link from "next/link";

export default function ArchivePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">个人文献</h1>
      <p className="mt-3 text-zinc-600">
        这里将整理年表、手稿、信件、资料、采访摘录等文献。
      </p>

      <div className="mt-8">
        <Link className="rounded-full border px-4 py-2 hover:bg-zinc-50" href="/">
          返回首页
        </Link>
      </div>
    </main>
  );
}