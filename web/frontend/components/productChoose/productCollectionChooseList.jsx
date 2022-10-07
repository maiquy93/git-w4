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
import axios from "axios";
import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import fakeData from "../../utils/fakeData";

const cx = classNames.bind(styles);

function ProductCollectionChooseList() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productList, setProductList] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(productList);

  useEffect(() => {
    const result = fakeData.data.products.edges.filter(product =>
      selectedProduct.includes(product.node.id)
    );

    setProductList(result);
  }, [selectedProduct]);

  //try call API

  //Chooselist
  const [selected, setSelected] = useState(["none"]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleChoiceListChange = useCallback(value => setSelected(value), []);
  const handleTextFieldChange = useCallback(
    value => setTextFieldValue(value),
    []
  );

  const ProductChoose = isSelected => {
    return (
      isSelected && (
        <div className={cx("wrapper")}>
          <ProductChoosePopup
            data={fakeData}
            setProduct={setSelectedProduct}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
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
  const collectionChoose = isSelected => {
    return isSelected && <div className={cx("wrapper")}></div>;
  };
  return (
    <div>
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
              return isSelected && <h1>Collection</h1>;
            },
          },
          {
            label: "Product tags",
            value: "tag",
            renderChildren: isSelected => {
              return isSelected && <h1>Tags</h1>;
            },
          },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
    </div>
  );
}

export default ProductCollectionChooseList;
