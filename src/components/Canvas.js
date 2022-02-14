import { fabric } from "fabric";
import React, { useEffect } from "react";
import fg from "../assets/template.png";
import { saveAs } from "file-saver";

function Canvas() {
  useEffect(() => {
    initCanvas();
  });

  const addNewText = (canvi) => {
    var addTextBtn = document.querySelector("#btn-addText");
    addTextBtn.onclick = () => {
      addText(canvi, "New Text");
    };
  };

  const downloadImage = (canvi) => {
    var link = document.querySelector("#btn-save");
    link.onclick = () => {
      var imgData = canvi.toDataURL({
        format: "png",
        quality: 1,
        multipier: 3,
        width: 530,
        height: 530,
        left: 135,
        top: 135,
      });
      saveAs(imgData, "magic-image.png");
    };
  };

  const pickBg = (canvi) => {
    var bgpicker = document.querySelector("#backgroundpick");
    bgpicker.onchange = (e) => {
      var file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = function (file) {
        addImageAndClip(canvi, file.target.result);
      };
      return file ? reader.readAsDataURL(file) : null;
    };
  };

  const addImageAndClip = (canvi, url) => {
    const rect = new fabric.Rect({
      originX: "center",
      originY: "center",
      left: 400,
      top: 400,
      width: 530,
      height: 530,
      absolutePositioned: true,
      fill: "yellow",
    });

    fabric.Image.fromURL(url, (e) => {
      e.set({
        originY: "center",
        originX: "center",
        scaleX: 0.5,
        scaleY: 0.5,
        left: 400,
        top: 350,
        clipPath: rect,
      });
      canvi.add(e);
      canvi.renderAll();
    });
  };

  const addText = (canvi, text) => {
    var textbox = new fabric.Textbox(text, {
      originY: "center",
      originX: "center",
      left: 400,
      top: 530,
      width: 320,
      fontSize: 28,
      fill: "#000000",
      fontFamily: "Open Sans",
      fontWeight: 800,
      textAlign: "center",
      cornerSize: 12,
      transparentCorners: false,
    });
    canvi.add(textbox);
    canvi.setActiveObject(textbox);
    return textbox;
  };

  const changeTextColor = (canvi) => {
    let colorPicker = document.querySelector("#colorPicker");
    let colorInput = document.querySelector("#colorPickerInput");
    let activeTextArr = [];
    let val = "#000000";
    colorPicker.onmousedown = () => {
      activeTextArr = canvi
        .getActiveObjects()
        .filter((e) => e instanceof fabric.Textbox);
      console.log(activeTextArr);
    };
    colorPicker.onmousemove = () => {
      val = colorInput.value;
      activeTextArr.forEach((e) => e.set("fill", `#${val}`));
      canvi.renderAll();
    };
    colorInput.onmousedown = () => {
      activeTextArr = canvi
        .getActiveObjects()
        .filter((e) => e instanceof fabric.Textbox);
      console.log(activeTextArr);
    };
    colorInput.onchange = () => {
      val = colorInput.value;
      console.log(activeTextArr, val);
      activeTextArr.forEach((e) => e.set("fill", `#${val}`));
      canvi.renderAll();
    };
  };

  const changeTextFont = (canvi) => {
    let fontArr = document.querySelectorAll(".fontOption");
    let activeTextArr = [];
    fontArr.forEach((font) => {
      font.onclick = () => {
        activeTextArr = canvi
          .getActiveObjects()
          .filter((e) => e instanceof fabric.Textbox);
        activeTextArr.forEach((e) => e.set("fontFamily", font.innerHTML));
        console.log(activeTextArr, font.innerHTML);
        canvi.renderAll();
      };
    });
  };

  const initCanvas = () => {
    const mainCanvas = new fabric.Canvas("mainCanvas", {
      height: 800,
      width: 800,
      backgroundColor: "#eee",
      preserveObjectStacking: true,
      controlsAboveOverlay: true,
    });
    addImageAndClip(mainCanvas);
    addNewText(mainCanvas);
    downloadImage(mainCanvas);
    pickBg(mainCanvas);
    changeTextColor(mainCanvas);
    changeTextFont(mainCanvas);
    return mainCanvas;
  };

  return (
    <div className="App-Canvas">
      <canvas id="mainCanvas" />
      <img className="gui" src={fg} alt="gui" />
    </div>
  );
}

export default Canvas;
