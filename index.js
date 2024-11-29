function search() { 
    // Get input value
    let inputPanel = document.getElementById("input");
    let movieName = inputPanel.value.trim(); // Trim whitespace from input

    if (!movieName) {
        alert("Please enter a movie title.");
        return;
    }

    // Initialize HTTP request
    let htmlRequest = new XMLHttpRequest();
    let url = "https://www.omdbapi.com/?apikey=f954ef38&t=" + encodeURIComponent(movieName);

    htmlRequest.open("GET", url);
    htmlRequest.responseType = "json";

    // Send the request
    htmlRequest.send();

    // Handle the response
    htmlRequest.onload = function() {
        if (htmlRequest.status === 200) {
            let response = htmlRequest.response;

            // Check if the movie was found
            if (response.Response === "True") {
                // Update poster
                let poster = document.getElementById("poster");
                poster.src = response.Poster !== "N/A" ? response.Poster : "placeholder.png";
                poster.alt = response.Title;

                // Update title and year
                let title = document.getElementById("title");
                title.textContent = response.Title;

                let year = document.getElementById("year");
                year.innerHTML = `Year: <span>${response.Year}</span>`;
            } else {
                showError("Movie not found. Please try another title.");
            }
        } else {
            showError("An error occurred while fetching the movie details. Please try again later.");
        }
    };

    // Handle network errors
    htmlRequest.onerror = function() {
        showError("A network error occurred. Please check your connection.");
    };
}

// Utility function to display error messages
function showError(message) {
    alert(message);

    // Reset the UI to default state
    document.getElementById("poster").src = "placeholder.png";
    document.getElementById("poster").alt = "Movie Poster Placeholder";
    document.getElementById("title").textContent = "Movie Title";
    document.getElementById("year").innerHTML = "Year: <span>Unknown</span>";
}
