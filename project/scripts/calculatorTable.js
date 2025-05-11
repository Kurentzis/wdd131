
const elementRecommendations2 = {
    'NO₃': { min: 10, max: 20, unit: 'mg/l', info: 'Nitrates are the primary source of nitrogen for plants. Excess levels may lead to algae blooms.' },
    'PO₄': { min: 0.5, max: 2, unit: 'mg/l', info: 'Phosphates are essential for plant energy metabolism. Excess can stimulate algae growth.' },
    'K': { min: 5, max: 20, unit: 'mg/l', info: 'Potassium regulates water balance and activates enzymes.' },
    'Fe': { min: 0.1, max: 0.5, unit: 'mg/l', info: 'Iron is critical for chlorophyll synthesis. Deficiency causes chlorosis (yellowing) of leaves.' },
    'Mn': { min: 0.01, max: 0.1, unit: 'mg/l', info: 'Manganese participates in photosynthesis and enzyme activation.' },
    'Cu': { min: 0.002, max: 0.01, unit: 'mg/l', info: 'Copper is needed in trace amounts. Excess is toxic to invertebrates.' },
    // 'Zn': { min: 0.005, max: 0.02, unit: 'mg/l', info: 'Zinc is important for plant growth hormone synthesis.' },
    // 'B': { min: 0.01, max: 0.05, unit: 'mg/l', info: 'Boron participates in sugar transport and cell wall formation.' },
    // 'Mo': { min: 0.0005, max: 0.002, unit: 'mg/l', info: 'Molybdenum is essential for plant nitrogen metabolism.' }
};
function calculateElement(elementData) {
    // Здесь ваша логика расчета
    console.log('Calculating for:', elementData);
    
    // Пример расчета (замените на вашу формулу)
    const concentrationMgPerMl = elementData.unit === 'percent' 
      ? elementData.fertilizerConcentration * 10 
      : elementData.fertilizerConcentration;
    
    const result = (elementData.dose * concentrationMgPerMl) / elementData.volume + elementData.currentConcentration;
    
    return result.toFixed(2);
  }
  
  // Основная функция обработки таблицы
  async function processTable() {
    // Получаем объем аквариума
    const aquariumName = document.getElementById('aquarium-name').value.trim();
    const volume = document.getElementById('aquarium-volume').value;
    
    // Получаем все строки таблицы (кроме заголовка)
    const rows = document.querySelectorAll('table tbody tr');
    // Перебираем каждую строку
    rows.forEach(row => {
        
      // Получаем название элемента (удаляем скобки и пробелы)
      const elementName = row.cells[0].textContent.trim()
        // .replace(/\(.*\)/, '')
        // .trim()
        // .toLowerCase();
      
      // Собираем данные из полей
      const fertilizerConcentration = parseFloat(row.querySelector('input[name$="_fertilizer_concentration"]').value) || 0;
      const unit = row.querySelector('select[id^="concentrationUnit"]').value;
      const dose = parseFloat(row.querySelector('input[name$="_dose"]').value) || 0;
      const currentConcentration = parseFloat(row.querySelector('input[name$="_current_concentration"]').value) || 0;
      
      if (volume == "" || isNaN(dose) || isNaN(currentConcentration)) {
      // alert('Please fill all required fields with valid numeric values!');
      
      errorConfirm.textContent = 'Please fill all required fields with valid numeric values!'
      return;
  }
      // Создаем объект с данными элемента
      const elementData = {
        name: elementName,
        fertilizerConcentration,
        unit,
        dose,
        currentConcentration,
        volume
      };
      
      // Вызываем функцию расчета
      const result = calculateElement(elementData);
      
      // Записываем результат в соответствующее поле
      row.querySelector('input[name$="_result"]').value = result;
      
      saveToHistory(elementData, result, aquariumName);
    });
  }

  async function saveToHistory(elementData, result, aquariumName) {
    let history = JSON.parse(localStorage.getItem('fertilizerHistory')) || [];
    const timestamp = new Date().toLocaleString();
    if(result == 0) {
        return;
    }

    history.unshift({
        id: parseInt(Date.now() + result),
        aquariumName: aquariumName,
        dose: elementData.dose,
        currentConc: elementData.currentConcentration,
        element: elementData.name,
        elementName: elementData.name,
        concentration: result,
        timestamp: timestamp
    });

    
    localStorage.setItem('fertilizerHistory', JSON.stringify(history));
    loadHistory();

  }




  function loadHistory() {
    const history = JSON.parse(localStorage.getItem('fertilizerHistory')) || [];
    const historyContainer = document.getElementById('historyItems');
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p>No measurements recorded yet.</p>';
        return;
    }
    
    historyContainer.innerHTML = '';
    history.forEach(item => {
        const recommendation = elementRecommendations2[item.element];
        const status = item.concentration < recommendation.min ? '❌' : 
                      item.concentration > recommendation.max ? '⚠️' : '✅';
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <strong>${item.aquariumName ? item.aquariumName : 'Имя аквариума не указано'}</strong><br>
            <strong>${item.elementName}</strong>: ${item.concentration.toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 2
            })} ${recommendation.unit} ${status}<br>
            <p><strong>Внесено УДО: </strong> ${item.dose ? item.dose + ' ml' : 'Нет данных.'}</p>
            <p><strong>Концентрация до внесения УДО: </strong> ${item.currentConc? item.currentConc + ' mg/l': 'Нет данных'}</p>
            <small>${item.timestamp}</small>
            <button class="delete-btn" onclick="deleteHistoryItem(${item.id})">X</button>
        `;
        historyContainer.appendChild(historyItem);
    });
}

  document.getElementById('calculateBtn').addEventListener('click', processTable);