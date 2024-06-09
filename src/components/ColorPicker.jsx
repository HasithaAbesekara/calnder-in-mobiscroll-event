import { Popup } from "@mobiscroll/react";
import { useMemo, useRef } from "react";
import { colors } from "../utils/data";

function ColorPicker({
  colorPickerOpen,
  colorAnchor,
  colorButtons,
  colorResponsive,
  changeColor,
  tempColor,
  selectColor,
  setSelectedColor,
  setColorPickerOpen,
}) {
  const colorPicker = useRef();

  return (
    <Popup
      display="bottom"
      contentPadding={false}
      showArrow={false}
      showOverlay={false}
      anchor={colorAnchor}
      isOpen={colorPickerOpen}
      buttons={colorButtons}
      responsive={colorResponsive}
      ref={colorPicker}
    >
      <div className="crud-color-row">
        {colors.map((color, index) => {
          if (index < 5) {
            return (
              <div
                key={index}
                onClick={changeColor}
                className={
                  "crud-color-c " + (tempColor === color ? "selected" : "")
                }
                data-value={color}
              >
                <div
                  className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
                  style={{ background: color }}
                ></div>
              </div>
            );
          } else return null;
        })}
      </div>
      <div className="crud-color-row">
        {colors.map((color, index) => {
          if (index >= 5) {
            return (
              <div
                key={index}
                onClick={changeColor}
                className={
                  "crud-color-c " + (tempColor === color ? "selected" : "")
                }
                data-value={color}
              >
                <div
                  className="crud-color mbsc-icon mbsc-font-icon mbsc-icon-material-check"
                  style={{ background: color }}
                ></div>
              </div>
            );
          } else return null;
        })}
      </div>
    </Popup>
  );
}

export default ColorPicker;
