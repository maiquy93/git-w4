import Products from "./getProducts";

//loc ra cac tag tu product
let result = [];
Products.data.products.edges.forEach(node => {
  result.push(...node.node.tags);
});
let tagArray = [];
result.forEach(tag => {
  if (!tagArray.includes(tag)) tagArray.push(tag);
});

export default tagArray;
