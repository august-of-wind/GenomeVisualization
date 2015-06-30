function ParseVCF(vcfFile) 
{
    var tempArray = [];
    $.get(vcfFile).done(function(data){
      var diffArray = [];
    	var lines = data.split("\n");  //split file by lines
    	var diffIndexArray = [];
    	var diffIndex = 0;

	for(var lineIndex = 0, lineLength = lines.length; lineIndex < lineLength; ++lineIndex)
    {
    	if(lines[lineIndex].indexOf("#") == -1)
        { //if part of sequence, add nucleotides to geneArray
    		if(lines[lineIndex] !== "")
          	{ //skip any blank lines
    			var splitLine = lines[lineIndex];
    		}
   		}