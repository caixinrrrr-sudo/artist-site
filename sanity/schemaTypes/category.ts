export default {
  name: "category",
  title: "作品类别",
  type: "document",
  fields: [
    { name: "title", title: "名称", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "order", title: "排序（数字越小越靠前）", type: "number" },
    { name: "description", title: "简介文字（可选）", type: "text" },
  ],
};
