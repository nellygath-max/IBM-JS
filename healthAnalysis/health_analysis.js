// ──────────────────────────────────────────────
// Embedded data (used to render the conditions list)
// ──────────────────────────────────────────────
var data = {
  "conditions": [
    {
      "name": "Thyroid",
      "imagesrc": "https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815641_1280.jpg",
      "symptoms": [
        "Fatigue",
        "Weight gain or loss",
        "Dry skin",
        "Muscle weakness",
        "Irregular menstrual periods"
      ],
      "prevention": [
        "Eat a balanced diet",
        "Exercise regularly",
        "Get regular check-ups"
      ],
      "treatment": "Medication like levothyroxine may be prescribed by a doctor."
    },
    {
      "name": "Diabetes",
      "imagesrc": "https://cdn.pixabay.com/photo/2020/05/26/07/04/diabetes-5222072_1280.jpg",
      "symptoms": [
        "Frequent urination",
        "Increased thirst",
        "Blurry vision",
        "Fatigue",
        "Slow healing of cuts or sores"
      ],
      "prevention": [
        "Maintain a healthy weight",
        "Follow a balanced diet",
        "Regular exercise"
      ],
      "treatment": "Management includes medication, insulin therapy, and lifestyle changes."
    },
    {
      "name": "High Blood Pressure",
      "imagesrc": "https://cdn.pixabay.com/photo/2017/10/10/07/00/blood-pressure-monitor-2835847_1280.jpg",
      "symptoms": [
        "Headaches",
        "Shortness of breath",
        "Chest pain",
        "Dizziness",
        "Blurred or double vision"
      ],
      "prevention": [
        "Reduce salt intake",
        "Exercise regularly",
        "Maintain a healthy weight"
      ],
      "treatment": "Medications like ACE inhibitors or diuretics may be prescribed."
    }
  ]
};

// ──────────────────────────────────────────────
// Render condition cards into #conditions div
// ──────────────────────────────────────────────
var conditionsDiv = document.getElementById('conditions');

if (conditionsDiv) {
  data.conditions.forEach(function(condition) {
    var conditionDiv = document.createElement('div');
    conditionDiv.classList.add('condition');

    // Image
    var image = document.createElement('img');
    image.src = condition.imagesrc;
    image.alt = condition.name;
    image.classList.add('condition-image');

    // Info wrapper
    var infoDiv = document.createElement('div');
    infoDiv.classList.add('condition-info');

    var name = document.createElement('h2');
    name.textContent = condition.name;

    var symptomsHeader = document.createElement('h3');
    symptomsHeader.textContent = 'Symptoms:';
    var symptomsList = document.createElement('ul');
    condition.symptoms.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = item;
      symptomsList.appendChild(li);
    });

    var preventionHeader = document.createElement('h3');
    preventionHeader.textContent = 'Prevention:';
    var preventionList = document.createElement('ul');
    condition.prevention.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = item;
      preventionList.appendChild(li);
    });

    var treatmentHeader = document.createElement('h3');
    treatmentHeader.textContent = 'Treatment:';
    var treatmentText = document.createElement('p');
    treatmentText.textContent = condition.treatment;

    infoDiv.appendChild(name);
    infoDiv.appendChild(symptomsHeader);
    infoDiv.appendChild(symptomsList);
    infoDiv.appendChild(preventionHeader);
    infoDiv.appendChild(preventionList);
    infoDiv.appendChild(treatmentHeader);
    infoDiv.appendChild(treatmentText);

    conditionDiv.appendChild(image);
    conditionDiv.appendChild(infoDiv);

    conditionsDiv.appendChild(conditionDiv);
  });
}

// ──────────────────────────────────────────────
// Patient data store
// ──────────────────────────────────────────────
var patients = [];

// ──────────────────────────────────────────────
// Generate analysis report
// ──────────────────────────────────────────────
function generateReport() {
  var report = document.getElementById("report");
  if (!report) return;

  var numPatients = patients.length;
  var conditionsCount = {
    Diabetes: 0,
    Thyroid: 0,
    "High Blood Pressure": 0,
  };
  var genderConditionsCount = {
    Male: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 },
    Female: { Diabetes: 0, Thyroid: 0, "High Blood Pressure": 0 },
  };

  patients.forEach(function(patient) {
    if (conditionsCount[patient.condition] !== undefined) {
      conditionsCount[patient.condition]++;
    }
    if (genderConditionsCount[patient.gender] && genderConditionsCount[patient.gender][patient.condition] !== undefined) {
      genderConditionsCount[patient.gender][patient.condition]++;
    }
  });

  var html = "<strong>Number of patients:</strong> " + numPatients + "<br><br>";
  html += "<strong>Conditions Breakdown:</strong><br>";
  for (var cond in conditionsCount) {
    html += "&nbsp;&nbsp;" + cond + ": " + conditionsCount[cond] + "<br>";
  }
  html += "<br><strong>Gender-Based Conditions:</strong><br>";
  for (var gender in genderConditionsCount) {
    html += gender + ":<br>";
    for (var c in genderConditionsCount[gender]) {
      html += "&nbsp;&nbsp;" + c + ": " + genderConditionsCount[gender][c] + "<br>";
    }
  }

  report.innerHTML = html;
}

// ──────────────────────────────────────────────
// Reset patient form fields
// ──────────────────────────────────────────────
function resetForm() {
  document.getElementById("name").value = "";
  var checkedGender = document.querySelector('input[name="gender"]:checked');
  if (checkedGender) checkedGender.checked = false;
  document.getElementById("age").value = "";
  document.getElementById("condition").value = "";
}

// ──────────────────────────────────────────────
// Add a patient record
// ──────────────────────────────────────────────
function addPatient() {
  var name = document.getElementById("name").value.trim();
  var genderEl = document.querySelector('input[name="gender"]:checked');
  var age = document.getElementById("age").value.trim();
  var condition = document.getElementById("condition").value;

  if (name && genderEl && age && condition) {
    patients.push({ name: name, gender: genderEl.value, age: age, condition: condition });
    resetForm();
    generateReport();
  } else {
    alert("Please fill in all fields before adding a patient.");
  }
}

// ──────────────────────────────────────────────
// Search a condition by name
// ──────────────────────────────────────────────
function searchCondition() {
  var input = document.getElementById('conditionInput').value.trim().toLowerCase();
  var resultDiv = document.getElementById('result');
  if (!resultDiv) return;
  resultDiv.innerHTML = '';

  if (!input) {
    resultDiv.innerHTML = '<p>Please enter a condition name to search.</p>';
    return;
  }

  var condition = data.conditions.find(function(item) {
    return item.name.toLowerCase() === input;
  });

  if (condition) {
    var symptoms = condition.symptoms.join(', ');
    var prevention = condition.prevention.join(', ');
    resultDiv.innerHTML =
      '<h2>' + condition.name + '</h2>' +
      '<img src="' + condition.imagesrc + '" alt="' + condition.name + '" style="max-width:280px;border-radius:8px;margin:10px 0;">' +
      '<p><strong>Symptoms:</strong> ' + symptoms + '</p>' +
      '<p><strong>Prevention:</strong> ' + prevention + '</p>' +
      '<p><strong>Treatment:</strong> ' + condition.treatment + '</p>';
  } else {
    resultDiv.innerHTML = '<p>Condition not found. Try: Thyroid, Diabetes, or High Blood Pressure.</p>';
  }
}

// ──────────────────────────────────────────────
// Wire up event listeners
// ──────────────────────────────────────────────
var addPatientButton = document.getElementById("addPatient");
var btnSearch = document.getElementById('btnSearch');

if (addPatientButton) {
  addPatientButton.addEventListener("click", addPatient);
}

if (btnSearch) {
  btnSearch.addEventListener("click", searchCondition);
}

// Also allow pressing Enter in the search box
var conditionInput = document.getElementById('conditionInput');
if (conditionInput) {
  conditionInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchCondition();
  });
}