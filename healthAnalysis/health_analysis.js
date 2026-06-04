var xhr = new XMLHttpRequest();
var url = './health_analysis.json';
xhr.open('GET', url, true);
xhr.responseType = 'json';

var conditionsDiv = document.getElementById('conditions');

xhr.onload = function () {
  if (xhr.status === 200 || xhr.status === 0) {
    let data = xhr.response;
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.error("JSON parsing error", e);
        }
    }
    
    var conditions = data && data.conditions ? data.conditions : [];

    conditions.forEach(function(condition) {
      var conditionDiv = document.createElement('div');
      conditionDiv.classList.add('condition');

      var name = document.createElement('h2');
      name.textContent = condition.name;

      var image = document.createElement('img');
      image.src = condition.imagesrc;
      image.alt = condition.name;

      var symptomsHeader = document.createElement('h3');
      symptomsHeader.textContent = 'Symptoms:';
      var symptomsList = document.createElement('ul');
      if (condition.symptoms) {
        condition.symptoms.forEach(function(item) {
          var li = document.createElement('li');
          li.textContent = item;
          symptomsList.appendChild(li);
        });
      }

      var preventionHeader = document.createElement('h3');
      preventionHeader.textContent = 'Prevention:';
      var preventionList = document.createElement('ul');
      if (condition.prevention) {
        condition.prevention.forEach(function(item) {
          var li = document.createElement('li');
          li.textContent = item;
          preventionList.appendChild(li);
        });
      }

      var treatmentHeader = document.createElement('h3');
      treatmentHeader.textContent = 'Treatment:';
      var treatmentText = document.createElement('p');
      treatmentText.textContent = condition.treatment;

      conditionDiv.appendChild(name);
      conditionDiv.appendChild(image);
      conditionDiv.appendChild(symptomsHeader);
      conditionDiv.appendChild(symptomsList);
      conditionDiv.appendChild(preventionHeader);
      conditionDiv.appendChild(preventionList);
      conditionDiv.appendChild(treatmentHeader);
      conditionDiv.appendChild(treatmentText);

      conditionsDiv.appendChild(conditionDiv);
    });
  } else {
    console.log("Error loading data");
  }
};

xhr.send();
