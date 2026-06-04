
const submitButton=document.getElementById('submitBtn');

       
function submitFeedback(event) {
  if (event) event.preventDefault(); // stop page refresh
}

 // READ VALUES WHEN BUTTON IS CLICKED
const username = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const job = document.getElementById('job').value;
    const designation = document.getElementById('designation').value;
    const productType = document.getElementById('productType').value;
    const feedback = document.getElementById('feedbackText').value;


  // DISPLAY VALUES
function submitFeedback() {    document.getElementById('userName').innerHTML = username;
    document.getElementById('userAge').innerHTML = age;
    document.getElementById('userEmail').innerHTML = email;
    document.getElementById('userJob').innerHTML = job;
    document.getElementById('userDesignation').innerHTML = designation;
    document.getElementById('userProductChoice').innerHTML = productType;
    document.getElementById('userFeedback').innerHTML = feedback;


    document.getElementById('userInfo').style.display = 'block';

    alert('Thank you for your valuable feedback')

    // Button click
    submitButton.onclick = submitFeedback;

    // Enter key support
    document.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
     submitFeedback();
   }

}
 )};