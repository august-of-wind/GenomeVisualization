//The following code is based on VirtualScroller.js by Bill D White, adapted for use with bioinformatic research at Argonne National Laboratory

function ScrollVirtually(fastaJSON)
{
        var data = JSON.parse(fastaJSON);

        var vcf = 
        {items: [
        {ALT:"CAAA", CHROM:"Mab_g",POS:"81390"},
        {ALT:"ACC", CHROM:"Mab_g",POS:"81392"},
        {ALT:"C", CHROM:"Mab_g",POS:"280242"},
        {ALT:"A", CHROM:"Mab_g",POS:"1150461"},
        {ALT:"A", CHROM:"A",POS:"2106418"},
        {ALT:"CGGGGG", CHROM:"Mab_g", POS:"2635537"},
        {ALT:"ATGCTCAAATGTGCGCAAATCGGACGATTTTGCGCACATTTGAGCATGCTCGCGCTT", CHROM:"Mab_g", POS:"2896546"},
        {ALT:"G", CHROM:"Mab_g", POS:"3831238"},
        {ALT:"CGGG", CHROM:"Mab_g", POS:"4948086"}
        ]
}

        console.log("Done Parsing!");


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
                .attr("x", 3)
                .attr("y", 3)
                .attr("width", "125")
                .attr("height", "24")
                .attr("fill-opacity", 0.25)
                .attr("stroke", "#999999")
                .attr("stroke-width", "2px");
            // rowSelection.append.("rect")
            //     .attr("x", 6)
            //     .attr("y", 6)
            //     .attr("width", "125")
            //     .attr("height", "24")
            //     .attr("fill-opacity", 0.25)
            //     .attr("stroke", "#99999999")
            //     .attr("stroke-width", "2px");
            rowSelection.append("text")
                .attr("transform", "translate(10,20)");
        };

        // var rowEnterVCF = function(rowSelection) {
        //     rowSelection.append("rect")
        //         .attr("x", 6)
        //         .attr("y", 6)
        //         .attr("width", "125")
        //         .attr("height", "24")
        //         .attr("fill-opacity", 0.25)
        //         .attr("stroke", "#999999")
        //         .attr("stroke-width", "2px");
        //     rowSelection.append("text")
        //         .attr("transform", "translate(10,20)");
        // };
        //nice red = #df4440
        var rowUpdate = function(rowSelection) {
            rowSelection.select("rect")
                .attr("fill", function(d) {
                    if(d.label !== "A" && d.label !== "T" && d.label !== "C" && d.label !== "G"){
                        //if a contig name, fill rect with blue
                        var blue = "#17becf";
                        return blue;
                    }
                    //if a nucleotide, fill rect with green
                    var green = "#74c476";
                    return green;
                });
            rowSelection.select("text")
                .text(function (d) {
                    //Add padding to each nucleotide rect such that all nucleotides are in the same "cell"

                    //check if data is a nucleotide
                    if(d.label == "A" || d.label == "T" || d.label == "C" || d.label == "G")
                    {
                        //check if data is either 1 or a power of ten
                        if(Math.ceil(Math.log10(d.id)) == Math.log10(d.id))
                        {
                            var numOfSpaces = 10 - (Math.ceil(Math.log10(d.id)));
                            return (d.id +  "." + Array(numOfSpaces).join("\xA0")) + d.label;
                        }
                        //otherwise, check the number of digits in the data and add padding based on that such that there is always 10u padding
                        if(Math.ceil(Math.log10(d.id)) > Math.log10(d.id))
                        {
                            var numOfSpaces = 11 - (Math.ceil(Math.log10(d.id)));
                            return (d.id + "." + Array(numOfSpaces).join("\xA0")) + d.label;
                        }
                    }
                    //if none of the criteria above is fulfilled, the data must be a contig name and doesn't require anything but the contig name
                    else
                    {
                        return d.label;
                    }
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
            .totalRows(5090493)
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