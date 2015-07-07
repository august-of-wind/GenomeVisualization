function ParseVCF(vcfFile) 
{
  var tempArray = [];
  $.get(vcfFile).done(function(data){
  var lines = data.split("\n");  //split file by lines

  var vcf = 
  {
    items: []
  };


	for(var lineIndex = 0, lineLength = lines.length; lineIndex < lineLength; ++lineIndex)
  {
    if(lines[lineIndex].indexOf("#") == -1)
    { //if line does not contain metadata
      if(lines[lineIndex] !== "")
      { //skip any blank lines
        //console.log(lines[lineIndex]);
        var trimBySpaces = lines[lineIndex].split(/(\s+)/);
        var foo = trimBySpaces.filter(function(str) 
        {
          return /\S/.test(str);
        });
        //var foo = bar[0].trim();
        var fooLine = [];
        for(var fooIndex = 0; fooIndex < 5; ++fooIndex)
        {
          if(foo[fooIndex] !== " ")
          {
            if(foo[fooIndex] !== ".")
            {
              fooLine.push(foo[fooIndex]);
            }
          }
          var vcfItem = 
          {
            CHROM: fooLine[0],
            POS: fooLine[1],
            REF: fooLine[2],
            ALT: fooLine[3]
          };
        }
        vcf.items.push(vcfItem);
    	}
   	}
  }
  console.log(vcf);
  });
  
}