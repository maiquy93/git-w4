// async function Products() {
//   const res = await fetch("http://localhost:8000/getproducts");
//   const data = await res.json();
//   return data;
//   console.log(data);
// }

const Products = {
  data: {
    products: {
      edges: [
        {
          node: {
            title: "T-shirt",
            id: "gid://shopify/Product/8107252089072",
            tags: ["clothes", "Hot summer"],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/index.jpg?v=1663576217",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "50000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Male pant",
            id: "gid://shopify/Product/8108089737456",
            tags: ["clothes", "male pant", "pant"],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/malepantpant.jpg?v=1663638693",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "121000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Pillow",
            id: "gid://shopify/Product/8108096225520",
            tags: ["bed room", "pillow"],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/pilowow.webp?v=1663639249",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "71000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Google gift code",
            id: "gid://shopify/Product/8108099109104",
            tags: ["cash", "pin code"],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/googleoogle.png?v=1663647047",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Razer global pin code",
            id: "gid://shopify/Product/8108101239024",
            tags: [],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/razer-gold.png?v=1663639568",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "10% sale for all product",
            id: "gid://shopify/Product/8108126208240",
            tags: ["Hot summer"],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/sell.png?v=1663641443",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "10000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Swiming Pant - Male",
            id: "gid://shopify/Product/8108201312496",
            tags: ["Hot summer"],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/quanboi.jpg?v=1663646581",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "55000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine String Bag (Big Logo)",
            id: "gid://shopify/Product/8108219072752",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine String Bag (Small Logos)",
            id: "gid://shopify/Product/8108219105520",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Brand Buttons",
            id: "gid://shopify/Product/8108219138288",
            tags: [],
            images: {
              edges: [
                {
                  node: {
                    url: "https://cdn.shopify.com/s/files/1/0664/1002/1104/products/index_968d8ff0-22a0-4aba-9c9f-6c86f180d93f.jpg?v=1663915292",
                  },
                },
              ],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Brand Buttons - Divi",
            id: "gid://shopify/Product/8108219171056",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Brand Buttons - Divi Engine",
            id: "gid://shopify/Product/8108219203824",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Brand Buttons - WooCommerce",
            id: "gid://shopify/Product/8108219236592",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Brand Buttons - WordPress",
            id: "gid://shopify/Product/8108219302128",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Lanyard",
            id: "gid://shopify/Product/8108219334896",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "0.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine Tee",
            id: "gid://shopify/Product/8108219367664",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "100000.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine Tee - Blue, Large",
            id: "gid://shopify/Product/8108219400432",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "0.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine Tee - White, Large",
            id: "gid://shopify/Product/8108219433200",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "0.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine Tee - Yellow, Large",
            id: "gid://shopify/Product/8108219531504",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "0.0",
              },
            },
          },
        },
        {
          node: {
            title: "Divi Engine Tee - Blue, Medium",
            id: "gid://shopify/Product/8108219564272",
            tags: [],
            images: {
              edges: [],
            },
            priceRangeV2: {
              minVariantPrice: {
                amount: "0.0",
              },
            },
          },
        },
      ],
    },
  },
  extensions: {
    cost: {
      requestedQueryCost: 102,
      actualQueryCost: 90,
      throttleStatus: {
        maximumAvailable: 1000,
        currentlyAvailable: 910,
        restoreRate: 50,
      },
    },
  },
};

export default Products;
