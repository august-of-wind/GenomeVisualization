function CreateFastaJSON(parsedData)
{
	var geneArrayLength = parsedData.length; //declare a constant geneArray length

	var sequenceJSON =
	{
    	items: []
    };

    var idCount = 0;
    var contigCount = 0;
    //edited from geneArrayIndex < geneArrayLength to geneArrayIndex < 100 for testing purposes
    for(geneArrayIndex = 0; geneArrayIndex < geneArrayLength; geneArrayIndex++)
    {
        var contig =
        {
            name: parsedData[geneArrayIndex],
            label: parsedData[geneArrayIndex],
            id: contigCount
        };
    	contigCount++;
    	sequenceJSON.items.push(contig);
    }
    var newSequence = JSON.stringify(sequenceJSON);
    return newSequence;

}
