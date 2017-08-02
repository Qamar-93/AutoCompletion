	(function(){
// var request= require('./request.js')
var countries=document.getElementById('countryQ');
var universties=document.getElementById('uniQ');
var submit=document.getElementById('submited');

var urls={
	coun:'http://localhost:4000/api/country/?q=',
	uni:'http://localhost:4000/api/uni/?q=',
	sUn:'http://localhost:4000/api/getUni/?q='
}
countries.addEventListener('keyup',function(event){
	
	_request(urls.coun+event.target.value, (err,data)=>{
		if(err)
		console.log(err);
		else{
		// console.log('countrey Key up',data);
		showSug(data, event.target);
			}
	})
	

}) 

universties.addEventListener('keyup',function(event){
	var country=document.getElementById('countryQ').value.replace(/ /g, '+') ;

	
	_request(urls.uni+event.target.value+'&\?c='+country, (err,data)=>{
		if(err)
			console.log(err);
		else{
			console.log('uni Key up',data);
			showSug(data, event.target);
		}
		
	})

}) 

submit.addEventListener('click',function(event){
	event.preventDefault();
	var universiy=document.getElementById('uniQ').value.replace(/ /g, '+') ;

	
	_request(urls.sUn+universiy, (err,data)=>{
		if(err)
			console.log(err);
		else{
			console.log('uniersity details Key up',data);
			showUniDet(data);
		}
		
	})

}) 


function showSug(data ,thisElement){
	var OptionList=document.getElementById(thisElement.list.id);
		OptionList.innerHTML="";
		data.map(function(option){
		var optionItem=document.createElement('option');
		optionItem.classList.add('option');
		optionItem.textContent=option;
		OptionList.appendChild(optionItem);
		})
	}

function showUniDet(data){
		var uniDiv = document.getElementById("uni-details");
		uniDiv.innerHTML="";
		countries.value="";
		universties.value="";
		var universiyDomain=document.createElement('a');
		universiyDomain.classList.add('uniDomain');
		universiyDomain.setAttribute("href",data[0].web_page);
		universiyDomain.setAttribute("target","_blank");	

		uniDiv.appendChild(universiyDomain);

		var universiyName=document.createElement('h2');
		universiyName.classList.add('uniName');
		universiyName.textContent=data[0].name;
		universiyDomain.appendChild(universiyName);

		var universiyCountry=document.createElement('p');
		universiyCountry.classList.add('uniCountry');
		universiyCountry.textContent=data[0].country;
		uniDiv.appendChild(universiyCountry);

		


	}


//uni-details
})()




// <datalist id="browsers">
//   <option value="Internet Explorer">
//   <option value="Firefox">
//   <option value="Chrome">
//   <option value="Opera">
//   <option value="Safari">
// </datalist>