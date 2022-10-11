import {
  Button,
  Modal,
  TextContainer,
  ResourceList,
  Avatar,
  ResourceItem,
  TextStyle,
  Card,
  Icon,
} from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";

function ProductChoosePopup({
  data,
  setProduct,
  selectedItems,
  setSelectedItems,
  productList,
}) {
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchItem, setSearchItem] = useState([]);

  useEffect(() => {
    setSearchItem(productList);
  }, [productList]);

  //search products
  useEffect(() => {
    if (!searchValue) setSearchItem(data?.data?.products?.edges);
  }, [data]);

  const handleChangeSearchResult = () => {
    const temp = data.data.products.edges;
    const result = temp.filter(product =>
      product.node.title
        .toLowerCase()
        .includes(searchValue.trim().toLowerCase())
    );
    setSearchItem(result);
  };

  //ready items to render
  var items = searchItem.map(item => {
    return {
      id: item.node.id,
      name: item.node.title,
      url: item.node?.images?.edges[0]?.node?.url,
    };
  });

  //popup control(on/off)
  const opendPopup = useCallback(() => setActive(!active), [active]);

  const activator = <input onClick={opendPopup} placeholder="Search product" />;

  //Product label
  const resourceName = {
    singular: "product",
    plural: "products",
  };

  //Handle select item
  function addProduct() {
    setProduct(selectedItems);
    opendPopup();
  }

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
        onClose={opendPopup}
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
              onSelectionChange={setSelectedItems}
              selectable
            />
          </Card>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default ProductChoosePopup;
