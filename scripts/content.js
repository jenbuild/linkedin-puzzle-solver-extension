function renderSolveButton() {
  if (!document.body) return;

  const solveButton = document.createElement("button");
  solveButton.innerText = "Solve";
  solveButton.id = "puzzle-solver-btn";

  document.body.appendChild(solveButton);

  // Solving 6x6 Sudoku with 2x3 blocks using backtracking
  function solve6x6(inputArr) {
    const N = 6;
    const blockRows = 2; // 2 rows per block
    const blockCols = 3; // 3 cols per block

    // build numeric grid (0 for empty)
    const grid = [];
    for (let r = 0; r < N; r++) {
      grid[r] = inputArr.slice(r * N, (r + 1) * N).map((v) => {
        const n = parseInt(v, 10);
        return Number.isFinite(n) ? n : 0;
      });
    }

    function isSafe(r, c, val) {
      for (let i = 0; i < N; i++) if (grid[r][i] === val) return false;
      for (let i = 0; i < N; i++) if (grid[i][c] === val) return false;
      const br = Math.floor(r / blockRows) * blockRows;
      const bc = Math.floor(c / blockCols) * blockCols;
      for (let i = 0; i < blockRows; i++) {
        for (let j = 0; j < blockCols; j++) {
          if (grid[br + i][bc + j] === val) return false;
        }
      }
      return true;
    }

    function backtrack() {
      for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
          if (grid[r][c] === 0) {
            for (let val = 1; val <= N; val++) {
              if (isSafe(r, c, val)) {
                grid[r][c] = val;
                if (backtrack()) return true;
                grid[r][c] = 0;
              }
            }
            return false;
          }
        }
      }
      return true; // solved
    }

    if (backtrack()) return grid.flat();
    return null;
  }

  // On click, read the board, solve it, and fill in the answers
  solveButton.addEventListener("click", async () => {
    const cells = [...document.querySelectorAll(".sudoku-cell-content")]; //get all cells in a flat array
    const data = cells.map((cell) =>
      (cell.textContent || "").replace(/\D/g, ""),
    ); // extract digits only, empty string for blanks

    const solved = solve6x6(data); // returns flat array of 36 values or null if no solution

    if (!solved) {
      alert("No solution found");
      console.warn("No solution for:", data);
      return;
    }

    // choose one cell to leave empty: prefer an originally empty cell
    const emptyIndices = data
      .map((v, idx) => (v === "" ? idx : -1))
      .filter((i) => i !== -1);
    let indexToLeaveEmpty = -1;
    if (emptyIndices.length > 0) {
      indexToLeaveEmpty = emptyIndices[0];
    }

    // helper: small async sleep
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    // simulate a click on an element (to activate the cell for input)
    const simulateClick = (element) => {
      const opts = { bubbles: true, cancelable: true, view: window };
      element.dispatchEvent(new PointerEvent("pointerdown", opts));
      element.dispatchEvent(new MouseEvent("mousedown", opts));
      element.dispatchEvent(new PointerEvent("pointerup", opts));
      element.dispatchEvent(new MouseEvent("mouseup", opts));
      element.click();
    };

    // fill in the cells with the solved values
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];

      if (i != indexToLeaveEmpty && emptyIndices.includes(i)) {
        const parent = cell.parentElement;
        if (!parent) continue;
        else {
          simulateClick(parent);
          const contentCell = parent.querySelector(".sudoku-cell-content");
          if (contentCell) {
            const inputButton = document.querySelector(
              `[data-number="${solved[i]}"]`,
            ); // find the input button for the solved value
            if (inputButton) {
              simulateClick(inputButton);
            }
          }

          await sleep(100); // wait for any click-related updates
        }
      }
    }
  });
}

renderSolveButton();
