//The following code is based on VirtualScroller.js by Bill D White, adapted for use with bioinformatic research at Argonne National Laboratory

function ScrollVirtually(fastaJSON)
{
        var data = JSON.parse(fastaJSON);

        //for the vcf, I am using the same JSON format as fastaJSON uses. The legend is below:
        //id: POS
        //name: CHROM
        //label: ALT
        var vcf = 
        {items: [
        {label:"CAAA", name:"Mab_g", id:"81390"},
        {label:"ACC", name:"Mab_g",id:"81392"},
        {label:"C", name:"Mab_g", id:"280242"},
        {label:"A", name:"Mab_g", id:"1150461"},
        {label:"A", name:"A",id:"2106418"},
        {label:"CGGGGG", name:"Mab_g", id:"2635537"},
        {label:"ATGCTCAAATGTGCGCAAATCGGACGATTTTGCGCACATTTGAGCATGCTCGCGCTT", name:"Mab_g", id:"2896546"},
        {label:"G", name:"Mab_g", id:"3831238"},
        {label:"CGGG", name:"Mab_g", id:"4948086"}
        ]
        }
<<<<<<< HEAD
=======
        console.log("id of var: " + vcf.items[0].id);

>>>>>>> master

        var merged = $.merge(data.items, vcf.items);

<<<<<<< HEAD
=======
        var merged = $.merge(data.items, vcf.items);

>>>>>>> master
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
                .attr("rx", 3)
                .attr("ry", 3)
<<<<<<< HEAD
                .attr("width", "125")
=======
                .attr("width", "200")
>>>>>>> master
                .attr("height", "30")
                .attr("fill-opacity", 0.25)
                .attr("stroke", "#999999")
                .attr("stroke-width", "2px");
            rowSelection.append("text")
                .attr("transform", "translate(10,20)");
        };

        //rowEnterVCF aims to append rows to show variations next to the reference genome. So far, invoking it causes the 
        //reference gene visualization to become greyed out. As such, I have also commented out its invocation on line 141.

<<<<<<< HEAD
        var rowEnterVCF = function(rowSelection) {
            rowSelection.append("rect")
                .attr("x",200)
                .attr("y", 3)
                .attr("width", "125")
                .attr("height", "30")
                .attr("fill-opacity", 0.25)
                .attr("stroke", "#999999")
                .attr("stroke-width", "2px")
                .attr("fill", "#df4440");
            rowSelection.append("text")
                .attr("transform", "translate(10,20)");
        };

        //red = #df4440. I chose this because it chromatically compliments the existing shade of green I use for the reference gene

        var rowUpdate = function(rowSelection) {
=======
        // var rowEnterVCF = function(rowSelection) {
        //     rowSelection.append("rect")
        //         .attr("x",200)
        //         .attr("y", 3)
        //         .attr("width", "175")
        //         .attr("height", "30")
        //         .attr("fill-opacity", 0.25)
        //         .attr("stroke", "#999999")
        //         .attr("stroke-width", "2px")
        //         .attr("fill", "#df4440");
        //     rowSelection.append("text")
        //         .attr("transform", "translate(10,20)");
        // };

        //red = #df4440. I chose this because it chromatically compliments the existing shade of green I use for the reference gene

        var rowUpdate = function(rowSelection)
        {
>>>>>>> master
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

                    //check if data is a nucleotide that has a variant at it's index
                if(d.label == "A" || d.label == "T" || d.label == "C" || d.label == "G")
                {
                    console.log("vcfLen: " + vcf.items.length);
                    for(var vcfIndex = 0, vcfLen = vcf.items.length; vcfIndex < vcfLen; vcfIndex++)
                    {
                        console.log("Made it to variant check!");
                        if(d.id == vcf.items[vcfIndex].id)
                        {
                        
                        {
                            //check if data is either 1 or a power of ten
                            if(Math.ceil(Math.log10(d.id)) == Math.log10(d.id))
                            {
                                var numOfSpaces = 10 - (Math.ceil(Math.log10(d.id)));
                                return (d.id +  "." + Array(numOfSpaces).join("\xA0")) + d.label + "\xA0\xA0\xA0Variant: " + vcf.items[vcfIndex].label;
                            }
                            //otherwise, check the number of digits in the data and add padding based on that such that there is always 10u padding
                            if(Math.ceil(Math.log10(d.id)) > Math.log10(d.id))
                            {
                                var numOfSpaces = 11 - (Math.ceil(Math.log10(d.id)));
                                return (d.id + "." + Array(numOfSpaces).join("\xA0")) + d.label + "\xA0\xA0\xA0Variant: " + vcf.items[vcfIndex].label;
                            }
                        }
                        }

                    }
                    //check if data is either 1 or a power of ten, but has no variant (this is most cases)
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



        //Below is an as-yet-unimplemented solution for updating variant data to the visualization in rows next to the reference genome

<<<<<<< HEAD
        //Below is an as-yet-unimplemented solution for updating variant data to the visualization in rows next to the reference genome

=======
>>>>>>> master
        // var variantUpdate = function(rowSelection)
        // {
        //     rowSelection.selectAll("rect")
        //         .append("rect")
        //         .attr("fill", function(d) {
        //             if(d.id == vcf.items[i].POS)
        //             {
        //                 var red = "#df4440";
        //                 return red;
        //             }
        //         });
        //         rowSelection.select("text")
        //             .append("text")
        //             .text(vcf.items[i].ALT);
        // }

        var rowExit = function(rowSelection) {
        };


        var virtualScroller = d3.VirtualScroller()
            .rowHeight(30)
            .enter(rowEnter)
            .update(rowUpdate)
            //.update(rowEnterVCF)
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
