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
import { useMemo } from "react";

function TagsChoose({
  setSelectedProductFromTag,
  data,
  selectedTags,
  setSelectedTags,
  selectedItemsSave,
  setSelectedItemsSave,
}) {
  const [selected, setSelected] = useState([]);
  // const [selectedTags, setSelectedTags] = useState([]);
  // const [selectedItemsSave, setSelectedItemsSave] = useState([]);

  //getTags
  const tagArr = useMemo(() => {
    let result = [];
    data?.data?.products.edges.forEach(node => {
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
    setSelectedTags(selectedItemsSave);
  }, [selectedItemsSave]);

  const removeTag = useCallback(
    tag => () => {
      setSelectedItemsSave(selectedItemsSave.filter(item => item !== tag));
      setSelectedTags(previousTags =>
        previousTags.filter(previousTag => previousTag !== tag)
      );
    },
    [selectedItemsSave]
  );

  //loc ra cac product tu tags
  let result = useMemo(() => {
    const temp = data?.data?.products?.edges;
    let firstFilter = [];
    selectedItemsSave.forEach(tag => {
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
  }, [selectedItemsSave]);

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
        selectedItems={selectedItemsSave}
        setSelectedItems={setSelectedItemsSave}
        setSelected={setSelected}
      />
      <Stack spacing="tight">{tagMarkup}</Stack>
    </div>
  );
}
export default TagsChoose;
