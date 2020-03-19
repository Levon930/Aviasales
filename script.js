//ДОМ обекты 
const formSearch = document.querySelector(".form-search"),
    inputCitiesFrom = formSearch.querySelector(".input__cities-from"),
    dropdownCitiesFrom = formSearch.querySelector(".dropdown__cities-from"),
    inputCitiesTo = formSearch.querySelector(".input__cities-to"),
    dropdownCitiesTo = formSearch.querySelector(".dropdown__cities-to"),
    inputDateDepart = formSearch.querySelector(".input__date-depart");
//цилки на даты
const cityesApi = 'Data/cities.json',
    proxy = ' https://cors-anywhere.herokuapp.com/',
    APY_KEY = 'be89f1280b6177f28fd06effe1a6dddb',
    colendar = 'http://min-prices.aviasales.ru/calendar_preload',
    kartaCen = 'Data/supported_directions.json';
let city = [];
let dt;
//функцыя получения данных
const getData = (url, callback) => {

    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
            callback(request.response);
        } else {
            alert(request.status);
        }

    });
    request.send();

}
//функцыя для живого поиска
const showCity = (input, list) => {
    list.textContent = "";
    if (input.value === "") return;

    const filterCity = city.filter((item) => {

        const fixItem = item.toLocaleLowerCase();

        return fixItem.startsWith(input.value.toLocaleLowerCase());
    });
    filterCity.forEach((item) => {

        const li = document.createElement('li');
        li.classList.add('dropdown__city');
        li.textContent = item;
        list.append(li);
    });
}


//функцыя для выбра из списка
const togle = (input, list) => {

    input.value = event.target.innerHTML;
    list.textContent = '';
}

getData(cityesApi, (data) => {
    dt = JSON.parse(data);

    dt.forEach((item) => {
        if (item.name != null) {
            city.push(item.name,item.name_translations.en);
        }
        
    });

});

const renderCheap = (data, date) => {
    const cheapTicketYear = JSON.parse(data).best_prices;
    const cheapTicketDay = cheapTicketYear.filter((item) => {
        return item.depart_date === date;
    });
    renderCheapDay(cheapTicketDay);
    renderCheapYear(cheapTicketYear);
}
const renderCheapDay = (ticket) => {
    console.log(ticket);
}
const renderCheapYear = (tickets) => {
    console.log(tickets);
}
//ивенты
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesFrom.addEventListener('click', () => {
    togle(inputCitiesFrom, dropdownCitiesFrom);

});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesTo.addEventListener('click', () => {
    togle(inputCitiesTo, dropdownCitiesTo);
});
formSearch.addEventListener('submit', (event) => {
    event.preventDefault();
    const fromName = dt.find((item) => {
        return inputCitiesFrom.value === item.name || inputCitiesFrom.value === item.name_translations.en;
    });
    const toName = dt.find((item) => {
        return inputCitiesTo.value === item.name ||inputCitiesTo.value === item.name_translations.en;
    });
    console.log(toName)
    let formData = {
        from: fromName.code,
        to: toName.code,
        when: inputDateDepart.value,
    }
    const requestData = `?depart_date=${formData.when}&origin=${formData.from}&destination=${formData.to}&one_way=true&token=${APY_KEY}`;
    getData(colendar + requestData, (response) => {
        renderCheap(response, formData.when);
    });
});
