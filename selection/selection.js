/**
 * http://bl.ocks.org/lgersman/5311083
 */
var radius = 25;
var width = 800;
var height = 600;
var count = 20;

window.states = [];
for(var i = 0; i < count; i++) {
    window.states.push({x : Math.floor(Math.random() * width), y : Math.floor(Math.random() * height)});
}

window.svg = d3.select("body")
    .append("svg")
    .attr("width", "800px")
    .attr("height", "600px");

var gStates = svg.selectAll("g.state").data(states);

var gState = gStates.enter().append("g")
    .attr({
        "transform" : function( d) {
            return "translate("+ [d.x,d.y] + ")";
        },
        'class' : 'state'
    });

gState.append("circle")
    .attr({
        r       : radius + 4,
        class   : 'outer'
    });

gState.append("circle")
    .attr({
        r       : radius,
        class   : 'inner'
    })
    .on("click", function(d, i) {
        var e = d3.event,
            g = this.parentNode,
            isSelected = d3.select(g).classed("selected");

        d3.select(g).classed( "selected", !isSelected);

        // reappend dragged element as last
        // so that its stays on top
        g.parentNode.appendChild(g);
    })
    .on("mouseover", function(){
        d3.select(this).style( "fill", "aliceblue");
    })
    .on("mouseout", function() {
        d3.select(this).style("fill", "white");
    });

gState.append("title")
    .text( function( d) {
        return d.label;
    });

svg.on("mousedown", function() {
        d3.selectAll('g.selected').classed("selected", false);

        var p = d3.mouse( this);

        svg.append("rect")
            .attr({
                rx      : 6,
                ry      : 6,
                class   : "selection",
                x       : p[0],
                y       : p[1],
                width   : 0,
                height  : 0
            })
    })
    .on("mousemove", function() {
        var s = svg.select("rect.selection");

        if(!s.empty()) {
            var p = d3.mouse( this),
                d = {
                    x       : parseInt( s.attr( "x"), 10),
                    y       : parseInt( s.attr( "y"), 10),
                    width   : parseInt( s.attr( "width"), 10),
                    height  : parseInt( s.attr( "height"), 10)
                },
                move = {
                    x : p[0] - d.x,
                    y : p[1] - d.y
                };

            if(move.x < 1 || (move.x*2<d.width)) {
                d.x = p[0];
                d.width -= move.x;
            } else {
                d.width = move.x;
            }

            if(move.y < 1 || (move.y*2<d.height)) {
                d.y = p[1];
                d.height -= move.y;
            } else {
                d.height = move.y;
            }

            s.attr(d);

            // deselect all temporary selected state objects
            d3.selectAll('g.state.selection.selected').classed("selected", false);

            d3.selectAll('g.state > circle.inner').each(function(state_data, i) {
                if(
                    !d3.select(this).classed("selected") &&
                    // inner circle inside selection frame
                    state_data.x-radius>=d.x && state_data.x+radius<=d.x+d.width &&
                    state_data.y-radius>=d.y && state_data.y+radius<=d.y+d.height
                ) {
                    d3.select(this.parentNode)
                        .classed("selection", true)
                        .classed("selected", true);
                }
            });
        }
    })
    .on("mouseup", function() {
        // remove selection frame
        svg.selectAll("rect.selection").remove();

        // remove temporary selection marker class
        d3.selectAll('g.state.selection').classed("selection", false);
    });