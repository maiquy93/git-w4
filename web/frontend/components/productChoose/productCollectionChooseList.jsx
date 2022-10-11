import {
  TextField,
  Button,
  Modal,
  TextContainer,
  Icon,
  ChoiceList,
  ResourceList,
  ResourceItem,
  Avatar,
  TextStyle,
} from "@shopify/polaris";
import { MobileCancelMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import styles from "./productChoose.module.scss";
import classNames from "classnames/bind";
import ProductChoosePopup from "../../utils/productChoosePopup";
import { useEffect } from "react";
// import Products from "../../utils/getProducts";
import CollectionChoose from "../collectionChoose";

import TagsChoose from "../tagsChoose";
import { useMemo } from "react";
import { uniqBy } from "lodash";

const cx = classNames.bind(styles);

function ProductCollectionChooseList({ setFinalSelectedProduct }) {
  const [productsData, setProductsData] = useState(null);
  const [collections, setCollections] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]); //chi chua cac id duoc select, do thu vien
  const [productList, setProductList] = useState([]); //product cuoi cung duoc chon
  const [selectedItems, setSelectedItems] = useState([]); //state san pham duoc chon trong popup, khi click select moi set vao selectProduct
  const [selectedProductsSingle, setSelectedProductsSingle] = useState([]); //gom cac san pham duoc chon tu specific
  const [selectedProductsFromCollection, setSelectedProductsFromCollection] =
    useState([]); // gom cac san pham duoc chon tu collection

  const [selectedProductFromTag, setSelectedProductFromTag] = useState([]);

  //call API
  useEffect(() => {
    fetch("http://localhost:8000/getproducts")
      .then(res => res.json())
      .then(data => setProductsData(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/getcollections")
      .then(res => res.json())
      .then(data => setCollections(data));
  }, []);

  //loc lai cac gia tri tu id duoc chon
  useEffect(() => {
    if (productsData) {
      const result = productsData?.data?.products?.edges.filter(product =>
        selectedProduct.includes(product.node.id)
      );
      setProductList(result);
    }
  }, [selectedProduct]);

  //loc ra cac thuoc tinh cua specific product de thiet lap discount
  useEffect(() => {
    const products = productList?.map(item => {
      return {
        id: item.node.id,
        title: item.node.title,
        url: item.node?.images?.edges[0]?.node?.url,
        price: item.node?.priceRangeV2?.minVariantPrice?.amount,
      };
    });
    setSelectedProductsSingle(products);
  }, [productList]);

  //loc all product
  const allProducts = useMemo(() => {
    let all;
    if (productsData) {
      let temp = productsData?.data?.products?.edges;
      all = temp?.map(item => {
        return {
          id: item.node.id,
          title: item.node.title,
          url: item.node?.images?.edges[0]?.node?.url,
          price: item.node?.priceRangeV2?.minVariantPrice?.amount,
        };
      });
    }

    return all;
  }, [productsData]);
  // console.log(allProducts);

  //Chooselist all, specific, collection, tag
  const [selected, setSelected] = useState(["all"]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleChoiceListChange = useCallback(value => setSelected(value), []);
  const handleTextFieldChange = useCallback(
    value => setTextFieldValue(value),
    []
  );
  //set final selected product
  // console.log(allProducts);
  useEffect(() => {
    if (selected == "all" && allProducts?.length > 0) {
      setFinalSelectedProduct(allProducts);
    }
    if (selected == "specific") {
      setFinalSelectedProduct(selectedProductsSingle);
    }
    if (selected == "collection") {
      setFinalSelectedProduct(uniqBy(selectedProductsFromCollection, "id"));
    }

    if (selected == "tags") {
      setFinalSelectedProduct(selectedProductFromTag);
    }
  }, [
    selected,
    selectedProductsSingle,
    selectedProductsFromCollection,
    selectedProductFromTag,
    allProducts,
  ]);

  const ProductChoose = isSelected => {
    return (
      isSelected &&
      productsData && (
        <div className={cx("wrapper")}>
          <ProductChoosePopup
            data={productsData}
            setProduct={setSelectedProduct}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            productList={productList}
          />
          <ResourceList
            resourceName={{ singular: "customer", plural: "customers" }}
            items={productList}
            renderItem={item => {
              // const { id, url, avatarSource, name, location } = item;
              const id = item.node.id;
              const name = item.node.title;
              const url = item.node?.images?.edges[0]?.node?.url;

              return (
                <ResourceItem
                  id={id}
                  media={
                    <Avatar customer size="medium" name={name} source={url} />
                  }
                  accessibilityLabel={`View details for ${name}`}
                  name={name}
                >
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div
                    style={{
                      position: "absolute",
                      right: "2%",
                      top: "30%",
                    }}
                    onClick={() => {
                      setProductList(
                        productList.filter(product => product.node.id !== id)
                      );
                      setSelectedItems(
                        selectedItems.filter(item => item !== id)
                      );
                    }}
                  >
                    <Icon source={MobileCancelMajor} color="base" />
                  </div>
                </ResourceItem>
              );
            }}
          />
        </div>
      )
    );
  };

  return (
    <div>
      {productsData && (
        <ChoiceList
          choices={[
            { label: "All products", value: "all" },
            {
              label: "Specific products",
              value: "specific",
              renderChildren: ProductChoose,
            },
            {
              label: "Product collection",
              value: "collection",
              renderChildren: isSelected => {
                return (
                  isSelected && (
                    <CollectionChoose
                      collections={collections}
                      setSelectedProductsFromCollection={
                        setSelectedProductsFromCollection
                      }
                    />
                  )
                );
              },
            },
            {
              label: "Product tags",
              value: "tags",
              renderChildren: isSelected => {
                return (
                  isSelected && (
                    <TagsChoose
                      setSelectedProductFromTag={setSelectedProductFromTag}
                    />
                  )
                );
              },
            },
          ]}
          selected={selected}
          onChange={handleChoiceListChange}
        />
      )}
    </div>
  );
}

export default ProductCollectionChooseList;
