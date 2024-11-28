function search() {
    let inputPanel = document.getElementById("input");
    let movieName = inputPanel.value;

    let htmlRequest = new XMLHttpRequest();

    let url = "http://www.omdbapi.com/?apikey=f954ef38&t=" + movieName;

    htmlRequest.open("GET", url);
    htmlRequest.responseType = "json";

    htmlRequest.send();

    htmlRequest.onload = function() {
        console.log(htmlRequest.response);
        let poster = document.getElementById("poster");
        poster.src = htmlRequest.response.Poster;

        let title = document.getElementById("title");
        title.textContent = htmlRequest.response.Title;

        
    }
}
