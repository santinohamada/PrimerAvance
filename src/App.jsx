import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import "./index.css";
import {
  SquareDot,
  BarChart3,
  Cpu,
  Dices,
  TriangleAlert,
  Sigma,
  X,
  Activity,
  KeyboardIcon,
} from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import MiddleSquare from "./components/generators/MiddleSquare";
import Lehmer from "./components/generators/Lehmer";
import MixedCongruential from "./components/generators/MixedCongruential";
import MultiplicativeCongruential from "./components/generators/MultiplicativeCongruential";
import AdditiveCongruential from "./components/generators/AdditiveCongruential";

import { EstadisticosTest } from "./components/tests/EstadisticosTest";

export default function RandomNumberGenerators() {
  const formWithoutAction = async (formData) => {
    const input = formData.get("ingresoManual");
    const data = input.trim().split("\n");
    setManualNumbers(data);
    setValorCargado(valor);
  };
  const [message, setMessage] = useState("");
  const [disabledEnter, setDisabledEnter] = useState(true);
  const [valor, setValor] = useState("");
  const [enteros, setEnteros] = useState("");
  const [valorCargado, setValorCargado] = useState("");
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [manualNumbers, setManualNumbers] = useState([]);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [quantity, setQuantity] = useState(10);
  const handleCambioEnteros = (e) => {
    let input = e.target.value;

    // Solo permite números y saltos de línea
    input = input.replace(/[^\d\n]/g, "");

    const lineas = input.split("\n");

    const nuevasLineas = [];

    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i];

      // No permitir líneas vacías seguidas
      if (linea.trim() === "" && nuevasLineas[nuevasLineas.length - 1] === "") {
        continue;
      }

      // Solo agregar si es una línea vacía (única) o un número válido
      if (linea.trim() === "" || /^\d+$/.test(linea)) {
        nuevasLineas.push(linea);
      }
    }

    setEnteros(nuevasLineas.join("\n"));
  };

  const handleKeyDownEnteros = (e) => {
    const { key } = e;

    const cursor = e.target.selectionStart;
    const hastaCursor = enteros.slice(0, cursor);
    const lineas = hastaCursor.split("\n");
    const lineaActual = lineas[lineas.length - 1];

    const esNumero = /^[0-9]$/.test(key);

    const teclasPermitidas = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
      "Delete",
    ];

    const combinacionesPermitidas =
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x"].includes(key.toLowerCase());

    if (
      !esNumero &&
      !teclasPermitidas.includes(key) &&
      !combinacionesPermitidas
    ) {
      e.preventDefault(); // Bloquea lo que no está permitido
    }

    // Bloquear salto si la línea está vacía
    if (key === "Enter" && lineaActual.trim() === "") {
      e.preventDefault();
    }

    // Bloquear salto si la siguiente línea ya es vacía
    if (key === "Enter") {
      const despuesCursor = enteros.slice(cursor);
      if (despuesCursor.startsWith("\n")) {
        e.preventDefault();
      }
    }

    // Bloquear cualquier tecla que no sea número o navegación
    if (
      !/^\d$/.test(key) &&
      key !== "Enter" &&
      key !== "Backspace" &&
      key !== "Delete" &&
      !key.startsWith("Arrow")
    ) {
      e.preventDefault();
    }
  };

  const manejarCambio = (e) => {
    setManualNumbers([]);
    setDisabledEnter(false);
    let input = e.target.value;

    // Reemplazar comas por puntos.
    input = input.replace(/,/g, ".");

    // Reemplazar guiones (normales, largos y em-dash) seguidos de espacios u otros saltos con un solo salto.
    input = input.replace(/[-–—]\s*/g, "\n");
    input = input.replace(/[;]\s*/g, "\n");

    // Solo permite números, puntos y saltos de línea.
    input = input.replace(/[^0-9.\n]/g, "");

    // Separa el contenido en líneas.
    let lineas = input.split("\n");

    // Si proviene de un pegado, se eliminan TODAS las líneas vacías
    if (e.inputType && e.inputType === "insertFromPaste") {
      lineas = lineas.filter((linea) => linea.trim() !== "");
    } else {
      // Para entrada manual se permite, a lo sumo, una línea vacía sin ser consecutivas.
      const nuevasLineas = [];
      for (let i = 0; i < lineas.length; i++) {
        const linea = lineas[i].trim();
        // Si la línea está vacía y la anterior ya es vacía, se omite.
        if (
          linea === "" &&
          nuevasLineas.length &&
          nuevasLineas[nuevasLineas.length - 1] === ""
        ) {
          continue;
        }
        nuevasLineas.push(linea);
      }
      lineas = nuevasLineas;
    }

    // Proceso adicional para evitar múltiples puntos por línea y líneas que terminen en punto.
    const finalLines = [];
    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i];
      // Se cuentan los puntos.
      const puntos = (linea.match(/\./g) || []).length;
      if (puntos > 1) continue;
      // Si la línea termina en punto, se deshabilita más saltos.
      if (linea.endsWith(".")) {
        setDisabledEnter(true);
        finalLines.push(linea);
        break;
      }
      finalLines.push(linea);
    }

    setValor(finalLines.join("\n"));
  };

  const manejarKeyDown = (e) => {
    const { key } = e;
    const cursor = e.target.selectionStart;
    const antes = valor.slice(0, cursor);
    const despues = valor.slice(cursor);

    // Separamos el contenido hasta el cursor en líneas.
    const lineasHastaCursor = antes.split("\n");
    const currentLine = lineasHastaCursor[lineasHastaCursor.length - 1] || "";
    const previousLine = lineasHastaCursor[lineasHastaCursor.length - 2] || "";

    // --- Coma: No permitir si la línea actual está vacía ---
    if (key === ",") {
      if (currentLine.trim() === "") {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      // Se reemplaza la coma por un punto.

      if (antes.includes(".")) return;
      const nuevoValor = `${antes}.${despues}`;
      setValor(nuevoValor);
      setTimeout(() => {
        const nuevaPos = antes.length + 1;
        e.target.setSelectionRange(nuevaPos, nuevaPos);
      }, 0);
      return;
    }

    // --- Guion (y variantes): No permitir salto de línea si la línea actual está vacía ---
    if (key === "-" || key === "–" || key === "—" || key === ";") {
      if (currentLine.trim() === "") {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      const nuevoValor = `${antes}\n${despues}`;
      setValor(nuevoValor);
      setTimeout(() => {
        const nuevaPos = antes.length + 1;
        e.target.setSelectionRange(nuevaPos, nuevaPos);
      }, 0);
      return;
    }

    // --- Enter: Permitir salto de línea solo si la línea actual NO está vacía ---

    if (key === "Enter") {
      // Si la línea actual ya está vacía, se bloquea el Enter.
      if (currentLine.trim() === "") {
        e.preventDefault();
        return;
      }
      // Se evita insertar otro salto si justo después ya hay uno.
      if (despues.startsWith("\n")) {
        e.preventDefault();
        return;
      }
    }

    // --- Punto: No permitir si no hay un número previo ni si ya hay un punto en la línea ---
    if (key === ".") {
      const trimmedCurrentLine = currentLine.trimEnd();
      if (trimmedCurrentLine === "" || !/\d$/.test(trimmedCurrentLine)) {
        e.preventDefault();
        return;
      }

      const puntos = (currentLine.match(/\./g) || []).length;
      if (puntos >= 1) {
        e.preventDefault();
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto py-8 max-w-5xl px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
            Generadores de Números Aleatorios
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Herramienta para generar y analizar secuencias de números
            pseudoaleatorios utilizando diferentes métodos
          </p>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center space-x-2">
            <Switch
              id="automatic-mode"
              checked={isAutomatic}
              onCheckedChange={setIsAutomatic}
              className="data-[state=checked]:bg-purple-600"
            />
            <Label htmlFor="automatic-mode" className="font-medium">
              {isAutomatic ? "Generación Automática" : "Ingreso Manual"}
            </Label>
          </div>
        </div>

        {!isAutomatic ? (
          <Card className="mb-8 p-0 gap-2 border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r py-3 from-purple-600 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center ">
                <KeyboardIcon className="h-5 w-5 me-2" />
                Ingreso Manual de Números
              </CardTitle>
              <CardDescription className="text-white/80">
                Ingrese los números (Separados por saltos de linea).
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="manual-input" className="text-sm font-medium">
                    Números
                  </Label>
                  <form action={formWithoutAction} className="flex space-x-2">
                    <Textarea
                      name="ingresoManual"
                      id="manual-input"
                      value={valor}
                      onChange={manejarCambio}
                      onKeyDown={manejarKeyDown}
                      placeholder="Ej:\n3.14\n2.71\n1.618"
                      rows={6}
                      cols={30}
                      style={{ resize: "none" }}
                    />
                    <Button
                      disabled={
                        disabledEnter || valor === "" || valor === valorCargado
                      }
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Cargar
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 p-0 border-none gap-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r py-4  from-purple-600 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex  items-center gap-2">
                <BarChart3 className="h-5  w-5" />
                Cantidad de Números a Generar
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex  flex-col space-y-4">
                  <div className="flex justify-between">
                    <Input
                      min="0"
                      id="quantity"
                      type={"number"}
                      value={quantity}
                      onKeyDown={handleKeyDownEnteros}
                      onChange={(e) => {
                        handleCambioEnteros(e);
                        setQuantity(e.target.value);
                      }}
                      className="py-4"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isAutomatic && (
          <div className="flex content-center justify-center">
            <Tabs defaultValue="middle-square" className="mb-8 ">
              <TabsList className="grid grid-cols-5 gap-1  mb-6 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-md">
                <TabsTrigger
                  value="middle-square"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="hidden md:inline xl:inline">
                      <SquareDot className="h-4 w-4" />
                    </span>
                    <span className="hidden xl:inline">Cuadrado Medio</span>
                    <span className="sm:inline xl:hidden  md:inline">
                      C. Medio
                    </span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="lehmer"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="hidden md:inline xl:inline">
                      <Cpu className="h-4 w-4" />
                    </span>
                    <span className="sm:inline  xl:inline md:inline">
                      Lehmer
                    </span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="mixed"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <div className="flex items-center gap-2">
                    <span className="hidden md:inline xl:inline">
                      <Dices className="h-4 w-4" />
                    </span>
                    <span className="hidden xl:inline">Congruencial Mixto</span>
                    <span className="sm:inline  xl:hidden md:inline">
                      C. Mixto
                    </span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="multiplicative"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <div className="flex align-baseline items-center px-2 ">
                    <span className="hidden md:inline xl:inline">
                      <X className="h-4 w-4" />
                    </span>
                    <span className="hidden xl:inline">
                      Congruencial Multiplicativo
                    </span>
                    <span className="sm:inline xl:hidden md:inline">
                      C. Mult.
                    </span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="additive"
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <div className="flex align-baseline items-center px-2 ">
                    <span className="hidden md:inline xl:inline">
                      <Sigma className="h-4 w-4" />
                    </span>
                    <span className="hidden xl:inline">
                      Congruencial Aditivo
                    </span>
                    <span className="sm:inline xl:hidden md:inline">
                      C. Aditivo
                    </span>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="middle-square">
                <MiddleSquare
                  quantity={quantity}
                  setGeneratedNumbers={setGeneratedNumbers}
                  setMessage={setMessage}
                />
              </TabsContent>
              <TabsContent value="lehmer">
                <Lehmer
                  quantity={quantity}
                  setGeneratedNumbers={setGeneratedNumbers}
                  setMessage={setMessage}
                />
              </TabsContent>
              <TabsContent value="mixed">
                <MixedCongruential
                  quantity={quantity}
                  setGeneratedNumbers={setGeneratedNumbers}
                  setMessage={setMessage}
                />
              </TabsContent>
              <TabsContent value="multiplicative">
                <MultiplicativeCongruential
                  quantity={quantity}
                  setGeneratedNumbers={setGeneratedNumbers}
                  setMessage={setMessage}
                />
              </TabsContent>
              <TabsContent value="additive">
                <AdditiveCongruential
                  quantity={quantity}
                  setGeneratedNumbers={setGeneratedNumbers}
                  setMessage={setMessage}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {isAutomatic && generatedNumbers.length > 0 && (
          <div className="grid grid-cols-1 mb-8">
            <Card className="border-none shadow-lg py-0 gap-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r py-3 from-cyan-500 to-cyan-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Números Generados
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="max-h-[350px] overflow-y-scroll">
                  <Table>
                    <TableHeader className="bg-slate-100 dark:bg-slate-800 sticky top-0">
                      <TableRow>
                        <TableHead className="text-center font-bold">
                          i
                        </TableHead>
                        <TableHead className="text-center font-bold">
                          U<sub>i</sub>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generatedNumbers.map((num, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <TableCell className="text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="text-center font-mono">
                            {num.toFixed(6)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            {message !== "" ? (
              <div className="flex mt-3 justify-center">
                <p className=" flex max-w-1/2 rounded  align-baseline content-center px-2 py-2 text-center justify-center bg-yellow-400 text-black">
                  <TriangleAlert className="  my-auto me-1 sm:w-7 sm:h-7" />
                  {message}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        {isAutomatic && (
          <div className="space-y-4">
            <div className="flex justify-center mt-6">
              <EstadisticosTest numeros={generatedNumbers} />
            </div>
          </div>
        )}
        {!isAutomatic && (
          <div className="space-y-4">
            <div className="flex justify-center mt-6">
              <EstadisticosTest numeros={manualNumbers} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
