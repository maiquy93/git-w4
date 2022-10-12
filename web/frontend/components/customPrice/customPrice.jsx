import { TextField, ChoiceList } from "@shopify/polaris";
import { useState, useCallback } from "react";

function CustomPrice({
  singleAmount,
  setSingleAmount,
  emptySingle,
  setEmptySingle,
  fixedAmount,
  setFixedAmount,
  emptyFixed,
  setEmptyFixed,
  percentAmount,
  setPercentAmount,
  emptyPercent,
  setEmptyPercent,
  selected,
  setSelected,
  singleAmountIncorect,
  setSingleAmountIncorect,
  fixedAmountIncorect,
  setFixedAmountIncorect,
  percentAmountIncorect,
  setPercentAmountIncorect,
}) {
  const handleChoiceListChange = useCallback(value => setSelected(value), []);

  const handleTextFieldChange = useCallback(
    value => setTextFieldValue(value),
    []
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
                      placeholder=""
                      type="number"
                      style={{ width: "100%", padding: "5px 10px" }}
                      value={singleAmount}
                      onChange={e => {
                        if (!e.target.value.startsWith("-")) {
                          setSingleAmount(e.target.value);
                        }

                        setEmptySingle(false);
                        setSingleAmountIncorect(false);
                      }}
                    />
                    {singleAmountIncorect && (
                      <span style={{ color: "red" }}>Amount incorect</span>
                    )}
                    {emptySingle && (
                      <span style={{ color: "red" }}>
                        This field can be not empty
                      </span>
                    )}
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
                      type="number"
                      id="amount"
                      value={fixedAmount}
                      placeholder=""
                      style={{ width: "100%", padding: "5px 10px" }}
                      onChange={e => {
                        if (!e.target.value.startsWith("-")) {
                          setFixedAmount(e.target.value);
                        }

                        setEmptyFixed(false);
                        setFixedAmountIncorect(false);
                      }}
                    />
                    {fixedAmountIncorect && (
                      <span style={{ color: "red" }}>Amount incorect</span>
                    )}
                    {emptyFixed && (
                      <span style={{ color: "red" }}>
                        This field can be not empty
                      </span>
                    )}
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
                      value={percentAmount}
                      onChange={e => {
                        setPercentAmount(e.target.value);
                        setEmptyPercent(false);
                        setPercentAmountIncorect(false);
                      }}
                      min={0}
                      max={99}
                      placeholder="%"
                      style={{ width: "100%", padding: "5px 10px" }}
                    ></input>
                    {percentAmountIncorect && (
                      <span style={{ color: "red" }}>Amount incorect</span>
                    )}
                    {emptyPercent && (
                      <span style={{ color: "red" }}>
                        This field can be not empty
                      </span>
                    )}
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
