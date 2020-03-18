const formSearch =document.querySelector(".form-search"),
      inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
      dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
      inputCitiesTo = formSearch.querySelector(".input__cities-to"),
      dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to"),
      inputDateDepart = formSearch.querySelector(".input__date-depart");

const cityesApi = 'Data/cities.json',
    proxy = ' https://cors-anywhere.herokuapp.com/',
    APY_KEY = 'be89f1280b6177f28fd06effe1a6dddb',
    colendar = 'http://min-prices.aviasales.ru/calendar_preload';
let city = [];

const getData= (url, callback) =>{

    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if(request.readyState !== 4) return;
        if(request.status ===200){
            callback(request.response);
        }else{
            alert(request.status);
        }

    });
    request.send();

}
const showCity = (input,list) =>{
    list.textContent = "";
    if(input.value === "")return;
       
     const filterCity = city.filter( (item) =>{
           
         const fixItem = item.toLocaleLowerCase();
        
         return fixItem.startsWith(input.value.toLocaleLowerCase());
       });
         filterCity.forEach( (item) =>{

             const li = document.createElement('li');
             li.classList.add('dropdown__city');
             li.textContent = item;
             list.append(li);
         });
}



const togle = (input,list)=>{
    
    input.value=event.target.innerHTML;
    list.textContent = '';
}
getData(cityesApi, (data) =>{
    const dt= JSON.parse(data);
    dt.forEach((item) =>{
    if(item.name!=null){
     city.push(item.name);
    }
    });
  
  });

inputCitiesFrom.addEventListener('input',()=>{
    showCity(inputCitiesFrom,dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', ()=>{
    togle(inputCitiesFrom,dropdownCitiesFrom);
    
});

inputCitiesTo.addEventListener('input',()=>{
    showCity(inputCitiesTo,dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', ()=>{
    togle(inputCitiesTo,dropdownCitiesTo);
});


