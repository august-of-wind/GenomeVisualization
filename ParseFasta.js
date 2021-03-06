function ParseFasta(fastaFile, scrollVirtuallyCallback, createJSONCallback) {
    var tempArray = [];
    $.get(fastaFile).done(function(data){
      var geneArray = [];
    	var lines = data.split("\n");  //split file by lines
    	var geneTitleArray = [];
    	var geneTitleArrayIndex = 0;

    	for(var lineIndex = 0, lineLength = lines.length; lineIndex < lineLength; ++lineIndex)
      {
    		if(lines[lineIndex].indexOf(">") == -1)
        { //if part of sequence, add nucleotides to geneArray
    			if(lines[lineIndex] !== "")
          { //skip any blank lines
            var currentLine = lines[lineIndex].replace(/\s+/g, '');
    				var splitLine = currentLine.split("");//split the lines by character, i.e., by nucleotide
    				for(var splitLineIndex = 0, splitLineLength = splitLine.length; splitLineIndex < splitLineLength; ++splitLineIndex)
            {
   						geneArray.push(splitLine[splitLineIndex]);
   					}
    			}
   			}
        else
        { //if is a title, add whole title to geneArray and geneTitleArray for reference
   				var currentTitle = lines[lineIndex];
   				geneTitleArray.push(currentTitle);
   				geneArray.push(currentTitle);
    			geneTitleArrayIndex++;
    		}
    	}
      console.log("Size of geneArray: " + geneArray.length);
      scrollVirtuallyCallback(createJSONCallback(geneArray));
    });
}
