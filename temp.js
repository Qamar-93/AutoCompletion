var fs = require('fs');
var savPath = __dirname + '/lib/countries.json';
var srcPath = __dirname + '/lib/count_uni.json';




function getData(srcPath) {

      fs.readFile(srcPath, 'utf8', function (err, data) {
              if (err)
              console.log(err);
              else {
                var id=0;
              var dataJson=JSON.parse(data);
                 var dataJso=dataJson.reduce((cum ,uni)=>{
                   if(cum.indexOf(uni.country) === -1)
                    cum.push(uni.country);

                  return cum;
                },[])
                console.log('data',dataJso);
                fs.writeFile(savPath , JSON.stringify(dataJso) ,function() {
                  if(err)
                  console.log(err);
                  else {
                    console.log('Complete');
                  }
                })
              }
            });



  }


getData(srcPath);
