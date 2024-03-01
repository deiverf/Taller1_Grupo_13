function consumo() {
    var endPoint = document.getElementById('endPoint').value;
    fetch(endPoint)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var regiones = {};
            
            // Filtrar los datos por regiones
            data.forEach(function (pais) {
                var region = pais.region;
                if (region === 'Asia' || region === 'Europe') {
                    if (!regiones[region]) {
                        regiones[region] = [];
                    }
                    regiones[region].push(pais);
                } else if (region === 'Americas' && pais.subregion === 'South America') {
                    if (!regiones['Sudamérica']) {
                        regiones['Sudamérica'] = [];
                    }
                    regiones['Sudamérica'].push(pais);
                }
            });
            
            // Crear datos para la gráfica de barras
            var barras = [];
            for (var region in regiones) {
                if (regiones.hasOwnProperty(region)) {
                    var paisesRegion = regiones[region];
                    var nombresPaises = paisesRegion.map(function (pais) { return pais.name.common; });
                    var poblacionRegion = paisesRegion.map(function (pais) { return pais.population; });
                    barras.push({
                        x: nombresPaises,
                        y: poblacionRegion,
                        type: 'bar',
                        name: region
                    });
                }
            }

            Plotly.newPlot('myDiv', barras, {
                barmode: 'group',
                xaxis: {
                    title: 'Países'
                },
                yaxis: {
                    title: 'Población'
                }
            });
        })
        .catch(function (error) {
            console.log('Error: ' + error);
        });
}    