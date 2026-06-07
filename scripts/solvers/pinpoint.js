async function loadPinpointData() {
  const url = chrome.runtime.getURL("data/answers.json");

  const response = await fetch(url);

  return response.json();
}

const solvePinpoint = async () => {
  const result = await loadPinpointData();
  const board = document.querySelector(".pinpoint__board");
  let answer;

  const cells = [
    ...board.querySelectorAll(".pinpoint__card.pinpoint__card--clue"),
  ];

  const simulateClick = (element) => {
    const opts = { bubbles: true, cancelable: true, view: window };
    element.dispatchEvent(new PointerEvent("pointerdown", opts));
    element.dispatchEvent(new MouseEvent("mousedown", opts));
    element.click();
  };

  // helper: small async sleep
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const data = cells.map((cell) => cell.textContent.trim());

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const clue = cell.textContent.trim();

    answer = result["pinpoint"].find((item) => item.clue == clue).answer;
  }

  const inputBox = document.querySelector("input.pinpoint__input");
  simulateClick(inputBox);
  const event = new Event("input", { bubbles: true });
  await sleep(100);
  inputBox.value = answer;
  inputBox.dispatchEvent(event);
  await sleep(100);

  const submitButton = document.querySelector("button.pinpoint__submit-btn");
  simulateClick(submitButton);
  await sleep(100);
};
