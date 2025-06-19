var ctx = document.getElementById("myChart").getContext("2d");
let labels = [];
let dataSets = [];
let dataArrayTotalConcentration = [];
let dataArrayBeforeUDO = [];
let dataArrayDose = [];
let dataArrayWaterChange = [];
let dataLabel = [];

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];

  const historyContainer = document.getElementById("historyItems");
  if (history.length === 0) {
    historyContainer.innerHTML = "<p>No measurements recorded yet.</p>";
    return;
  }
  let element = document.getElementById("element").value;
  let aquarium = document.getElementById("aquarium").value;

  let currentElementItemsArray = [];
  history.forEach((item) => {
    try {
      if (
        item.element.toLowerCase() == element &&
        item.aquariumName.toLowerCase() == aquarium
      ) {
        const historyItem = document.createElement("div");
        let label = item.timestamp;
        labels.push(label);
        let index = history.indexOf(item);
        console.log(item);
        currentElementItemsArray.push(item);

        dataArrayTotalConcentration.push(item.concentration);
        dataArrayBeforeUDO.push(item.currentConc);
        dataArrayDose.push(item.dose);
        dataArrayWaterChange.push(item.waterReplacement);
      }
    } catch (error) {
      console.log(item.id);
    }
  });

  try {
    let currentConsuming = calculateDailyConsuming(
      currentElementItemsArray[0],
      currentElementItemsArray[1]
    );
    let previousConsuming = calculateDailyConsuming(
      currentElementItemsArray[1],
      currentElementItemsArray[2]
    );
    let dynamic = calculateDynamic(currentConsuming, previousConsuming);
    printMonitorResult(currentConsuming, dynamic);
    // calculateConsumedAmount(currentElementItemsArray[0], currentConsuming);
    
  } catch (error) {
    let dailyConsumingContainer = document.getElementById("dailyConsuming");
    dailyConsumingContainer.innerText =
      "Недостаточно данных для сравнения. Продолжайте вносить данные!";
  }
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        // {
        //   data: dataArrayDose, //[10, 21, 60, 44, 17, 21, 17],
        //   label: "Внесенная доза",
        //   borderColor: "#ffa500",
        //   backgroundColor: "#ffc04d",
        //   fill: false,
        // },
        {
          data: dataArrayTotalConcentration,
          label: "Концентрация после УДО",
          borderColor: "#3e95cd",
          backgroundColor: "#7bb6dd",
          fill: false,
        },
        {
          data: dataArrayBeforeUDO, //[70, 90, 44, 60, 83, 90, 100],
          label: "Концентрация до УДО",
          borderColor: "#3cba9f",
          backgroundColor: "#71d1bd",
          fill: false,
        },
        {
          data: dataArrayWaterChange, //[70, 90, 44, 60, 83, 90, 100],
          label: "Концентрация до подмены",
          borderColor: "#5722cf",
          backgroundColor: "#5722cf",
          fill: false,
        },
      ],
    },
  });
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
  currConcentrationElement.value = result.toFixed(2);
}


function calculateDynamic(currentPeriod, previousPeriod) {
  let result = currentPeriod - previousPeriod;
  return result;
}

function printMonitorResult(currentConsuming, dynamic) {
  let dailyConsumingContainer = document.getElementById("dailyConsuming");
  dailyConsumingContainer.innerHTML = "";
  dailyConsumingContainer.innerHTML = `Среднесуточное потребление элемента: ${currentConsuming.toFixed(
    2
  )}. Потребление ${
    dynamic > 0 ? "повысилось на: " : "понизилось на: "
  } <span id="dynamic">${dynamic.toFixed(2)}</span>`;
  let dynamicContainer = document.getElementById("dynamic");
  dynamic > 0
    ? (dynamicContainer.style.color = "green")
    : (dynamicContainer.style.color = "red");
}

document.getElementById("element").addEventListener("change", function () {
  let dailyConsumingContainer = document.getElementById("dailyConsuming");
  dailyConsumingContainer.innerHTML = "";
  labels = [];
  dataSets = [];
  dataArrayTotalConcentration = [];
  dataArrayBeforeUDO = [];
  dataArrayDose = [];
  dataLabel = [];
  dataArrayWaterChange = [];
  loadHistory();
});

document.getElementById("aquarium").addEventListener("change", function () {
  let dailyConsumingContainer = document.getElementById("dailyConsuming");
  dailyConsumingContainer.innerHTML = "";
  labels = [];
  dataSets = [];
  dataArrayTotalConcentration = [];
  dataArrayBeforeUDO = [];
  dataArrayDose = [];
  dataLabel = [];
  dataArrayWaterChange = [];
  loadHistory();
});

document.addEventListener("DOMContentLoaded", function () {
  loadHistory();
});

