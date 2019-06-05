 /*Display array in drop down*/
$(document).ready(function(){
    let result = movies.reduce((a, m) => { return a.add(...m.cast) }, new Set())
   let uniqueArray = Array.from(result);
   uniqueArray.sort();
   uniqueArray.forEach(function(element){
    $('#mySelect').append('<option value='+element+'>'+element+'</option>');
    })});
    
/*Sort By Name*/
function Nsorted() {
    movies.sort(function (a, b) {
        var a1 = a.title.toUpperCase();
        var b1 = b.title.toUpperCase();
        if (a1 == b1)  return 0;
        return a1 > b1 ? 1 : -1;
    });
    $("#show").html("");
    $("#show").append("<p style='color:brown;'>" + "<b>" + "-Sorted By Name-" + "</b>" + "</p>")
    createTable(movies);
}

/*Sort By Year*/
function Ysorted() {
    movies.sort(function(a,b){
        if(a.year==b.year) return 0;
        return a.year>b.year? 1:-1;
     });
     $("#show").html("");
     $("#show").append("<p style='color:brown;'>"+"<b>"+"-Sorted By Year-"+"</b>"+"</p>")
     createTable(movies);
}

/*Select box for actor/actress  */
function filte(values) {
    $("#show").html("");
    $("#show").append("<p style='color:brown;'>" + "<b>" + "-Movies He/She Acted In-" + "</b>" + "</p>");
    movies.filter(function (element) {
        element.cast.filter(casts => casts === values).forEach(function (casts) {
                $("#show").append("<b>" + "Year: " + "</b>" + element.year + "<br>" + "<b>" + "Title: " + "</b>" + element.title + "<br>" + "<b>" + "Cast: " + "</b>" + element.cast + "<br>" + "<b>" + "Genres: " + "</b>" + element.genres + "<br>" + "<br>");
            }) 
    });}

/*Get movies between a range of years*/
function find(year1, year2) {
    var year1 = document.getElementById("year1").value;
    var year2 = document.getElementById("year2").value;
    $("#show").html("");
    $("#show").append("<p style='color:brown;'>" + "<b>" + "-Movies between " + year1 + " and " + year2 + "-"+"</b>" + "</p>")
    movies.forEach(function (element) {
        {
            if ((element.year >= year1 && element.year <= year2) || (element.year <= year1 && element.year >= year2)) {
           
            $("#show").append("<b>" + "Year: " + "</b>" + element.year + "<br>" + "<b>" + "Title: " + "</b>" + element.title + "<br>" + "<b>" + "Cast: " + "</b>" + element.cast + "<br>" + "<b>" + "Genres: " + "</b>" + element.genres + "<br>" + "<br>");
        }
        } }); }

//Ascending
function sortA() {
    $("#show").html("");
    let result = movies.reduce((a, m) => { return a.add(...m.cast) }, new Set())
    let uniqueArray = Array.from(result);
    uniqueArray.sort();
    
    let result1 = movies.reduce((a, m) => { return a.add(...m.genres) }, new Set())
    let uniqueArrayg = Array.from(result1);
    uniqueArrayg.sort();
      
   $("#show").append("<p style='color:brown;'>" + "<b>" + "-Cast in Ascending Order-" + "</b>" + "</p>")
    uniqueArray.forEach(function(elements){
        $("#show").append("<br>" + "<b>" + "Cast: " + "</b>" + elements + "<br>");
        
        var genarr=[];
       movies.filter(function (element) {
            element.cast.filter(casts => casts ===elements).forEach(function (casts) {
             genarr.push(...element.genres);
            })})
        var count = {}
        genarr.forEach(function (i) {
            count[i] = (count[i] || 0) + 1;
        });

        function sortAssocObject(count) {
            var sortable = [];
            for (var key in count) {
                sortable.push([key, count[key]]);
            }
            sortable.sort(function (a, b) {
                return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
            });
            var orderedList = {};
            for (var idx in sortable) {
                orderedList[sortable[idx][0]] = sortable[idx][1];
            }
           $.each(orderedList, function (key, value) {
              $("#show").append("<b>" + "Genre: " + "</b>" + " " + key + "     " + "<b>" + "Count: " + "</b>" + value + "<br>");
            });
        }
                 sortAssocObject(count);
        })}

//Descending
function sortD() {
    $("#show").html("");
    $("#show").append("<p style='color:brown;'>" + "<b>" + "-Cast in Descending Order-" + "</b>" + "</p>")
    let result = movies.reduce((a, m) => { return a.add(...m.cast) }, new Set())
    let csort = Array.from(result);
    csort.sort().reverse();
    var element=makeTableHTML(csort);
$("#show").append( element + "<br>");
};

function sorted() {
    $("#show").html("");
    $("#show").append("<p style='color:brown;'>" + "<b>" + "-Movies List-" + "</b>" + "</p>")
   createTable(movies);
}     

function createTable(movies)
{
    var col = [];
    for (var i = 0; i < movies.length; i++) {
        for (var key in movies[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            } } }

     var table = document.createElement("table");
     var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < movies.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = movies[i][col[j]];
        }
    }
    var divContainer = document.getElementById("show");
    divContainer.appendChild(table);
}
function makeTableHTML(myArray) {
    var result = "<table border=1 >";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        result += "<td style='width:500px'>"+myArray[i]+"</td>";
        }
    result += "</table>";
    return result;
}