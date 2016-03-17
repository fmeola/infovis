/**
 * https://bl.ocks.org/mbostock/7341714
 */
var width = 500,
    barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width * 2);

d3.tsv("data.tsv", type, function(error, data) {
    x.domain([0, d3.max(data, function(d) { return 100; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

    /**
     * Agree
     */
    bar.append("rect")
        .attr("class", "agree")
        .attr("width", function(d) { return x(d.agree); })
        .attr("height", barHeight - 1)
        .attr("x", function(d) { return x(0); });

    bar.append("text")
        .attr("x", function(d) { return x(d.agree) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.agree; });

    /**
     * Disagree
     */
    bar.append("rect")
        .attr("class", "disagree")
        .attr("width", function(d) { return x(d.disagree); })
        .attr("height", barHeight - 1)
        .attr("x", function(d) { return x(d.agree); });

    bar.append("text")
        .attr("x", function(d) { return x(d.disagree) + x(d.agree) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.disagree; });

    /**
     * Neutral
     */
    bar.append("rect")
        .attr("class", "neutral")
        .attr("width", function(d) { return x(d.neutral); })
        .attr("height", barHeight - 1)
        .attr("x", function(d) { return x(d.disagree) + x(d.agree); });

    bar.append("text")
        .attr("x", function(d) { return x(d.disagree) + x(d.agree) + x(d.neutral) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.neutral; });

    /**
     * Leyendas
     */
    bar.append("text")
        .attr("class", "legend")
        .attr("x", function(d) { return x(d.disagree) + x(d.agree) + x(d.neutral) + 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function(d) { return d.name; })
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}