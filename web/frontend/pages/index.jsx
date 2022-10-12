import { Card, Page, Layout } from "@shopify/polaris";
import styles from "../CSS/mystyle.module.scss";
import classNames from "classnames/bind";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState, useCallback } from "react";
import ProductCollectionChooseList from "../components/productChoose/productCollectionChooseList";
import CustomPrice from "../components/customPrice/customPrice";
import { v4 as uuidv4 } from "uuid";

import { useEffect } from "react";

const cx = classNames.bind(styles);

export default function HomePage() {
  //general
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("enable");
  const [emptyName, setEmptyName] = useState(false);
  const [emptyPriority, setEmptyPriority] = useState(false);
  const [incorectPriority, setIncorectPriority] = useState(false);

  //choose product
  const [finalSelectedProduct, setFinalSelectedProduct] = useState([]);
  console.log(finalSelectedProduct);

  //rule
  const [rules, setRule] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("rules")) {
      setRule(JSON.parse(localStorage.getItem("rules")));
    }
  }, []);

  //Custom price
  const [singleAmount, setSingleAmount] = useState("");
  const [fixedAmount, setFixedAmount] = useState("");
  const [percentAmount, setPercentAmount] = useState("");
  const [emptySingle, setEmptySingle] = useState(false);
  const [emptyFixed, setEmptyFixed] = useState(false);
  const [emptyPercent, setEmptyPercent] = useState(false);
  const [singleAmountIncorect, setSingleAmountIncorect] = useState(false);
  const [fixedAmountIncorect, setFixedAmountIncorect] = useState(false);
  const [percentAmountIncorect, setPercentAmountIncorect] = useState(false);

  const [selected, setSelected] = useState(["single"]);

  //table data
  const [currentData, setCurrentData] = useState([]);
  const [dataRender, setDataRender] = useState([]);
  // console.log("currentData", currentData);
  // console.log(dataRender);

  const singleCalculator = (price, amount) => {
    if (amount <= price) {
      return amount;
    } else return price;
  };
  const fixedCalculator = (price, amount) => {
    if (amount <= price) {
      return price - amount;
    } else return 0;
  };
  const percentCalculator = (price, amount) => {
    return price - (amount * price) / 100;
  };

  useEffect(() => {
    if (currentData?.status == "enable") {
      if (currentData?.type == "single") {
        const temp = currentData?.products.map(item => {
          return {
            id: item.id,
            url: item.url,
            title: item.title,
            price: singleCalculator(
              Number(item.price),
              Number(currentData.amount)
            ),
            costPrice: Number(item.price),
            currencyCode: item.currencyCode,
          };
        });
        setDataRender(temp);
      }
      if (currentData.type == "fixed") {
        const temp = currentData.products.map(item => {
          return {
            id: item.id,
            url: item.url,
            title: item.title,
            price: fixedCalculator(
              Number(item.price),
              Number(currentData.amount)
            ),
            costPrice: Number(item.price),
            currencyCode: item.currencyCode,
          };
        });
        setDataRender(temp);
      }
      if (currentData.type == "percent") {
        const temp = currentData.products.map(item => {
          return {
            id: item.id,
            url: item.url,
            title: item.title,
            price: percentCalculator(
              Number(item.price),
              Number(currentData.amount)
            ),
            costPrice: Number(item.price),
            currencyCode: item.currencyCode,
          };
        });
        setDataRender(temp);
      }
    } else {
      const temp = currentData?.products?.map(item => {
        return {
          id: item.id,
          url: item.url,
          title: item.title,
          price: Number(item.price),
          costPrice: Number(item.price),
          currencyCode: item.currencyCode,
        };
      });
      setDataRender(temp);
    }
  }, [currentData]);

  //handle click preview
  const handlePreview = async () => {
    //validate
    const priorityReg = "^([0-9]|([1-9][0-9])|100)$";
    const regNumber = "^[+-]?(([1-9][0-9]*)?[0-9](.[0-9]*)?|.[0-9]+)$";
    const percentReg =
      "^(100(.0{0,2}?)?$|([1-9]{0,1})([0-9]{1})((.[0-9]{0,2})|(,[0-9]{0,2}))?)$";
    if (finalSelectedProduct.length == 0) {
      alert("Please select a product to apply equal");
    }
    if (!name) setEmptyName(true);
    if (!priority) setEmptyPriority(true);
    if (priority && !priority.match(priorityReg)) setIncorectPriority(true);
    if (priority && Number(priority) > 99) setIncorectPriority(true);
    if (selected == "single" && !singleAmount) setEmptySingle(true);
    if (selected == "fixed" && !fixedAmount) setEmptyFixed(true);
    if (selected == "percent" && !percentAmount) setEmptyPercent(true);
    if (selected == "single" && singleAmount && !singleAmount.match(regNumber))
      setSingleAmountIncorect(true);
    if (selected == "fixed" && fixedAmount && !fixedAmount.match(regNumber))
      setFixedAmountIncorect(true);
    if (
      selected == "percent" &&
      percentAmount &&
      !percentAmount.match(percentReg)
    )
      setPercentAmountIncorect(true);
    if (selected == "percent" && percentAmount && Number(percentAmount > 100))
      setPercentAmountIncorect(true);

    //create rule
    if (
      selected == "single" &&
      name &&
      priority &&
      Number(priority) < 100 &&
      singleAmount &&
      singleAmount.match(regNumber) &&
      priority.match(priorityReg) &&
      finalSelectedProduct.length > 0
    ) {
      const temp = {
        id: uuidv4(),
        name: name,
        priority: priority,
        status: status,
        type: "single",
        amount: singleAmount,
        products: finalSelectedProduct,
      };

      setCurrentData(temp);
      return temp;
    }
    if (
      selected == "fixed" &&
      name &&
      priority &&
      Number(priority) < 100 &&
      fixedAmount &&
      priority.match(priorityReg) &&
      fixedAmount.match(regNumber) &&
      finalSelectedProduct.length > 0
    ) {
      const temp = {
        id: uuidv4(),
        name: name,
        priority: priority,
        status: status,
        type: "fixed",
        amount: fixedAmount,
        products: finalSelectedProduct,
      };
      setCurrentData(temp);
      return temp;
    }
    if (
      selected == "percent" &&
      name &&
      priority &&
      Number(priority) < 100 &&
      priority.match(priorityReg) &&
      percentAmount.match(percentReg) &&
      Number(percentAmount <= 100) &&
      finalSelectedProduct.length > 0
    ) {
      const temp = {
        id: uuidv4(),
        name: name,
        priority: priority,
        status: status,
        type: "percent",
        amount: percentAmount,
        products: finalSelectedProduct,
      };
      setCurrentData(temp);
      return temp;
    }
  };

  //handle create rule
  const handleCreate = async () => {
    const result = await handlePreview();
    if (result) {
      setRule(prev => [...prev, result]);
      const temp = [...rules, result];
      localStorage.setItem("rules", JSON.stringify(temp));
    }
  };

  //handle select rule
  const handleSelect = id => {
    const temp = rules.filter(rule => rule.id === id);
    setCurrentData(temp[0]);
  };

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
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={e => {
                        if (!e.target.value.startsWith(" ")) {
                          setName(e.target.value);
                        }

                        setEmptyName(false);
                      }}
                    />
                    {emptyName && (
                      <span className={cx("warning")}>Name can not empty</span>
                    )}
                  </div>
                  <div className={cx("card-item", "quantitybox")}>
                    <label htmlFor="quantity">Priority</label>
                    <input
                      type="number"
                      id="quantity"
                      min="0"
                      max="99"
                      value={priority}
                      onChange={e => {
                        setPriority(e.target.value);
                        setEmptyPriority(false);
                        setIncorectPriority(false);
                      }}
                    />
                    {emptyPriority && (
                      <span className={cx("warning")}>
                        Priority cannot empty
                      </span>
                    )}
                    {incorectPriority && (
                      <span className={cx("warning")}>Priority incorect</span>
                    )}

                    <p className={cx("priority-tips")}>
                      Please enter an integer from 0 to 99.0 is the highest
                      priority.
                    </p>
                  </div>
                  <div className={cx("card-item", "status")}>
                    <label htmlFor="hall">Status</label>
                    <select
                      style={{
                        padding: "3px 0",
                      }}
                      name="hall"
                      id="hall"
                      value={status}
                      onChange={e => {
                        setStatus(e.target.value);
                      }}
                    >
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
                      <ProductCollectionChooseList
                        finalSelectedProduct={finalSelectedProduct}
                        setFinalSelectedProduct={setFinalSelectedProduct}
                      />
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <div className={cx("card")}>
                  <label className={cx("label-title")}>Custom Prices</label>
                  <div className={cx("custom-price")}>
                    <div style={{ width: "100%" }}>
                      <CustomPrice
                        singleAmount={singleAmount}
                        setSingleAmount={setSingleAmount}
                        emptySingle={emptySingle}
                        setEmptySingle={setEmptySingle}
                        fixedAmount={fixedAmount}
                        setFixedAmount={setFixedAmount}
                        emptyFixed={emptyFixed}
                        setEmptyFixed={setEmptyFixed}
                        percentAmount={percentAmount}
                        setPercentAmount={setPercentAmount}
                        emptyPercent={emptyPercent}
                        setEmptyPercent={setEmptyPercent}
                        selected={selected}
                        setSelected={setSelected}
                        singleAmountIncorect={singleAmountIncorect}
                        setSingleAmountIncorect={setSingleAmountIncorect}
                        fixedAmountIncorect={fixedAmountIncorect}
                        setFixedAmountIncorect={setFixedAmountIncorect}
                        percentAmountIncorect={percentAmountIncorect}
                        setPercentAmountIncorect={setPercentAmountIncorect}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "80%" }}></div>
                  <button
                    className={cx("createbtn")}
                    style={{
                      display: "block",
                      flex: "1",
                      marginBottom: "2vh",
                      margin: "2vh 3%",
                      border: "none",
                      color: "#fff",
                      backgroundColor: "green",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontWeight: "600",
                    }}
                    onClick={handleCreate}
                  >
                    Create
                  </button>
                  <button
                    className={cx("previewbtn")}
                    style={{
                      display: "block",
                      flex: "1",
                      marginBottom: "2vh",
                      margin: "2vh 3%",
                      border: "none",
                      color: "#fff",
                      backgroundColor: "DarkCyan",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      fontWeight: "600",
                    }}
                    onClick={handlePreview}
                  >
                    Preview
                  </button>
                </div>
              </Card>
            </Layout.Section>
            <Layout.Section>
              <Card>
                <label
                  className={cx("label-title")}
                  style={{ marginLeft: "20px" }}
                >
                  Pricing Rule Preview
                </label>
                <div className={cx("pricing-show")}>
                  {rules.map((rule, index) => {
                    return (
                      <div key={index} className={cx("rule-box")}>
                        <button onClick={() => handleSelect(rule.id)}>
                          {rule.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </div>
        <div className={cx("output-container")}>
          <div className={cx("table-title")}>{`Product pricing detail for "${
            currentData?.name || "Choose one "
          }"`}</div>
          <table className={cx("table")}>
            <thead>
              <tr>
                <td>Title</td>
                <td>Modified Price</td>
                <td>Cost Price</td>
              </tr>
            </thead>
            {status == "enable" && (
              <tbody>
                {dataRender?.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product?.title}</td>
                      <td>{`${product?.price} ${product.currencyCode}`}</td>
                      <td>{`${product?.costPrice} ${product.currencyCode}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </Page>
  );
}
