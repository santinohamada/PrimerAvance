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
export const getMultiplicativeCongruential = async (n, a, c, m, tot) => {
  try {
    const fetchedData = await fetch(
      `https://generadoresypruebasapi.onrender.com/aleatorio/congruencialMultiplicativo?n=${n}&a=${a}&c=${c}&m=${m}&tot=${tot}`
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
