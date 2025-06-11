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
  let currentConsuming = calculateDailyConsuming(history[0], history[1]);
  let previousConsuming = calculateDailyConsuming(history[1], history[2]);
  let dynamic = calculateDynamic(currentConsuming, previousConsuming);
  printMonitorResult(currentConsuming, dynamic);

  const historyContainer = document.getElementById("historyItems");
  if (history.length === 0) {
    historyContainer.innerHTML = "<p>No measurements recorded yet.</p>";
    return;
  }
  let element = document.getElementById("element").value;
  let aquarium = document.getElementById("aquarium").value;

  history.forEach((item) => {
    try {
      if (
        item.element.toLowerCase() == element &&
        item.aquariumName.toLowerCase() == aquarium
      ) {
        const historyItem = document.createElement("div");
        let label = item.timestamp;
        labels.push(label);
        console.log(item);

        dataArrayTotalConcentration.push(item.concentration);
        dataArrayBeforeUDO.push(item.currentConc);
        dataArrayDose.push(item.dose);
        dataArrayWaterChange.push(item.waterReplacement);
      }
    } catch (error) {
      console.log(item.id);
    }
  });
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
  let days = (dayOne.id - dayTwo.id) / (1000 * 60 * 60 *24);
  console.log(days);
  let result = (dayTwo.concentration - dayOne.waterReplacement) / days;

  return result;
}

function calculateDynamic(currentPeriod, previousPeriod) {
  let result = currentPeriod - previousPeriod;
  return result;
}

function printMonitorResult(currentConsuming, dynamic) {
  let dailyConsumingContainer = document.getElementById('dailyConsuming');
  dailyConsumingContainer.innerHTML = `Среднесуточное потребление элемента: ${currentConsuming.toFixed(2)}. Потребление ${dynamic > 0 ? 'повысилось на: ' : 'понизилось на: '} <span id="dynamic">${dynamic.toFixed(2)}</span>`;
  let dynamicContainer = document.getElementById('dynamic');
  dynamic > 0 ? dynamicContainer.style.color = 'green' : dynamicContainer.style.color = 'red';
}

document.getElementById("element").addEventListener("change", function () {
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
