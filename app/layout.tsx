// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "陈琪艺术档案馆",
  description: "作品、展览、书籍、新闻与个人文献",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-semibold tracking-tight">
              陈琪艺术鉴赏
            </Link>

            <nav className="flex gap-5 text-sm">
              <Link className="hover:underline" href="/works">作品</Link>
              <Link className="hover:underline" href="/exhibitions">展览</Link>
              <Link className="hover:underline" href="/books">书籍</Link>
              <Link className="hover:underline" href="/news">新闻</Link>
              <Link className="hover:underline" href="/archive">个人文献</Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-zinc-500">
            © {new Date().getFullYear()} 陈琪艺术鉴赏 · 建站中
          </div>
        </footer>
      </body>
    </html>
  );
}