import {
  Card,
  Page,
  Layout,
  Modal,
  TextContainer,
  TextField,
  ChoiceList,
} from "@shopify/polaris";

import styles from "../CSS/mystyle.module.scss";
import classNames from "classnames/bind";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import ProductCollectionChooseList from "../components/productChoose/productCollectionChooseList";
import CustomPrice from "../components/customPrice/customPrice";

const cx = classNames.bind(styles);

export default function HomePage() {
  //choose list
  const [selected, setSelected] = useState(["all"]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleChoiceListChange = useCallback(value => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    value => setTextFieldValue(value),
    []
  );

  //popup
  const [active, setActive] = useState(true);
  const handleChange = useCallback(() => setActive(!active), [active]);

  return (
    <Page fullWidth>
      <TitleBar title="New Pricing Rule" primaryAction={null} />
      <div className={cx("wrapper")}>
        <div className={cx("input-container")}>
          <Layout>
            <Layout.Section>
              <Card>
                <div className={cx("card", "general")}>
                  <label className={cx("label-title")}>
                    General infomation
                  </label>
                  <div className={cx("card-item", "namebox")}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" />
                  </div>
                  <div className={cx("card-item", "quantitybox")}>
                    <label htmlFor="quantity">Priority</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="0"
                      max="99"
                    />

                    <p className={cx("priority-tips")}>
                      Please enter an integer from 0 to 99.0 is the highest
                      priority.
                    </p>
                  </div>
                  <div className={cx("card-item", "status")}>
                    <label htmlFor="hall">Status</label>
                    <select name="hall" id="hall">
                      <option value="enable">Enable</option>
                      <option value="disable">Disable</option>
                    </select>
                  </div>
                </div>
              </Card>
              <Card>
                <div className={cx("card")}>
                  <label className={cx("label-title")}>Apply to Products</label>
                  <div className={cx("card-item")}>
                    <div className={cx("custom-price")}>
                      <ProductCollectionChooseList />
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className={cx("card")}>
                  <label className={cx("label-title")}>Custom Prices</label>
                  <div className={cx("custom-price")}>
                    <div style={{ height: "150px", width: "100%" }}>
                      <CustomPrice />
                    </div>
                  </div>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </div>
        <div className={cx("output-container")}>
          <h1>Hello</h1>
        </div>
      </div>
    </Page>
  );
}
