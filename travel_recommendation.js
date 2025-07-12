    function performSearch() {
      resetSearchResults();
      const input = document.getElementById("searchInput").value;
      const searchResults = document.querySelector('.search-results')

      if(!input || input.trim().length < 3){
        alert(`3 or more letter search required`);
        return;
      }
      fetch("./travel_recommendation_api.json")
      .then(response => response.json())
      .then(data => {

        searchResults.style.display = "block"
        let newData = []
        const keysAvail = Object.keys(data).find(ele => ele.startsWith(input.trim().toLowerCase()));

        if (!keysAvail) {
            // const searchResults = document.querySelector('.search-results');

            const resultDiv = document.createElement('div');
            resultDiv.classList.add('each-result');

            const message = document.createElement('p');
            message.textContent = 'no results found';

            resultDiv.appendChild(message);
            searchResults.appendChild(resultDiv);
        } else {
            if (keysAvail === "countries"){
                newData = data[keysAvail].flatMap(country => country.cities)
            } else {
                newData = data[keysAvail]
            }

            newData.forEach(item => {
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('each-result');
                resultDiv.innerHTML = `
                  <img src="${item.image}" alt="${item.name}">
                  <h2>${item.name}</h2>
                  <p>${item.description}</p>
                  <button>view</button>
                `;
                searchResults.appendChild(resultDiv);
            });
        }
      })
    }

    function resetSearch() {
      document.getElementById("searchInput").value = "";
      resetSearchResults();
    }

    function resetSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
          searchResults.innerHTML = ''; // Clears previous results
          searchResults.style.display = "none";
        }
      }