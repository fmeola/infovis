d3.json("data/wordMap.json", function (data) {
    var json = data;
    wordMap(json);
});

function wordMap(data) {
    console.log(data);

    var scale = d3.scale.linear().domain([min(data),max(data)]).range([1,7]);

    d3.select("body")
        .append("h1")
        .selectAll("pepe")
        .data(data)
        .enter()
        .append("p")
        .append("font")
        .text(function (d, i) {
            return d.word;
        })
        .attr("size", function (d, i) {
            return scale(d.count);
        });
}

function min(data) {
    return d3.min(data, function(d) { return d.count; });
}

function max(data) {
    return d3.max(data, function(d) { return d.count; });
}
