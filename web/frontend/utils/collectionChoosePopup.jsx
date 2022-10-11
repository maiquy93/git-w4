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

function CollectionChoosePopup({
  collections,
  selectedCollection,
  setSelectedCollection,
  selectedItems,
  setSelectItems,
  collectionList,
}) {
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItem, setSearchItem] = useState([]);

  const openPopup = useCallback(() => setActive(!active), [active]);

  const activator = <input onClick={openPopup} />;

  useEffect(() => {
    if (!searchValue) setSearchItem(collections?.data?.collections?.edges);
  }, [collections]);

  //search products
  const handleChangeSearchResult = () => {
    const temp = collections?.data?.collections?.edges;
    const result = temp.filter(collection =>
      collection.node.title
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    );
    setSearchItem(result);
  };
  //ready items to render
  var items = searchItem?.map(item => {
    return {
      id: item.node.id,
      name: item.node.title,
      url: item.node?.images?.url,
    };
  });

  //Handle select item
  function addProduct() {
    setSelectedCollection(selectedItems);
    openPopup();
  }

  const resourceName = {
    singular: "product",
    plural: "products",
  };
  //function render of resoure list
  function renderItem(item) {
    const { id, url, name, location } = item;
    const media = <Avatar customer size="medium" name={name} source={url} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
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
        title="Select specific products"
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
              onSelectionChange={setSelectItems}
              selectable
            />
          </Card>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default CollectionChoosePopup;
