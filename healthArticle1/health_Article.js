var xhr = new XMLHttpRequest();

var url = './health_Article.json';

xhr.open('GET', url, true);

xhr.responseType = 'json';

var articlesDiv = document.getElementById('articles');

xhr.onload = function () {
  if (xhr.status === 200) {
    const data = xhr.response;
    var articles = data.articles;

    articles.forEach(function(article) {
      var articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      var title = document.createElement('h2');
      title.textContent = article.title;

      var description = document.createElement('p');
      description.textContent = article.description;

      var waysHeader = document.createElement('h3');
      waysHeader.textContent = 'Ways to Achieve:';

      var waysList = document.createElement('ul');
      article.ways_to_achieve.forEach(function(way) {
        var listItem = document.createElement('li');
        listItem.textContent = way;
        waysList.appendChild(listItem);
      });

      var benefitsHeader = document.createElement('h3');
      benefitsHeader.textContent = 'Benefits:';

      var benefitsList = document.createElement('ul');
      article.benefits.forEach(function(benefit) {
        var listItem = document.createElement('li');
        listItem.textContent = benefit;
        benefitsList.appendChild(listItem);
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(description);
      articleDiv.appendChild(waysHeader);
      articleDiv.appendChild(waysList);
      articleDiv.appendChild(benefitsHeader);
      articleDiv.appendChild(benefitsList);

      articlesDiv.appendChild(articleDiv);
    });
  }
};

xhr.send();










    
// var xhr = new XMLHttpRequest();

// xhr.open('GET', './health_Article.json', true);

// xhr.onload = function () {
//   if (xhr.status === 200) {
//     const data = JSON.parse(xhr.responseText);

//     const articlesDiv = document.getElementById('articles');

//     data.articles.forEach(article => {
//   articlesDiv.innerHTML += `
//     <div>
//       <h2>Title: ${article.title}</h2>

//       <h3>Description</h3>
//       <p>${article.description}</p>

//       <h3>Ways to Achieve</h3>
//       <ul>
//         ${article.ways_to_achieve
//           .map(way => `<li>${way}</li>`)
//           .join('')}
//       </ul>

//       <h3>Benefits</h3>
//       <ul>
//         ${article.benefits
//           .map(benefit => `<li>${benefit}</li>`)
//           .join('')}
//       </ul>

//       <hr>
//     </div>
//   `;
// });
//   }
// };

// xhr.send();

