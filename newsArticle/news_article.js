var xhr = new XMLHttpRequest();

var url = './news_article.json'; 

xhr.open('GET', url, true);

xhr.responseType = 'json';

var articlesDiv = document.getElementById('articles');

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
    var articles = data && data.articles ? data.articles : [];

    articles.forEach(function(article) {
      var articleDiv = document.createElement('div');
      articleDiv.classList.add('article');

      var title = document.createElement('h2');
      title.textContent = article.title;

      var description = document.createElement('p');
      description.textContent = article.description;

      var waysHeader = document.createElement('h3');
      waysHeader.textContent = 'Key Points:';

      var waysList = document.createElement('ul');
      article.key_points.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item;
        waysList.appendChild(li);
      });

      var benefitsHeader = document.createElement('h3');
      benefitsHeader.textContent = 'Impact:';

      var benefitsList = document.createElement('ul');
      article.implications.forEach(function(item) {
        var li = document.createElement('li');
        li.textContent = item;
        benefitsList.appendChild(li);
      });

      articleDiv.appendChild(title);
      articleDiv.appendChild(description);
      articleDiv.appendChild(waysHeader);
      articleDiv.appendChild(waysList);
      articleDiv.appendChild(benefitsHeader);
      articleDiv.appendChild(benefitsList);

      articlesDiv.appendChild(articleDiv);
    });
  } else {
    console.log("Error loading data");
  }
};

xhr.send();