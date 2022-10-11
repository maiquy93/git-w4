import {
  Modal,
  TextContainer,
  Button,
  Card,
  Icon,
  ResourceItem,
  ResourceList,
  Avatar,
  TextStyle,
} from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";

function TagsChoosePopup({
  setSelectedCollection,
  selectedItems,
  setSelectedItems,
  setSelected,
  tagArray,
}) {
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItem, setSearchItem] = useState([]);

  const openPopup = useCallback(() => setActive(!active), [active]);

  const activator = <input onClick={openPopup} />;

  //search products
  useEffect(() => {
    if (!searchValue) setSearchItem(tagArray);
  }, [tagArray]);

  const handleChangeSearchResult = () => {
    const temp = tagArray;
    const result = temp.filter(tag =>
      tag.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
    setSearchItem(result);
  };
  //ready items to render
  const items = searchItem?.map(item => {
    return {
      id: item,
      name: item,
    };
  });

  //Handle select item
  function addProduct() {
    setSelected(selectedItems);
    openPopup();
  }

  const resourceName = {
    singular: "tag",
    plural: "tags",
  };
  //function render of resoure list
  function renderItem(item) {
    const { id, name } = item;

    return (
      <ResourceItem id={id} accessibilityLabel={`View details for ${name}`}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
      </ResourceItem>
    );
  }

  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={openPopup}
        title="Select tag"
        primaryAction={{
          content: "Select",
          onAction: addProduct,
        }}
      >
        <Modal.Section>
          {/*Show search item*/}
          <Card>
            <div>
              <div
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "28px",
                }}
              >
                <Icon source={SearchMajor} color="base" />
              </div>
              <input
                style={{
                  width: "100%",
                  padding: "10px 40px",
                  marginBottom: "1vh",
                  outline: "none",
                }}
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.target.value);
                }}
                onKeyUp={handleChangeSearchResult}
              ></input>
            </div>
            <ResourceList
              resourceName={resourceName}
              items={items}
              renderItem={renderItem}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
            />
          </Card>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default TagsChoosePopup;
