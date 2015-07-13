function CreateJSON(parsedData)
{
	var geneArrayLength = parsedData.length; //declare a constant geneArray length

	var sequenceJSON =
	{
    	items: []
    };

    var idCount = 0;
    var contigCount = 0;

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
