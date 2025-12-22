const btn = document.getElementById("calculator");
btn.addEventListener("click", calculate);
const elementRecommendations = {
  NO3: {
    min: 10,
    max: 20,
    unit: "mg/l",
    info: "Nitrates are the primary source of nitrogen for plants. Excess levels may lead to algae blooms.",
  },
  PO4: {
    min: 0.5,
    max: 2,
    unit: "mg/l",
    info: "Phosphates are essential for plant energy metabolism. Excess can stimulate algae growth.",
  },
  K: {
    min: 5,
    max: 20,
    unit: "mg/l",
    info: "Potassium regulates water balance and activates enzymes.",
  },
  Fe: {
    min: 0.1,
    max: 0.5,
    unit: "mg/l",
    info: "Iron is critical for chlorophyll synthesis. Deficiency causes chlorosis (yellowing) of leaves.",
  },
  Mn: {
    min: 0.01,
    max: 0.1,
    unit: "mg/l",
    info: "Manganese participates in photosynthesis and enzyme activation.",
  },
  Cu: {
    min: 0.002,
    max: 0.01,
    unit: "mg/l",
    info: "Copper is needed in trace amounts. Excess is toxic to invertebrates.",
  },
  Mg: {
    min: 5,
    max: 15,
    unit: "mg/l",
    info: "Mg is important",
  },
  Ca: {
    min: 20,
    max: 50,
    unit: "mg/l",
    info: "Ca is important",
  },
  // 'Zn': { min: 0.005, max: 0.02, unit: 'mg/l', info: 'Zinc is important for plant growth hormone synthesis.' },
  // 'B': { min: 0.01, max: 0.05, unit: 'mg/l', info: 'Boron participates in sugar transport and cell wall formation.' },
  // 'Mo': { min: 0.0005, max: 0.002, unit: 'mg/l', info: 'Molybdenum is essential for plant nitrogen metabolism.' }
};

document.getElementById("element").addEventListener("change", function () {
  loadHistory();
});

document
  .getElementById("useCurrentConcentration")
  .addEventListener("change", function () {
    document.getElementById("currentConcentrationGroup").style.display = this
      .checked
      ? "block"
      : "none";
  });

document
  .getElementById("useWaterReplacement")
  .addEventListener("change", function () {
    document.getElementById("waterReplacementGroup").style.display = this
      .checked
      ? "block"
      : "none";
  });

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".target-active").style.display = "none";
  loadHistory();
});

document.getElementById("calc_type").addEventListener("change", function () {
  if (this.value == "target_count") {
    document.querySelector(".dose-active").style.display = "none";
    document.querySelector(".target-active").style.display = "block";
    // document.querySelector('.active').classList.remove('active');
  } else {
    document.querySelector(".dose-active").style.display = "block";
    document.querySelector(".target-active").style.display = "none";
  }
});

function calculate() {
  const calcType = document.getElementById("calc_type").value;
  const targetConcentration = document.getElementById(
    "targetConcentration"
  ).value;
  const aquariumName = document.getElementById("aquariumName").value.trim();
  const volume = parseFloat(document.getElementById("aquariumVolume").value);
  const dose = parseFloat(document.getElementById("dose").value);
  const element = document.getElementById("element").value;
  const useCurrent = document.getElementById("useCurrentConcentration").checked;
  const useWaterReplacement = document.getElementById(
    "useWaterReplacement"
  ).checked;
  const currentConc = useCurrent
    ? parseFloat(document.getElementById("currentConcentration").value) || 0
    : 0;

  const concValue = parseFloat(
    document.getElementById("concentrationValue").value
  );
  const concUnit = document.getElementById("concentrationUnit").value;
  const errorConfirm = document.getElementById("errorConfirm");

  let replacementAmount = parseFloat(
    document.getElementById("replacementAmount").value
  );
  let waterReplacement = useWaterReplacement
    ? (currentConc / (volume - replacementAmount)) * volume
    : currentConc;
  waterReplacement = waterReplacement.toFixed(2);

  if (calcType == "water_change") {
    calculateWaterChange(replacementAmount, volume);
  }
  if (calcType == "udo_count") {
    if (
      isNaN(volume) ||
      isNaN(dose) ||
      isNaN(concValue) ||
      (useCurrent && isNaN(currentConc))
    ) {
      errorConfirm.textContent =
        "Please fill all required fields with valid numeric values!";
      return;
    }
  } else {
    if (
      isNaN(volume) ||
      isNaN(targetConcentration) ||
      isNaN(concValue) ||
      (useCurrent && isNaN(currentConc))
    ) {
      errorConfirm.textContent =
        "Please fill all required fields with valid numeric values!";
      return;
    }
  }

  errorConfirm.textContent = "";
  let concentrationMgPerMl = 0;

  switch (concUnit) {
    case "percent":
      concentrationMgPerMl = concValue * 10;
      break;
    case "mg":
      concentrationMgPerMl = concValue / volume;
      break;
    case "grams":
      concentrationMgPerMl = concValue;
      break;
  }

  let addedConcentration = null;
  let result = null;
  if (calcType == "udo_count") {
    addedConcentration = (dose * concentrationMgPerMl) / volume;
    result = addedConcentration + currentConc;
  } else {
    addedConcentration =
      ((targetConcentration - currentConc) * volume) / concentrationMgPerMl;
    result = addedConcentration;
  }

  const roundedResultOrig = Math.round(result * 1000) / 1000;
  const roundedResult = roundedResultOrig.toFixed(2);
  if (calcType == "udo_count") {
    document.getElementById("resultValue").textContent =
      roundedResult.toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      });
    document.getElementById("result").style.display = "block";
  } else {
    document.getElementById("resultValueTarget").textContent =
      roundedResult.toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      });
    document.getElementById("result-target").style.display = "block";
  }

  const recommendation = elementRecommendations[element];
  let elementInfo = null;

  if (calcType == "udo_count") {
    document.getElementById("result-target").style.display = "none";
    document.getElementById("result").style.display = "block";
    elementInfo = document.getElementById("elementInfo");
    document.getElementById("resultValue").textContent =
      roundedResult.toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      });
    elementInfo.innerHTML = `
                <h4>Recommended values for ${
                  document.getElementById("element").options[
                    document.getElementById("element").selectedIndex
                  ].text
                }:</h4>
                <p>Optimal range: ${recommendation.min}-${recommendation.max} ${
      recommendation.unit
    }</p>
                <p>${recommendation.info}</p>
                <p>Your value: ${roundedResult} ${recommendation.unit} - 
                ${
                  roundedResult < recommendation.min
                    ? "❌ Below recommended"
                    : roundedResult > recommendation.max
                    ? "⚠️ Above recommended"
                    : "✅ Within optimal range"
                }</p>
            `;
    saveToHistory(
      element,
      roundedResult,
      currentConc,
      dose,
      aquariumName,
      waterReplacement
    );
  } else {
    document.getElementById("result-target").style.display = "block";
    document.getElementById("result").style.display = "none";
    elementInfo = document.getElementById("elementInfoTarget");
    document.getElementById("resultValueTarget").textContent =
      roundedResult.toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 2,
      });
    elementInfo.innerHTML = `
                <h4>Recommended values for ${
                  document.getElementById("element").options[
                    document.getElementById("element").selectedIndex
                  ].text
                }:</h4>
                <p>Optimal range: ${recommendation.min}-${recommendation.max} ${
      recommendation.unit
    }</p>
                <p>${recommendation.info}</p>
                <p>Нужно внести: ${roundedResult} мл`;
    saveToHistory(
      element,
      targetConcentration,
      currentConc,
      roundedResult,
      aquariumName,
      waterReplacement
    );
  }

  // saveToHistory(element, roundedResult, currentConc, dose, aquariumName);

  document.getElementById("result").scrollIntoView({ behavior: "smooth" });
}

function saveToHistory(
  element,
  concentration,
  currentConc,
  dose,
  aquariumName,
  waterReplacement
) {
  const history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];
  const elementName =
    document.getElementById("element").options[
      document.getElementById("element").selectedIndex
    ].text;
  let timestamp = new Date(); //.toLocaleString();
  timestamp.setDate(timestamp.getDate());
  timestamp = timestamp.toLocaleDateString();

  history.unshift({
    id: Date.now(),
    aquariumName: aquariumName,
    dose: dose,
    currentConc: currentConc,
    element: element,
    elementName: elementName,
    concentration: concentration,
    waterReplacement: waterReplacement,
    timestamp: timestamp,
  });

  // if (history.length > 10) {
  //     history.pop();
  // }

  localStorage.setItem("fertilizerHistory", JSON.stringify(history));
  loadHistory();
}

function calculateWaterChange(replacementAmount, volume) {
  let waterDiff = volume - replacementAmount;
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];
  const historyContainer = document.getElementById("historyItems");

  if (history.length === 0) {
    historyContainer.innerHTML = "<p>No measurements recorded yet.</p>";
    return;
  }

  historyContainer.innerHTML = "";

  // FILL CURRENT CONC

  let currElementItems = [];
  const element = document.getElementById("element").value;
  const aquariumName = document.getElementById("aquariumName").value.trim();
  history.forEach((item) => {
    if (
      item.element.toLowerCase() == element.toLowerCase() &&
      item.aquariumName.toLowerCase() == aquariumName.toLowerCase()
    ) {
      currElementItems.push(item);
    }
    const recommendation = elementRecommendations[item.element];
    const status =
      item.concentration < recommendation.min
        ? "❌"
        : item.concentration > recommendation.max
        ? "⚠️"
        : "✅";

    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerHTML = `
                    <strong>${
                      item.aquariumName
                        ? item.aquariumName
                        : "Имя аквариума не указано"
                    }</strong><br>
                    <strong>${
                      item.elementName
                    }</strong>: ${item.concentration.toLocaleString("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    })} ${recommendation.unit} ${status}<br>
                    <p><strong>Внесено УДО: </strong> ${
                      item.dose ? item.dose + " ml" : "Нет данных."
                    }</p>
                    <p><strong>Концентрация до внесения УДО: </strong> ${
                      item.currentConc
                        ? item.currentConc + " mg/l"
                        : "Нет данных"
                    }</p>
                    <p><strong>Концентрация до подмены воды: </strong> ${
                      item.waterReplacement
                        ? item.waterReplacement + " mg/l"
                        : "Нет данных"
                    }</p>
                    <small>${item.timestamp}</small>
                    <button class="delete-btn" onclick="deleteHistoryItem(${
                      item.id
                    })">X</button>
                `;
    historyContainer.appendChild(historyItem);



  });
        try {
        let currentConsuming = calculateDailyConsuming(
          currElementItems[0],
          currElementItems[1]
        );
        calculateConsumedAmount(currElementItems[0], currentConsuming);
      } catch (error) {}
}

function deleteHistoryItem(id) {
  let history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];
  history = history.filter((item) => item.id !== id);
  localStorage.setItem("fertilizerHistory", JSON.stringify(history));
  loadHistory();
}

function calculateDailyConsuming(dayOne, dayTwo) {
  let days = (dayOne.id - dayTwo.id) / (1000 * 60 * 60 * 24);
  console.log(days);
  let result = (dayTwo.concentration - dayOne.waterReplacement) / days;

  return result;
}

function calculateConsumedAmount(day, currentConsuming) {
  let currConcentrationElement = document.getElementById(
    "currentConcentration"
  );
  let daysSinceLastMeasurement = (Date.now() - day.id) / (1000 * 60 * 60 * 24);
  let result = day.concentration - currentConsuming * daysSinceLastMeasurement;
  if( result < 0) {
    result = 0;
  }
  currConcentrationElement.value = result.toFixed(2);
}
