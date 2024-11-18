function calcularepFcn() {
    const presion = parseFloat(document.querySelector("#presion").value);
    const diametro = parseFloat(document.querySelector("#diametro").value);
    const longitud = parseFloat(document.querySelector("#Longitud").value);

    /* Materiales */
    const material = parseFloat(document.querySelector('#Material').value);
    const { UTS, Ys, rhoMaterial } = obtenerPropiedadesMaterial(material);

    /* Eficiencia de la junta */
    const eficiencia = parseFloat(document.querySelector("#Eficiencia").value);
    const eta = obtenerEficiencia(eficiencia);

    /* Nivel y Densidad */
    const nivel = parseFloat(document.querySelector("#Nivel").value);
    const rho = parseFloat(document.querySelector("#Densidad").value);

    /* Calculos */
    const S = Math.min(UTS / 3.5, Ys * 2 / 3);

    /* Calculo de las tapas */
    const ttapas = (presion * diametro) / (2 * S * eta - 0.2 * presion) / 0.0254;
    document.querySelector("#espesortapas").value = ttapas.toFixed(4);

    /* Calculo del cuerpo */
    const tcuerpo = (presion * (diametro / 2)) / (S * eta - 0.6 * presion) / 0.0254;
    document.querySelector("#espesorcuerpo").value = tcuerpo.toFixed(4);

    /* Volumen de las tapas */
    const espesortapareal = obtenerEspesorReal('#espesorrealtapa');
    const Vtapas = calcularVolumenTapas(diametro, espesortapareal);

    /* Volumen del cuerpo */
    const espesorcuerporeal = obtenerEspesorReal('#espesorrealcuerpo');
    const Vcuerpo = calcularVolumenCuerpo(diametro, longitud, espesorcuerporeal);

    /* Cálculo del peso del equipo */
    const pesoequipo = (Vtapas + Vcuerpo) * rhoMaterial;
    document.querySelector('#pesoequipo').value = pesoequipo.toFixed(0);

    /* Cálculo del peso del líquido en el recipiente */
    const Vliquido = Math.PI * longitud * Math.pow(diametro / 2, 2); // Volumen del líquido
    const pesoliquido = Vliquido * rho; // Peso del líquido
    const pesoequipolleno = pesoequipo + pesoliquido; // Peso total del equipo lleno
    document.querySelector('#pesoequipolleno').value = pesoequipolleno.toFixed(0);

    // Verificar espesores
    verificarEspesor('#espesortapas', ttapas, espesortapareal);
    verificarEspesor('#espesorcuerpo', tcuerpo, espesorcuerporeal);
}

// Función para obtener propiedades del material
function obtenerPropiedadesMaterial(material) {
    const propiedades = {
        1: { UTS: 415, Ys: 230, rhoMaterial: 7800 },
        2: { UTS: 450, Ys: 275, rhoMaterial: 7800 },
        3: { UTS: 485, Ys: 275, rhoMaterial: 7800 },
        4: { UTS: 415, Ys: 220, rhoMaterial: 7860 },
        5: { UTS: 485, Ys: 260, rhoMaterial: 7850 }
    };
    return propiedades[material] || { UTS: 0, Ys: 0, rhoMaterial: 0 };
}

// Función para obtener la eficiencia
function obtenerEficiencia(eficiencia) {
    const eficiencias = {
        1: 1,
        2: 0.85,
        3: 0.75
    };
    return eficiencias[eficiencia] || 0;
}

// Función para obtener el espesor real
function obtenerEspesorReal(selector) {
    const valor = parseFloat(document.querySelector(selector).value);
    const espesores = {
        1: 1 / 8,
        2: 1 / 4,
        3: 1 / 3,
        4: 3 / 8,
        5: 1 / 2,
        6: 5 / 8,
        7: 3 / 4,
        8: 7 / 8,
        9: 1,
        10: 1 + 1 / 4,
        11: 1 + 3 / 8,
        12: 1 + 1 / 2,
        13: 1 + 5 / 8,
        14: 1 + 3 / 4,
        15: 2
    };
    return espesores[valor] || 0;
}

// Función para calcular el volumen de las tapas
function calcularVolumenTapas(diametro, espesortapareal) {
    return Math.PI / 12 * (Math.pow(diametro + 2 * espesortapareal, 3) - Math.pow(diametro, 3));
}

// Función para calcular el volumen del cuerpo
function calcularVolumenCuerpo(diametro, longitud, espesorcuerporeal) {
    return Math.PI * longitud / 12 * (Math.pow(diametro + 2 * espesorcuerporeal, 2) - Math.pow(diametro, 2));
}

// Función para verificar el espesor
function verificarEspesor(selector, calculado, real) {
    const input = document.querySelector(selector);
    if (real < calculado) {
        input.style.backgroundColor = 'rgb(255,199,206)';
        input.style.color = 'rgb(156,0,6)';
    } else {
        input.style.backgroundColor = 'rgb(198,239,206)';
        input.style.color = 'rgb(0,97,0)';
    }
}
