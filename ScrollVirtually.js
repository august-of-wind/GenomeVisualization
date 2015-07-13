//The following code is based on VirtualScroller.js by Bill D White, adapted for use with bioinformatic research at Argonne National Laboratory

function ScrollVirtually(JsonData)
{
        var data = JSON.parse(JsonData);

        console.log("Done Parsing!");

        var colorScale = d3.scale.category20();

        var scrollSVG = d3.select(".viewport").append("svg")
            .attr("class", "scroll-svg");

        var defs = scrollSVG.insert("defs", ":first-child");

        createFilters(defs);

        var chartGroup = scrollSVG.append("g")
            .attr("class", "chartGroup");
            //.attr("filter", "url(#dropShadow1)"); // sometimes causes issues in chrome

        chartGroup.append("rect")
            .attr("fill", "#FFFFFF");

        var rowEnter = function(rowSelection) {
            rowSelection.append("rect")
                .attr("rx", 3)
                .attr("ry", 3)
                .attr("width", "250")
                .attr("height", "24")
                .attr("fill-opacity", 0.25)
                .attr("stroke", "#999999")
                .attr("stroke-width", "2px");
            rowSelection.append("text")
                .attr("transform", "translate(10,15)");
        };

        var rowUpdate = function(rowSelection) {
            rowSelection.select("rect")
                .attr("fill", function(d) {
                    if(d.label !== "A" && d.label !== "T" && d.label !== "C" && d.label !== "G"){
                        console.log("Got blue");
                        var blue = "#17becf";
                        return blue;
                    }
                    console.log("Got green")
                    var green = "#74c476";
                    return green;
                    //return colorScale(d.id);
                });
            rowSelection.select("text")
                .text(function (d) {
                    return (d.index + 1) + ". " + d.label;
                });
        };

        var rowExit = function(rowSelection) {
        };


        var virtualScroller = d3.VirtualScroller()
            .rowHeight(30)
            .enter(rowEnter)
            .update(rowUpdate)
            .exit(rowExit)
            .svg(scrollSVG)
            .totalRows(1679403)
            .viewport(d3.select(".viewport"));

        // tack on index to each data item for easy to read display
        data.items.forEach(function(nextState, i) {
            nextState.index = i;
        });

        virtualScroller.data(data.items, function(d) { return d.id; });

        chartGroup.call(virtualScroller);

        function createFilters(svgDefs) {
            var filter = svgDefs.append("svg:filter")
                .attr("id", "dropShadow1")
                .attr("x", "0")
                .attr("y", "0")
                .attr("width", "200%")
                .attr("height", "200%");

            filter.append("svg:feOffset")
                .attr("result", "offOut")
                .attr("in", "SourceAlpha")
                .attr("dx", "1")
                .attr("dy", "1");

            filter.append("svg:feColorMatrix")
                .attr("result", "matrixOut")
                .attr("in", "offOut")
                .attr("type", "matrix")
                .attr("values", "0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0 0 0 0.2 0");

            filter.append("svg:feGaussianBlur")
                .attr("result", "blurOut")
                .attr("in", "matrixOut")
                .attr("stdDeviation", "1");

            filter.append("svg:feBlend")
                .attr("in", "SourceGraphic")
                .attr("in2", "blurOut")
                .attr("mode", "normal");
            }
        }
