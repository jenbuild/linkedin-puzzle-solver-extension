function renderSolveButton() {
  if (!document.body) return;

  const solveButton = document.createElement("button");
  solveButton.innerText = "Solve";
  solveButton.id = "puzzle-solver-btn";

  document.body.appendChild(solveButton);

  solveButton.addEventListener("click", () => {
    console.log("Solve clicked");
  });
}

renderSolveButton();
