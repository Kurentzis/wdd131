var ctx = document.getElementById("myChart").getContext("2d");
let labels = [];
let dataSets = [];
let dataArrayTotalConcentration = [];
let dataArrayBeforeUDO = [];
let dataArrayDose = [];
let dataLabel = [];


function loadHistory() {
  const history = JSON.parse(localStorage.getItem("fertilizerHistory")) || [];
  const historyContainer = document.getElementById("historyItems");
  console.log(history);
  if (history.length === 0) {
    historyContainer.innerHTML = "<p>No measurements recorded yet.</p>";
    return;
  }
  let element = document.getElementById('element').value

  history.forEach((item) => {
    try {
      if(item.element.toLowerCase() == element) {
      const historyItem = document.createElement("div");
      let label = item.timestamp;
      labels.push(label);
      // labels.sort();

      dataArrayTotalConcentration.push(item.concentration);
      dataArrayBeforeUDO.push(item.currentConc);
      dataArrayDose.push(item.dose);
    
      let dataObj = {
        data: dataArrayTotalConcentration,
        label: "Концентрация после УДО"
      }
   }
    } catch (error) {
      console.log(item.id)
    }


  });
  var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        data: dataArrayDose,//[10, 21, 60, 44, 17, 21, 17],
        label: "Внесенная доза",
        borderColor: "#ffa500",
        backgroundColor: "#ffc04d",
        fill: false,
      },
      {
        data: dataArrayTotalConcentration,
        label: "Концентрация после УДО",
        borderColor: "#3e95cd",
        backgroundColor: "#7bb6dd",
        fill: false,
      },
      {
        data: dataArrayBeforeUDO,//[70, 90, 44, 60, 83, 90, 100],
        label: "Концентрация до УДО",
        borderColor: "#3cba9f",
        backgroundColor: "#71d1bd",
        fill: false,
      },

    ],
  },
});

}

document.getElementById('element').addEventListener("change", function() {
  labels = [];
  dataSets = [];
  dataArrayTotalConcentration = [];
  dataArrayBeforeUDO = [];
  dataArrayDose = [];
  dataLabel = [];
  loadHistory()
});

document.addEventListener("DOMContentLoaded", function () {
  loadHistory();
});
