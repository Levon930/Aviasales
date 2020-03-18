const formSearch =document.querySelector(".form-search"),
      inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
      dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
      inputCitiesTo = formSearch.querySelector(".input__cities-to"),
      dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to"),
      inputDateDepart = formSearch.querySelector(".input__date-depart");
const city = ['Moskov','Erevan','Sevan','Kosta Rika','New Yorc','Goris','Astana','Pxuket',
                'Stepanakert','Gyumry','Brasilia','Kosovo','Sankt Peterburg','Antananarivu',
                'Uagadugu','Karakas','Sevan','Lchashen','Kirovakan'];
const showCity = (input,list) =>{
    list.textContent = "";
    if(input.value === "")return;
       
     const filterCity = city.filter( (item) =>{
         const fixItem = item.toLocaleLowerCase();
         const m =input.value.toLocaleLowerCase();
        
         return item.includes(input.value.toLocaleLowerCase());
       });
         filterCity.forEach( (item) =>{
             const li = document.createElement('li');
             li.classList.add('dropdown__city');
             li.textContent = item;
             list.append(li);
         });
}
inputCitiesFrom.addEventListener('input',()=>{
    showCity(inputCitiesFrom,dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', ()=>{
    const target =event.target;
    
    inputCitiesFrom.value=event.target.innerHTML;
    dropdownCitiesFrom.textContent = '';
    
});

inputCitiesTo.addEventListener('input',()=>{
    
    showCity(inputCitiesTo,dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', ()=>{
    const target =event.target;
    
    inputCitiesTo.value=event.target.innerHTML;
    dropdownCitiesTo.textContent = '';
    
});