import { useState, useEffect, useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { InfoIcon, CheckCircle, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  postCorridaTest,
  postFrequencyTest,
  postKsTest,
  postMeanTest,
  postSerieTest,
} from "@/helpers/queries";
import Loader from "../ui/Loader";
const ESTADISTICO_INITIAL_VALUE = {
  estadisticoComparador: 0,
  numeroSubIntervalos: 1,
  divisionCeldas: 1,
};
export const EstadisticosTest = ({ numeros }) => {
  let comparador = "";
  let comparador0 = "";
  const formWhitoutAction = async () => {
    if (pruebaSeleccionada === "promedios") {
      const { esAleatorio, estadistico } = await postMeanTest(
        estadisticoComparador.estadisticoComparador,
        numeros
      );
      setResultadoPrueba({
        esAleatorio,
        estadistico,
      });
      setMostrarResultados(true);
    }
    if (pruebaSeleccionada === "frecuencia") {
      const { esAleatorio, estadistico } = await postFrequencyTest(
        estadisticoComparador.estadisticoComparador,
        numeros,
        estadisticoComparador.numeroSubIntervalos
      );
      setResultadoPrueba({
        esAleatorio,
        estadistico,
      });
      setMostrarResultados(true);
    }

    if (pruebaSeleccionada === "serie") {
      let numerosMandar = [...numeros]
      if(numerosMandar.length % 2 !==0){
        numerosMandar = [...numeros,0]
      }
     
      const { esAleatorio, estadistico } = await postSerieTest(
        estadisticoComparador.estadisticoComparador,
        numerosMandar,
        numerosMandar.length / 2,
        estadisticoComparador.numeroSubIntervalos
      );
      setResultadoPrueba({
        esAleatorio,
        estadistico,
      });
      setMostrarResultados(true);
    }

    if (pruebaSeleccionada === "kolmogorovSmirnov") {
      const { esAleatorio, estadistico } = await postKsTest(
        estadisticoComparador.estadisticoComparador,
        numeros
      );
      setResultadoPrueba({
        esAleatorio,
        estadistico,
      });
      setMostrarResultados(true);
    }

    if (pruebaSeleccionada === "corridas") {
      const { esAleatorio, estadistico } = await postCorridaTest(
        estadisticoComparador.estadisticoComparador,
        numeros
      );
      setResultadoPrueba({
        esAleatorio,
        estadistico,
      });
      setMostrarResultados(true);
    }
  };

  const preventDotComma = (e) => {
    const tecla = e.key;
    const esNumero = /^[0-9]$/.test(tecla);

    const teclasPermitidas = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Delete",
    ];

    const combinacionesPermitidas =
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x"].includes(tecla.toLowerCase());

    if (
      !esNumero &&
      !teclasPermitidas.includes(tecla) &&
      !combinacionesPermitidas
    ) {
      e.preventDefault(); // Bloquea lo que no está permitido
    }
  };

  useEffect(() => {
    setResultadoPrueba({
      esAleatorio: false,
      estadistico: 0,
    });
    setMostrarResultados(false);
  }, [numeros]);
  const [pruebaSeleccionada, setPruebaSeleccionada] = useState("promedios");
  const [estadisticoComparador, setEstadisticoComparador] = useState(
    ESTADISTICO_INITIAL_VALUE
  ); // Valor inicial para promedios
  const [resultadoPrueba, setResultadoPrueba] = useState({
    esAleatorio: false,
    estadistico: 0,
  });
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [disabledEnter, setDisabledEnter] = useState(true);
  const [formStatus, formAction, isPending] = useActionState(formWhitoutAction);
  const manejarCambio = (e) => {
    let input = e.target.value;
    const id = e.target.id;

    // Habilita/deshabilita botón enter
    setDisabledEnter(input === "");

    if (
      id === "numeroSubIntervalos" ||
      id === "divisionCeldas" ||
      id === "numeroParesDeU"
    ) {
      // Solo permitir números enteros (sin puntos)
      input = input.replace(/[^0-9]/g, "");

      // Valor mínimo 1
      if (input !== "") {
        const valor = parseInt(input, 10);
        if (valor < 1) input = "1";
      }
      if (input === "") {
        setDisabledEnter(true);
      }
    } else {
      if (input.startsWith(".")) {
        setDisabledEnter(true);
        e.preventDefault();
        return;
      }
      if (input === ",") {
        setDisabledEnter(true);
        e.preventDefault();
        return;
      }
      // Permitir solo números y un solo punto decimal
      input = input.replace(/[^0-9.]/g, "");

      // Evitar múltiples puntos decimales
      const partes = input.split(".");
      if (partes.length > 2) {
        input = partes[0] + "." + partes.slice(1).join("");
      }
    }

    // Actualizar estado
    setEstadisticoComparador((prevState) => ({
      ...prevState,
      [id]: input,
    }));
  };

  if (!numeros || numeros.length === 0) {
    return (
      <Alert
        className={
          "bg-gradient-to-r py-4  from-cyan-500 to-purple-600 text-white rounded-t-lg"
        }
      >
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Sin datos para analizar</AlertTitle>
        <AlertDescription className="text-white">
          Genera o ingresa números para ver los resultados de las pruebas
          estadísticas.
        </AlertDescription>
      </Alert>
    );
  }
  const nombresPruebas = {
    promedios: "Prueba de Promedios",
    frecuencia: "Prueba de Frecuencia",
    serie: "Prueba de la Serie",
    kolmogorovSmirnov: "Prueba de Kolmogorov-Smirnov",
    corridas: "Prueba de Corridas",
  };
  if (pruebaSeleccionada === "promedios") {
    comparador = (
      <>
        Z<sub>&alpha;</sub>
      </>
    );
    comparador0 = (
      <>
        Z<sub>0</sub>
      </>
    );
  }
  if (pruebaSeleccionada === "frecuencia") {
    comparador = (
      <>
        𝜒<sup>2</sup> <sub>&alpha;</sub>
      </>
    );
    comparador0 = (
      <>
        Z<sub>0</sub>
      </>
    );
  }
  if (pruebaSeleccionada === "serie") {
    comparador = (
      <>
        𝜒<sup>2</sup>
        <sub>&alpha;</sub>
      </>
    );
    comparador0 = (
      <>
        𝜒<sup>2</sup>
      </>
    );
  }
  if (pruebaSeleccionada === "kolmogorovSmirnov") {
    comparador = (
      <>
        d<sub>&alpha;,n</sub>
      </>
    );
    comparador0 = (
      <>
        D<sub>n</sub>
      </>
    );
  }
  if (pruebaSeleccionada === "corridas") {
    comparador = (
      <>
        𝜒<sub>&alpha;,n/2</sub>
      </>
    );
    comparador0 = (
      <>
        𝜒<sup>2</sup>
      </>
    );
  }

  return (
    <Card className="mt-6 pb-2 pt-0 w-full md:w-3/4">
      <CardHeader className="bg-gradient-to-r py-4  from-cyan-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle>Pruebas Estadísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <form action={formAction}>
            <div className="grid  gap-4">
              <div className="w-full">
                <Label htmlFor="prueba-select" className="md:text-center ">
                  Seleccionar Prueba
                </Label>
                <Select
                  className="w-full"
                  value={pruebaSeleccionada}
                  onValueChange={(value) => {
                    setPruebaSeleccionada(value);
                    setMostrarResultados(false);
                    setResultadoPrueba(null);
                    setEstadisticoComparador(ESTADISTICO_INITIAL_VALUE);
                  }}
                >
                  <SelectTrigger id="prueba-select" className=" mt-2 w-full">
                    <SelectValue placeholder="Seleccionar prueba" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promedios">
                      Prueba de los Promedios
                    </SelectItem>
                    <SelectItem value="frecuencia">
                      Prueba de la Frecuencia
                    </SelectItem>
                    <SelectItem value="serie">Prueba de la Serie</SelectItem>
                    <SelectItem value="kolmogorovSmirnov">
                      Prueba de Kolmogorov-Smirnov
                    </SelectItem>
                    <SelectItem value="corridas">
                      Prueba de la Corrida
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {pruebaSeleccionada === "promedios" && (
                <>
                  <div>
                    <Label htmlFor="estadisticoComparador">
                      <p>{comparador}</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="estadisticoComparador"
                      type="text"
                      value={estadisticoComparador.estadisticoComparador}
                      onChange={manejarCambio}
                    />
                  </div>
                </>
              )}
              {pruebaSeleccionada === "frecuencia" && (
                <>
                  <div>
                    <Label htmlFor="estadisticoComparador">
                      <p>{comparador}</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="estadisticoComparador"
                      type="text"
                      value={estadisticoComparador.estadisticoComparador}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div>
                    <Label htmlFor="numeroSubIntervalos">
                      <p>x</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="numeroSubIntervalos"
                      type="text"
                      value={estadisticoComparador.numeroSubIntervalos}
                      onKeyDown={preventDotComma}
                      onChange={manejarCambio}
                    />
                  </div>
                </>
              )}
              {pruebaSeleccionada === "serie" && (
                <>
                  <div>
                    <p style={{fontSize:15}} className="text-gray-500 mb-3">Aviso: Si la cantidad de numeros ingresados es impar, se agregara un Ui = 0 al final</p>
                    <Label>
                      <p>{comparador}</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="estadisticoComparador"
                      type="text"
                      value={estadisticoComparador.estadisticoComparador}
                      onChange={manejarCambio}
                    />
                  </div>
                  <div>
                    <Label>
                      <p>x</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="numeroSubIntervalos"
                      type="number"
                      value={estadisticoComparador.numeroSubIntervalos}
                      onKeyDown={preventDotComma}
                      onChange={manejarCambio}
                    />
                  </div>
                </>
              )}
              {pruebaSeleccionada === "kolmogorovSmirnov" && (
                <>
                  <div>
                    <Label>
                      <p>{comparador}</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="estadisticoComparador"
                      type="text"
                      value={estadisticoComparador.estadisticoComparador}
                      onChange={manejarCambio}
                    />
                  </div>
                </>
              )}
              {pruebaSeleccionada === "corridas" && (
                <>
                  <div className="w-full">
                    <Label>
                      <p>{comparador}</p>
                    </Label>
                    <Input
                      className={"mt-2"}
                      id="estadisticoComparador"
                      type="text"
                      value={estadisticoComparador.estadisticoComparador}
                      onChange={manejarCambio}
                    />
                  </div>
                </>
              )}
            </div>
            <Button
              className="bg-sky-500 mt-2"
              disabled={isPending || disabledEnter}
            >
              Aplicar
            </Button>
          </form>
          {isPending && <Loader />}
          {mostrarResultados && !isPending && (
            <div className="mt-6 space-y-4">
              <div className="flex mb-0 items-center gap-2 text-lg font-medium">
                <h3>{nombresPruebas[pruebaSeleccionada]}</h3>
                {resultadoPrueba.esAleatorio ? (
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    Pasa
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                    No pasa
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {resultadoPrueba.esAleatorio
                  ? `No se rechaza la hipótesis de que los números
provienen de un universo uniformemente distribuido.`
                  : `Se rechaza la hipótesis de que los números
provienen de un universo uniformemente distribuido.`}
              </p>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <p>{comparador0}</p>
                    </TableHead>
                    <TableHead className="ms-[2rem]">
                      <p>
                        ¿ |{comparador0}| &lt; {comparador} ?
                      </p>
                    </TableHead>
                    <TableHead>Resultado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {resultadoPrueba.estadistico.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      {resultadoPrueba.esAleatorio ? (
                        <div className="flex ms-[1rem] content-center items-center gap-1 text-green-600">
                          <CheckCircle className="ms-[1rem] h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex content-center text-center items-center gap-1 text-red-600">
                          <div className=" ms-[1rem] flex text-center content-center align-items-center">
                            <XCircle className="ms-[1rem] h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {resultadoPrueba.esAleatorio ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span>Pasa la prueba</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-600">
                          <XCircle className="h-4 w-4" />
                          <span>No pasa la prueba</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {pruebaSeleccionada === "chiCuadrado" && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">
                    Distribución de Frecuencias
                  </h4>
                  <div className="h-40">
                    <GraficoDistribucion numeros={numeros} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
