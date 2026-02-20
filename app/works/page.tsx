export default function WorksPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">作品</h1>
      <p className="mt-4 text-zinc-600">
        这里是作品总目录。后面我们会加分类：油画、国画、水粉、雕塑、动漫、版画、素描、书法、篆刻……
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {[
          "油画",
          "国画",
          "水粉",
          "雕塑",
          "动漫",
          "版画",
          "素描",
          "书法",
          "篆刻",
        ].map((x) => (
          <div
            key={x}
            className="rounded-2xl border border-black/10 bg-white p-4 text-center text-sm font-medium"
          >
            {x}
          </div>
        ))}
      </div>
    </main>
  );
}