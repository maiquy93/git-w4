import { useEffect } from "react";

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
      ],
    },
  },
  extensions: {
    cost: {
      requestedQueryCost: 52,
      actualQueryCost: 50,
      throttleStatus: {
        maximumAvailable: 1000,
        currentlyAvailable: 950,
        restoreRate: 50,
      },
    },
  },
};

export default Products;
