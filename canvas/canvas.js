var width = 400;
var height = 400;
var circles = [10,100];
var radius = [];

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", width)
                                    .attr("height", height);

circles.map(function (circle) {
    var rad = Math.sqrt(circle / Math.PI) * 10;
    // console.log(rad);
    radius.push(rad);
});

for (index = 0; index < radius.length; index++) {
    svgContainer.append("circle")
        .attr("cx", index * (width / radius.length) + (width / (radius.length * 2)))
        .attr("cy", height / 2)
        .attr("r", radius[index]);
}