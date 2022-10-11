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
import styles from "./collectionChoose.module.scss";
import classNames from "classnames/bind";
import CollectionChoosePopup from "../../utils/collectionChoosePopup";
import { useEffect } from "react";

const cx = classNames.bind(styles);

function CollectionChoose({
  setSelectedProductsFromCollection,
  collections,
  collectionList,
  setCollectionList,
  selectedCollection,
  setSelectedCollection,
}) {
  // const [selectedCollection, setSelectedCollection] = useState([]); //chi chua cac id duoc select, do thu vien
  // const [collectionList, setCollectionList] = useState([]); //collections cuoi cung duoc chon
  const [selectedItems, setSelectedItems] = useState([]); //state san pham duoc chon trong popup, khi click select moi set vao selectProduct

  //loc lai cac gia tri tu id duoc chon
  useEffect(() => {
    if (collections) {
      const result = collections?.data.collections.edges.filter(collection =>
        selectedCollection.includes(collection.node.id)
      );
      setCollectionList(result);
    }
  }, [selectedCollection]);

  //loc ra san pham duoc chon tu collection
  useEffect(() => {
    const filter = [];
    collectionList.forEach(item => {
      filter.push(...item.node.products.edges);
    });

    const products = filter.map(item => {
      return {
        id: item.node.id,
        title: item.node.title,
        price: item.node.priceRangeV2.minVariantPrice.amount,
        url: item.node.images.edges[0].node.url,
      };
    });
    setSelectedProductsFromCollection(products);
  }, [collectionList]);

  return (
    <div className={cx("wrapper")}>
      {collections && (
        <CollectionChoosePopup
          collections={collections}
          setSelectedCollection={setSelectedCollection}
          selectedItems={selectedItems}
          setSelectItems={setSelectedItems}
          collectionList={collectionList}
        />
      )}
      {collections && (
        <ResourceList
          resourceName={{ singular: "Collection", plural: "Collections" }}
          items={collectionList}
          renderItem={item => {
            // const { id, url, avatarSource, name, location } = item;
            const id = item?.node.id;
            const name = item?.node.title;
            const url = item?.node.images?.url;

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
                    setCollectionList(
                      collectionList.filter(
                        collection => collection.node.id !== id
                      )
                    );
                    setSelectedItems(selectedItems.filter(item => item !== id));
                  }}
                >
                  <Icon source={MobileCancelMajor} color="base" />
                </div>
              </ResourceItem>
            );
          }}
        />
      )}
    </div>
  );
}

export default CollectionChoose;
