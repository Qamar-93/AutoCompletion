var fs = require('fs');
const countr = require('../lib/countries.json');
const UniPath = require('../lib/count_uni.json');


function matchedCountry(queryKey, cb) {
  var cntrs = '';

      var result = countr.filter(function(country){
        if(JSON.stringify(country).toLowerCase().indexOf(queryKey.toLowerCase()) === 1){
        return country;
      }
      });
      cb(null, result);

  }

function matchUni(queryUni , country, cb){
  var universties = '';

      var uniList=[];

      var result = UniPath.reduce(function(previUni , uni){
        
        if(uni.country.toLowerCase() == country.toLowerCase()){
        return uniList.push(uni);}
      });

      var res=uniList.filter(function(university){
        return university.name.toLowerCase().startsWith(queryUni.toLowerCase());
      }).map(function(uniObj) {
        return uniObj.name;
      });

      cb(null, res);

      }


function findUni(universityName,cb){
      var result=UniPath.filter((university)=>
      {
        if(university.name.toLowerCase().trim() == universityName.toLowerCase().trim())
        return university;
      }
      );
        cb(null ,result);
    }


module.exports={
  matchedCountry:matchedCountry,
  matchUni:matchUni,
  findUni:findUni
}