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
  Tag,
  Stack,
} from "@shopify/polaris";
import { MobileCancelMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import { uniqBy } from "lodash";
import TagsChoosePopup from "../../utils/tagsChoosePopup";
import Products from "../../utils/getProducts";
import { useMemo } from "react";

function TagsChoose({ setSelectedProductFromTag }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  //call API
  useEffect(() => {
    fetch("http://localhost:8000/getproducts")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  //getTags
  const tagArr = useMemo(() => {
    let result = [];
    Products?.data?.products.edges.forEach(node => {
      result.push(...node.node.tags);
    });
    let tagArray = [];
    result.forEach(tag => {
      if (!tagArray.includes(tag)) tagArray.push(tag);
    });
    return tagArray;
  }, [data]);
  // console.log(tagArr);

  useEffect(() => {
    setSelectedTags(selectedItems);
  }, [selectedItems]);

  const removeTag = useCallback(
    tag => () => {
      setSelectedItems(selectedItems.filter(item => item !== tag));
      setSelectedTags(previousTags =>
        previousTags.filter(previousTag => previousTag !== tag)
      );
    },
    [selectedItems]
  );

  //loc ra cac product tu tags
  let result = useMemo(() => {
    const temp = Products?.data?.products?.edges;
    let firstFilter = [];
    selectedItems.forEach(tag => {
      temp.forEach(product => {
        if (product.node.tags.includes(tag)) firstFilter.push(product.node);
      });
    });

    let secondFilter = uniqBy(firstFilter, "id");
    let result = secondFilter.map(item => {
      return {
        id: item.id,
        title: item.title,
        url: item.images.edges[0].node.url,
        price: item?.priceRangeV2?.minVariantPrice.amount,
      };
    });
    return result;
  }, [selectedItems]);

  useEffect(() => {
    setSelectedProductFromTag(result);
  }, [result]);

  const tagMarkup = selectedTags.map(option => (
    <Tag key={option} onRemove={removeTag(option)} url="/collections/wholesale">
      {option}
    </Tag>
  ));

  return (
    <div>
      <TagsChoosePopup
        tagArray={tagArr}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setSelected={setSelected}
      />
      <Stack spacing="tight">{tagMarkup}</Stack>
    </div>
  );
}
export default TagsChoose;
