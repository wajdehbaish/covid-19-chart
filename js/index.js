let myChart

function Charting(names, values) {
    if (myChart)
        myChart.destroy()
    let ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: names,
            datasets: [{
                label: '# of Votes',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                tension: 0.4,
                responsive: true,
                fill: true

            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const confirmed = document.querySelector('.confirmed'),
    deaths = document.querySelector('.deaths'),
    recovered = document.querySelector('.recovered'),
    critical = document.querySelector('.critical'),
    asia = document.querySelector('.asia'),
    americas = document.querySelector('.americas'),
    africa = document.querySelector('.africa'),
    europe = document.querySelector('.europe'),
    world = document.querySelector('.world'),
    countriesContainer = document.querySelector('.countriesContainer'),
    chooseCountry = document.querySelector('#chooseCountry'),
    num1 = document.querySelector('.num1'),
    num2 = document.querySelector('.num2'),
    num3 = document.querySelector('.num3'),
    num4 = document.querySelector('.num4'),
    num5 = document.querySelector('.num5'),
    num6 = document.querySelector('.num6');

let region = '';



async function getData() {
    if (!localStorage.getItem("tempStorage")) {
        let data1 = await (await fetch('https://corona-api.com/countries')).json();
        let data2 = await (await fetch('https://api.allorigins.win/raw?url=https://restcountries.herokuapp.com/api/v1')).json();
        localStorage.setItem("countries", JSON.stringify({ data1 }))
        localStorage.setItem("regions", JSON.stringify({ data2 }))
    }
    let data = JSON.parse(localStorage.getItem("tempStorage"))
}
getData()
let getCount = JSON.parse(window.localStorage.getItem("countries"));
console.log(getCount);
let getReg = JSON.parse(window.localStorage.getItem("regions"));
console.log(getReg);

function getNameOfCountry(reg) {
    let country = getReg.data2
    console.log(country);
    return country.filter(val => (val.region === reg)).map(ele =>
        ele.name.common
    )
}
console.log(getNameOfCountry('Africa'))

function getAllCases(regionName, cases = 'confirmed') {
    let obj = {}

    region = regionName
    getNameOfCountry(regionName).forEach(element => {
        getCount.data1.data.map(val => {

            if (val.name == element) {
                obj[`${element}`] = val.latest_data[`${cases}`]

            }
        })

    });
    return (obj)
}
console.log(getAllCases('Asia', 'confirmed'));



Charting(Object.keys(getAllCases('Asia', 'confirmed')), Object.values(getAllCases('Asia', 'confirmed')))



confirmed.addEventListener('click', () => {
    Charting(Object.keys(getAllCases(region, 'confirmed')), Object.values(getAllCases(region, 'confirmed')))
})
deaths.addEventListener('click', () => {
    Charting(Object.keys(getAllCases(region, 'deaths')), Object.values(getAllCases(region, 'deaths')))
})
recovered.addEventListener('click', () => {
    Charting(Object.keys(getAllCases(region, 'recovered')), Object.values(getAllCases(region, 'recovered')))
})
critical.addEventListener('click', () => {
    Charting(Object.keys(getAllCases(region, 'critical')), Object.values(getAllCases(region, 'critical')))
})

asia.addEventListener('click', () => {
    Charting(Object.keys(getAllCases('Asia')), Object.values(getAllCases('Asia')))
})
americas.addEventListener('click', () => {
    Charting(Object.keys(getAllCases('Americas')), Object.values(getAllCases('Americas')))
})
africa.addEventListener('click', () => {
    Charting(Object.keys(getAllCases('Africa')), Object.values(getAllCases('Africa')))
})
europe.addEventListener('click', () => {
    Charting(Object.keys(getAllCases('Europe')), Object.values(getAllCases('Europe')))
})


asia.addEventListener('click', () => {
    handleRegionClick
    chooseCountrySelect('Asia')
})
americas.addEventListener('click', () => {
    handleRegionClick
    chooseCountrySelect('Americas')
})
africa.addEventListener('click', () => {
    handleRegionClick
    chooseCountrySelect('Africa')
})
europe.addEventListener('click', () => {
    handleRegionClick
    chooseCountrySelect('Europe')
})


function chooseCountrySelect(region) {
    chooseCountry.innerHTML = '';
    for (let i = 0; i < getNameOfCountry(region).length; i++)
        chooseCountry.innerHTML += `<option value="${getNameOfCountry(region)[i]}">${getNameOfCountry(region)[i]}</option>`

}

chooseCountry.addEventListener('change', () => {
    let select = document.querySelector('select').value
    for (let i = 0; i < getCount.data1.data.length; i++) {
        if (select == getCount.data1.data[i].name) {

            num1.innerHTML = getCount.data1.data[i].latest_data.confirmed
            num2.innerHTML = getCount.data1.data[i].today.confirmed
            num3.innerHTML = getCount.data1.data[i].latest_data.deaths
            num4.innerHTML = getCount.data1.data[i].today.deaths
            num5.innerHTML = getCount.data1.data[i].latest_data.recovered
            num6.innerHTML = getCount.data1.data[i].latest_data.critical


        }
    }
})


function handleRegionClick(e) {
    let region = e.target.innerHTML
    let countries = getNameOfCountry(region)
    countriesContainer.innerHTML = ''
    for (let i = 0; i < countries.length; i++) {
        const span = document.createElement('span')
        span.innerHTML = countries[i]

    }
}