export const getMiddleSquare = async (M, N, TOT) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/aleatorio/cuadradosMedios?m=${M}&n=${N}&tot=${TOT}`
    );

    const { numeros, mensaje } = await fetchedData.json();
    return { numeros, mensaje };
  } catch (error) {
    console.log(error);
  }
};
export const getLehmer = async (semilla, t, k, cantidadDeNumerosAGenerar) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/aleatorio/lehmer?m=${semilla}&t=${t}&k=${k}&tot=${cantidadDeNumerosAGenerar}`
    );

    const { numeros, mensaje } = await fetchedData.json();
    return { numeros, mensaje };
  } catch (error) {
    console.log(error);
  }
};
export const getMixedCongruential = async (n, a, c, m, tot) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/aleatorio/congruencialMixto?n=${n}&a=${a}&c=${c}&m=${m}&tot=${tot}`
    );

    const { numeros, mensaje } = await fetchedData.json();
    return { numeros, mensaje };
  } catch (error) {
    console.log(error);
  }
};
export const getMultiplicativeCongruential = async (n, a, m, tot) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/aleatorio/congruencialMultiplicativo?n=${n}&a=${a}&m=${m}&tot=${tot}`
    );

    const { numeros, mensaje } = await fetchedData.json();
    return { numeros, mensaje };
  } catch (error) {
    console.log(error);
  }
};
export const postAdditiveCongruential = async (m, tot, semillas) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/aleatorio/congruencialAditivo`,
      {
        method: "POST",
        body: JSON.stringify({ m, tot, semillas }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { numeros, mensaje } = await fetchedData.json();
    return { numeros, mensaje };
  } catch (error) {
    console.log(error);
  }
};
export const postMeanTest = async (comparador, valoresU) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/prueba/promedios`,
      {
        method: "POST",
        body: JSON.stringify({ comparador, valoresU }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { esAleatorio, estadistico } = await fetchedData.json();
    return { esAleatorio, estadistico };
  } catch (error) {
    console.log(error);
  }
};
export const postSerieTest = async (comparador, valoresU, n, x) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/prueba/series`,
      {
        method: "POST",
        body: JSON.stringify({ comparador, valoresU, n, x }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { esAleatorio, estadistico } = await fetchedData.json();
    return { esAleatorio, estadistico };
  } catch (error) {
    console.log(error);
  }
};
export const postKsTest = async (comparador, valoresU) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/prueba/ks`,
      {
        method: "POST",
        body: JSON.stringify({ comparador, valoresU }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { esAleatorio, estadistico } = await fetchedData.json();
    return { esAleatorio, estadistico };
  } catch (error) {
    console.log(error);
  }
};
export const postCorridaTest = async (comparador, valoresU) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/prueba/corrida`,
      {
        method: "POST",
        body: JSON.stringify({ comparador, valoresU }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { esAleatorio, estadistico } = await fetchedData.json();
    return { esAleatorio, estadistico };
  } catch (error) {
    console.log(error);
  }
};
export const postFrequencyTest = async (comparador, valoresU, x) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/prueba/frecuencia`,
      {
        method: "POST",
        body: JSON.stringify({ comparador, valoresU, x }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { esAleatorio, estadistico } = await fetchedData.json();
    return { esAleatorio, estadistico };
  } catch (error) {
    console.log(error);
  }
};
