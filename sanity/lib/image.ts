// sanity/lib/image.ts
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// 兼容不同版本的 @sanity/image-url：不依赖 SanityImageSource 类型
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}