function CreateJSON(parsedData)
{
	//var parsedData = ParseFasta("http://127.0.0.1:8000/MabFasta.fasta");
	//console.log("Calling ParseFasta: " + ParseFasta("http://127.0.0.1:8000/MabFasta.fasta"));
	var geneArrayLength = parsedData.length; //declare a constant geneArray length
    console.log(geneArrayLength);

	var sequenceJSON = 
	{
    	items: []
    }

	var titleOfGene;
    var nucleotide;
    var id;
     	   

    var idCount = 0;
    var contigCount = 0;

    for(geneArrayIndex = 0; geneArrayIndex < geneArrayLength; geneArrayIndex++)
    {
        var contig = 
        {
            name: parsedData[geneArrayIndex],
            label: parsedData[geneArrayIndex],
            id: contigCount
        }
        //console.log(contig);
    	contigCount++;
    	sequenceJSON.items.push(contig);
    }

    //console.log("Here is some JSON: " + sequenceJSON.items);
    var newSequence = JSON.stringify(sequenceJSON);
    //console.log(newSequence);
    return newSequence;

}