function consumo() {
    const fileInput = document.getElementById('archivo_json');
    const file = fileInput.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const jsonData = JSON.parse(e.target.result);
            generarGraficas(jsonData);
        };
        reader.readAsText(file);
    }
}

function generarGraficas(jsonData) {
    const passwords8Chars = jsonData.filter(data => data.password.length > 8).length;

    const emailDomains = {};
    jsonData.forEach(data => {
        const domain = data.email.split('@')[1];
        if (emailDomains[domain]) {
            emailDomains[domain]++;
        } else {
            emailDomains[domain] = 1;
        }
    });

    const domainLabels = Object.keys(emailDomains);
    const domainCounts = Object.values(emailDomains);

    console.log("Contraseñas con más de 8 caracteres:", passwords8Chars);
    console.log("Dominios de correo electrónico:", emailDomains);

    const dataContraseñas = [{
        x: ['Contraseñas > 8 caracteres'],
        y: [passwords8Chars],
        type: 'bar'
    }];
    Plotly.newPlot('myDiv_password', dataContraseñas);

    const dataDominios = [{
        x: domainLabels,
        y: domainCounts,
        type: 'bar'
    }];
    Plotly.newPlot('myDiv_dominios', dataDominios);
}