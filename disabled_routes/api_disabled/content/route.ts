import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const contentPath = path.join(process.cwd(), "data", "content.json");

export async function GET() {
  const raw = await fs.readFile(contentPath, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(req: Request) {
  const body = await req.json();
  await fs.writeFile(contentPath, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true });
}
