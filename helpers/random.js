const getRandom = (iteraciones) => {
    //Maximo numero a generar
    const max = 1000;

    //Inicializo array con ceros
    let randomValues = Array(max + 1).fill(0);

    for (let i = 1; i <= iteraciones; i++) {
        const random_number = Math.floor(Math.random() * max) + 1 
        randomValues[random_number] = randomValues[random_number] + 1;
    }

    //Aca se convierte de array a objeto
    let i = 0;
    objRandom = randomValues.reduce(function (obj, v) {
        obj[i] = v;
        i++;
        return obj;
    }, {});

    delete objRandom["0"];

    return objRandom;
}

process.on('message', (itera) => {
    //Aca se recibe el pedido del proceso primario
    const randomResult = getRandom(itera);
    
    //Aca se enviar la respuesta al proceso primario
    process.send(randomResult);
})

