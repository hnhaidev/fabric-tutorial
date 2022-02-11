import { HexColorPicker, HexColorInput } from "react-colorful";
import { useState } from "react";

function ColorPicker() {
  const [color, setColor] = useState("#000000");

  return (
    <div id="AppColorPicker">
      <HexColorPicker id="colorPicker" color={color} onChange={setColor} />
      <HexColorInput id="colorPickerInput" color={color} onChange={setColor} />
    </div>
  );
}

export default ColorPicker;
