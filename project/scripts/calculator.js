const btn = document.getElementById('calculator');
btn.addEventListener('click', calculate);


const elementRecommendations = {
            'NO3': { min: 10, max: 20, unit: 'mg/l', info: 'Nitrates are the primary source of nitrogen for plants. Excess levels may lead to algae blooms.' },
            'PO4': { min: 0.5, max: 2, unit: 'mg/l', info: 'Phosphates are essential for plant energy metabolism. Excess can stimulate algae growth.' },
            'K': { min: 5, max: 20, unit: 'mg/l', info: 'Potassium regulates water balance and activates enzymes.' },
            'Fe': { min: 0.1, max: 0.5, unit: 'mg/l', info: 'Iron is critical for chlorophyll synthesis. Deficiency causes chlorosis (yellowing) of leaves.' },
            'Mn': { min: 0.01, max: 0.1, unit: 'mg/l', info: 'Manganese participates in photosynthesis and enzyme activation.' },
            'Cu': { min: 0.002, max: 0.01, unit: 'mg/l', info: 'Copper is needed in trace amounts. Excess is toxic to invertebrates.' },
            'Zn': { min: 0.005, max: 0.02, unit: 'mg/l', info: 'Zinc is important for plant growth hormone synthesis.' },
            'B': { min: 0.01, max: 0.05, unit: 'mg/l', info: 'Boron participates in sugar transport and cell wall formation.' },
            'Mo': { min: 0.0005, max: 0.002, unit: 'mg/l', info: 'Molybdenum is essential for plant nitrogen metabolism.' }
        };

        document.getElementById('useCurrentConcentration').addEventListener('change', function() {
            document.getElementById('currentConcentrationGroup').style.display = 
                this.checked ? 'block' : 'none';
        });

        document.addEventListener('DOMContentLoaded', function() {
            loadHistory();
        });

        function calculate() {
            const volume = parseFloat(document.getElementById('aquariumVolume').value);
            const dose = parseFloat(document.getElementById('dose').value);
            const element = document.getElementById('element').value;
            const useCurrent = document.getElementById('useCurrentConcentration').checked;
            const currentConc = useCurrent ? parseFloat(document.getElementById('currentConcentration').value) || 0 : 0;
            const concValue = parseFloat(document.getElementById('concentrationValue').value);
            const concUnit = document.getElementById('concentrationUnit').value;
            const errorConfirm = document.getElementById('errorConfirm');
            if (isNaN(volume) || isNaN(dose) || isNaN(concValue) || 
                (useCurrent && isNaN(currentConc))) {
                // alert('Please fill all required fields with valid numeric values!');
                
                errorConfirm.textContent = 'Please fill all required fields with valid numeric values!'
                return;
            }
            errorConfirm.textContent = '';
            let concentrationMgPerMl = 0;
            
            switch(concUnit) {
                case 'percent':
                    concentrationMgPerMl = concValue * 10;
                    break;
                case 'mg':
                    concentrationMgPerMl = concValue / volume;
                    break;
                case 'grams':
                    concentrationMgPerMl = dose  * concValue / volume;
                    break;
            }
            
            const addedConcentration = (dose * concentrationMgPerMl) / volume;
            const result = addedConcentration + currentConc;
            
            const roundedResult = Math.round(result * 1000) / 1000;
            
            document.getElementById('resultValue').textContent = roundedResult.toLocaleString('en-US', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 3
            });
            document.getElementById('result').style.display = 'block';
            
            const recommendation = elementRecommendations[element];
            const elementInfo = document.getElementById('elementInfo');
            
            elementInfo.innerHTML = `
                <h4>Recommended values for ${document.getElementById('element').options[document.getElementById('element').selectedIndex].text}:</h4>
                <p>Optimal range: ${recommendation.min}-${recommendation.max} ${recommendation.unit}</p>
                <p>${recommendation.info}</p>
                <p>Your value: ${roundedResult} ${recommendation.unit} - 
                ${roundedResult < recommendation.min ? '❌ Below recommended' : 
                  roundedResult > recommendation.max ? '⚠️ Above recommended' : '✅ Within optimal range'}</p>
            `;
            

            saveToHistory(element, roundedResult);
            

            document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
        }

        function saveToHistory(element, concentration) {
            const history = JSON.parse(localStorage.getItem('fertilizerHistory')) || [];
            const elementName = document.getElementById('element').options[document.getElementById('element').selectedIndex].text;
            const timestamp = new Date().toLocaleString();
            
            history.unshift({
                id: Date.now(), 
                element: element,
                elementName: elementName,
                concentration: concentration,
                timestamp: timestamp
            });
            
            if (history.length > 10) {
                history.pop();
            }
            
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
                const recommendation = elementRecommendations[item.element];
                const status = item.concentration < recommendation.min ? '❌' : 
                              item.concentration > recommendation.max ? '⚠️' : '✅';
                
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <strong>${item.elementName}</strong>: ${item.concentration.toLocaleString('en-US', {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 3
                    })} ${recommendation.unit} ${status}<br>
                    <small>${item.timestamp}</small>
                    <button class="delete-btn" onclick="deleteHistoryItem(${item.id})">X</button>
                `;
                historyContainer.appendChild(historyItem);
            });
        }

        function deleteHistoryItem(id) {
            let history = JSON.parse(localStorage.getItem('fertilizerHistory')) || [];
            history = history.filter(item => item.id !== id);
            localStorage.setItem('fertilizerHistory', JSON.stringify(history));
            loadHistory();
        }
