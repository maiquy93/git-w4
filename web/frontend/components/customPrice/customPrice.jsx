import { TextField, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from "react";

function CustomPrice() {
  const [selected, setSelected] = useState(["single"]);
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleChoiceListChange = useCallback(value => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    value => setTextFieldValue(value),
    []
  );

  const renderChildren = useCallback(
    isSelected =>
      isSelected && (
        <TextField
          label="Minimum Quantity"
          labelHidden
          onChange={handleTextFieldChange}
          value={textFieldValue}
          autoComplete="off"
        />
      ),
    [handleTextFieldChange, textFieldValue]
  );

  return (
    <div>
      <ChoiceList
        choices={[
          {
            label: "Apply a price to selected products",
            value: "single",
            renderChildren: isSelected => {
              return (
                isSelected && (
                  <div>
                    <label htmlFor="amount">Amount</label>
                    <br />
                    <input
                      id="amount"
                      placeholder="0₫"
                      style={{ width: "100%", padding: "5px 10px" }}
                    />
                  </div>
                )
              );
            },
          },
          {
            label:
              "Decrease a fixed amount of the original prices of selected products ",
            value: "fixed",
            renderChildren: isSelected => {
              return (
                isSelected && (
                  <div>
                    <label htmlFor="amount">Amount</label>
                    <br />
                    <input
                      id="amount"
                      placeholder="0₫"
                      style={{ width: "100%", padding: "5px 10px" }}
                    />
                  </div>
                )
              );
            },
          },
          {
            label:
              "Decrease the original prices of selected products by percentage (%)",
            value: "percent",
            renderChildren: isSelected => {
              return (
                isSelected && (
                  <div>
                    <input
                      type="number"
                      id="amount"
                      min={0}
                      max={99}
                      placeholder="%"
                      style={{ width: "100%", padding: "5px 10px" }}
                    ></input>
                  </div>
                )
              );
            },
          },
        ]}
        selected={selected}
        onChange={handleChoiceListChange}
      />
    </div>
  );
}
export default CustomPrice;
