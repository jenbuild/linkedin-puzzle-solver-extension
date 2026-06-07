// async function loadCrossclimbData() {
//   const url = chrome.runtime.getURL("data/answers.json");

//   const response = await fetch(url);

//   return response.json();
// }

const solveCrossclimb = async () => {
  // const data = await loadCrossclimbData();

  const clues = [];
  const elements = [...document.querySelectorAll("[data-guess-id]")];

  const simulateClick = (element) => {
    const opts = { bubbles: true, cancelable: true, view: window };
    element.dispatchEvent(new PointerEvent("pointerdown", opts));
    element.dispatchEvent(new MouseEvent("mousedown", opts));
    element.click();
  };

  // helper: small async sleep
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  console.log(elements[4]);
  simulateClick(elements[4]);
  elements[4].setAttribute("data-guess-id", "1");
  await sleep(100);
};

// for (let i = 1; i < elements.length - 2; i++) {
//   const innerElement = elements[i].querySelectorAll(
//     ".crossclimb-guess-inner",
//   )[0];
//   simulateClick(elements[i]);
//   const inputBoxes = [...elements[i].querySelectorAll("input")];
//   await sleep(100);
//   const clue = document
//     .querySelectorAll("p.crossclimb__clue")[0]
//     .innerHTML.trim();

//   const answer = data["crossclimb"].find((item) => item.clue == clue).answer;

//   for (let i = 0; i < inputBoxes.length; i++) {
//     simulateClick(inputBoxes[i]);
//     const event = new Event("input", { bubbles: true });
//     await sleep(100);
//     inputBoxes[i].value = answer[i];
//     inputBoxes[i].dispatchEvent(event);
//     await sleep(100);
//   }
//   clues.push({ clue, answer });
// }
