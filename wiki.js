// search for Wikipedia articles, view results
// random articles: https://en.wikipedia.org/wiki/Special:Random
// API use: https://www.mediawiki.org/wiki/API:Main_page
// API sandbox: https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm
var heading;
var description;
var link;


document.getElementById("searchQ").addEventListener("keypress", function (event) {
    if (event.which === 13) {
        var query = document.getElementById("searchQ").value.toString();
    //console.log(query);
        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+query+"&format=json&origin=*";
    
        sendRequest(url);
    }
});

// Search button Event Listener
document.getElementById("submitX").addEventListener("click", function () {
    var query = document.getElementById("searchQ").value.toString();
    //console.log(query);
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+query+"&format=json&origin=*";
    
    sendRequest(url);
});

// request JSON data from Wikimedia
function sendRequest(url) {
    var userAgentString = navigator.userAgent;
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var data = JSON.parse(xmlhttp.responseText);
            document.getElementById("searchQ").value = "";
            
            // get heading: data[1][0]
            // get description: data[2][0]
            // get url link: data[3][0]
            
            var WikiData = {};
            WikiData.heading = data[1][0];
            WikiData.description = data[2][0];
            WikiData.link = data[3][0];
            
            displayResult(WikiData);
            
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xmlhttp.send();
}

// display short summary of reuslts 
function displayResult (WikiData) {
    heading.innerHTML = WikiData.heading;
    description.innerHTML = WikiData.description;
    link.href = WikiData.link;
}

// On window load display Wikipedia info as placheholder
window.onload = function () {
    heading = document.getElementById("heading");
    description = document.getElementById("description");
    link = document.getElementById("link");
    
    var WikiData = {};
    WikiData.heading = "Wikipedia";
    WikiData.description = "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.";
    WikiData.link = "https://en.wikipedia.org/wiki/Main_Page";
    
    displayResult(WikiData);
}
