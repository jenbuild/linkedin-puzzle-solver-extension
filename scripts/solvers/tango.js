const solveTango = () => {
  const cells = [
    ...document.querySelector("[data-testid='interactive-grid']").children,
  ]; // get all cells in a flat array

  const data = cells.map((cell) => {
    if (cell.innerHTML.includes("Moon")) {
      return "M";
    } else if (cell.innerHTML.includes("Sun")) {
      return "S";
    } else {
      return "";
    }
  });

  console.log("Tango data:", data);

  const simulateClick = (element) => {
    const opts = { bubbles: true, cancelable: true, view: window };
    element.dispatchEvent(new PointerEvent("pointerdown", opts));
    element.dispatchEvent(new MouseEvent("mousedown", opts));
    element.dispatchEvent(new PointerEvent("pointerup", opts));
    element.dispatchEvent(new MouseEvent("mouseup", opts));
    element.click();
  };
};
