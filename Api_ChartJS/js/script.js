//Config. globales por default. Documentacion: https://www.chartjs.org/docs/3.3.1/configuration/
Chart.defaults.global.defaultsFontColor = '#fff'
Chart.defaults.global.elements.line.borderWidth = 1
Chart.defaults.global.elements.rectangle.borderWidth = 1
Chart.defaults.scale.gridLines.color = '#444'
Chart.defaults.scale.ticks.display = false


// API Ajax call
fetch('https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/2203/data?members=216%2C221%2C222%2C224%2C242%2C258%2C29180%2C29185%2C29190&format=json&app=databank&lang=es')
    .then(response => response.json())
    //.then(data => console.log(data))
    .then(data => printCharts(data))


function printCharts(paises) {
    console.log(paises)
    // Remove loading message, show chart panels 
    document.body.classList.add('running')

    // Call each chart function passing the coasters and DOM Canvas tag ID to be rendered
    compareRadialChart(paises, 'chart2')
    modelDoughnutChart(paises, 'chart4')
    heightRadarChart(paises, 'chart3')
    compareBarChart(paises, 'chart5')
    countriesRadarChart(paises, 'chart1')
    increaseLineChart(paises, 'chart6')

}


function compareRadialChart(paises, id) {
    console.log(paises.body.data)
    console.log(paises.body.data[0].value)

    // Every ChartJS chart needs data with labels and datasets
    const data = {
        labels: ['Bolivia', 'Brasil', 'Chile', 'Uruguay', 'Paraguay', 'Argentina'],
        datasets: [   // datasets is an Array of Objects, each Object contains one set of info/styles to be shown. In many charts, multiple sets of info can be rendered if multiple Objets are passed to the datasets Array
            {
                data: [

                    paises.body.data[14].value,
                    paises.body.data[4].value,
                    paises.body.data[7].value,
                    paises.body.data[10].value,
                    paises.body.data[13].value,
                    paises.body.data[17].value

                ],
                borderWidth: 1,
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor)
            }
        ]
    }

    // Every ChartJs chart can have multiple layout options
    const options = {
        legend: {
            position: 'right'
        }
    }

    // Every ChartJS chart receives two arguments: the Canvas id to place the chart, and an object with: chart type, data to show, layout options object (optional)
    new Chart(id, { type: 'polarArea', data, options })
}



function modelDoughnutChart(paises, id) {

    console.log(paises.body.data[0].dim_208)

    const data = {
        labels: ['Bolivia', 'Brasil', 'Chile', 'Uruguay', 'Paraguay', 'Argentina'],
        datasets: [
            {
                data: [

                    paises.body.data[0].value,
                    paises.body.data[2].value,
                    paises.body.data[5].value,
                    paises.body.data[8].value,
                    paises.body.data[11].value,
                    paises.body.data[15].value
                ],
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor),
                borderWidth: 1
            }
        ]
    }

    const options = {
        legend: {
            position: 'right'
        }
    }

    new Chart(id, { type: 'doughnut', data, options })
}



function heightRadarChart(paises, id) {

    const selectedCountry = paises.body.data.filter(eachChart => eachChart.value > 200000.000000000)

    //console.log(selectedCountry)

    const data = {
        labels: selectedCountry.map(eachChart => eachChart.iso3),
        datasets: [
            {
                label: 'Valor',
                data: selectedCountry.map(eachChart => eachChart.value),
                borderColor: styles.color.solids[1],
                borderWidth: 1
            }
        ]
    }

    const options = {
        legend: {
            display: false
        }
    }

    new Chart(id, { type: 'radar', data, options })
}

function compareBarChart(paises, id) {
    const data = {
        labels: ['Bolivia', 'Brasil', 'Chile', 'Uruguay', 'Paraguay', 'Argentina'],
        datasets: [
            {
                data: [

                    paises.body.data[14].value,
                    paises.body.data[4].value,
                    paises.body.data[7].value,
                    paises.body.data[10].value,
                    paises.body.data[13].value,
                    paises.body.data[17].value

                ],
                borderWidth: 1,
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor)
            }
        ]
    }

    const options = {
        legend: {
            display: false
        },
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    display: true
                }
            }]
        }
    }

    new Chart(id, { type: 'bar', data, options })
}

function countriesRadarChart(paises, id) {

    const selectedCountry = paises.body.data.filter(eachChart => eachChart.value);
    //console.log(selectedCountry)

    const data = {
        labels: selectedCountry.map(eachChart => eachChart.value),
        datasets: [
            {
                label: 'Bolivia',
                data: selectedCountry.map(eachChart => eachChart.iso3 === "BOL"),
                borderColor: styles.color.solids[0],
                backgroundColor: styles.color.alphas[0]
            },
            {
                label: 'Brasil',
                data: selectedCountry.map(eachChart => eachChart.iso3 === "BRA"),
                borderColor: styles.color.solids[1],
                backgroundColor: styles.color.alphas[1],
                hidden: true
            },
            {
                label: 'Chile',
                data: selectedCountry.map(eachChart => eachChart.iso3 === "CHL"),
                borderColor: styles.color.solids[2],
                backgroundColor: styles.color.alphas[2]
            },
            {
                label: 'Uruguay',
                data: selectedCountry.map(eachChart => eachChart.iso3 === "URY"),
                borderColor: styles.color.solids[3],
                backgroundColor: styles.color.alphas[3]
            },
            {
                label: 'Paraguay',
                data: selectedCountry.map(eachChart => eachChart.iso3 === "PRY"),
                borderColor: styles.color.solids[4],
                backgroundColor: styles.color.alphas[4]
            },
            {
                label: 'Argentina',
                data: selectedCountry.map(eachChart => eachChart.iso3 === "ARG"),
                borderColor: styles.color.solids[5],
                backgroundColor: styles.color.alphas[5]
            }
        ]
    }

    const options = {
        legend: {
            position: 'left'
        }
    }

    new Chart(id, { type: 'radar', data, options })
}

function increaseLineChart(paises, id) {

    const data = {
        labels: ['Bolivia', 'Brasil', 'Chile', 'Uruguay', 'Paraguay', 'Argentina'],
        datasets: [
            {
                data: [

                    paises.body.data[14].value,
                    paises.body.data[4].value,
                    paises.body.data[7].value,
                    paises.body.data[10].value,
                    paises.body.data[13].value,
                    paises.body.data[17].value

                ],
                borderWidth: 1,
                borderColor: styles.color.solids.map(eachColor => eachColor),
                backgroundColor: styles.color.alphas.map(eachColor => eachColor)
            }
        ]
    }


    const options = {
        legend: {
            display: false
        },
        maintainAspectRatio: false,
        scaleFontColor: '#fff',
        scales: {
            yAxes: [{
                ticks: {
                    display: true
                }
            }],
            xAxes: [{
                barPercentage: 0.4,
                ticks: {
                    display: true
                }
            }]
        }
    }


    new Chart(id, { type: 'line', data, options })
}