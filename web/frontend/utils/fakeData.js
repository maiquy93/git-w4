import { useEffect } from "react";

const fakeData = {
  data: {
    products: {
      edges: [
        {
          node: {
            title: "T-shirt",
            id: "gid://shopify/Product/8107252089072",
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

// useEffect(() => {
//   var myHeaders = new Headers();
//   myHeaders.append(
//     "X-Shopify-Access-Token",
//     "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"
//   );
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append(
//     "Cookie",
//     "_landing_page=%2Fpassword; _orig_referrer=https%3A%2F%2Ftraining-quy-mv-store.myshopify.com%2F%2Fshopify%2FProduct%2F8108101239024; _shopify_y=69508a70-1344-4bdb-a6bb-84ebdae6b92d; _y=69508a70-1344-4bdb-a6bb-84ebdae6b92d; cart_currency=VND; localization=VN; secure_customer_sig="
//   );

//   var graphql = JSON.stringify({
//     query:
//       "{\r\n	products(first:5) {\r\n    edges{\r\n      node{\r\n        title\r\n      }\r\n    }\r\n	}\r\n}",
//     variables: {},
//   });
//   var requestOptions = {
//     method: "POST",
//     mode: "no-cors",
//     headers: myHeaders,
//     body: graphql,
//     redirect: "follow",
//   };

//   fetch(
//     "https://training-quy-mv-store.myshopify.com/admin/api/2022-10/graphql.json",
//     requestOptions
//   )
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log("error", error));
// }, []);

export default fakeData;
