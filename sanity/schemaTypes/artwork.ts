export default {
  name: "artwork",
  title: "作品",
  type: "document",
  fields: [
    { name: "title", title: "标题", type: "string" },
    { name: "year", title: "年份（可选）", type: "string" },
    {
      name: "category",
      title: "类别",
      type: "reference",
      to: [{ type: "category" }],
    },
    { name: "series", title: "系列（可选）", type: "string" },
    { name: "medium", title: "媒介（可选）", type: "string" },
    { name: "size", title: "尺寸（可选）", type: "string" },
    {
      name: "images",
      title: "图片",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    { name: "description", title: "作品说明（可选）", type: "text" },
    { name: "published", title: "是否展示到前台", type: "boolean", initialValue: true },
    { name: "order", title: "同类别排序", type: "number" },
  ],
};
