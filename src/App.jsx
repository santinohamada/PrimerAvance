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
  LineChartIcon,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import MiddleSquare from "./components/generators/MiddleSquare";
import Lehmer from "./components/generators/Lehmer";
import MixedCongruential from "./components/generators/MixedCongruential";
import MultiplicativeCongruential from "./components/generators/MultiplicativeCongruential";
import AdditiveCongruential from "./components/generators/AdditiveCongruential";

export default function RandomNumberGenerators() {
  const [message, setMessage] = useState("");
  const [disabledEnter, setDisabledEnter] = useState(true);
  const [valor, setValor] = useState("");
  const [enteros, setEnteros] = useState("");
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
    setDisabledEnter(false);
    let input = e.target.value;

    // Solo permite números, puntos y saltos de línea
    input = input.replace(/[^0-9.\n]/g, "");

    // Separa por líneas
    const lineas = input.split("\n");

    const nuevasLineas = [];

    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i].trim();

      // Saltar líneas vacías seguidas
      if (linea === "" && nuevasLineas[nuevasLineas.length - 1] === "") {
        continue;
      }

      // Evitar múltiples puntos por línea
      const puntos = (linea.match(/\./g) || []).length;
      if (puntos > 1) continue;

      // No permitir líneas que terminan en punto
      if (linea.endsWith(".")) {
        setDisabledEnter(true);
        nuevasLineas.push(linea); // mantenerla, pero no permitir salto luego
        break; // no agregar más líneas después
      }

      nuevasLineas.push(linea);
    }

    setValor(nuevasLineas.join("\n"));
  };

  const manejarKeyDown = (e) => {
    const { key } = e;

    if (key === "Enter") {
      const cursor = e.target.selectionStart;
      const hastaCursor = valor.slice(0, cursor);
      const lineas = hastaCursor.split("\n");
      const lineaActual = lineas[lineas.length - 1];

      // Si la línea actual termina en punto, bloquear Enter
      if (lineaActual.trim().endsWith(".")) {
        e.preventDefault();
      }

      // Si línea actual está vacía, también bloquear salto
      if (lineaActual.trim() === "") {
        e.preventDefault();
      }

      // Evita dos líneas vacías seguidas
      const despuesCursor = valor.slice(cursor);
      if (despuesCursor.startsWith("\n")) {
        e.preventDefault();
      }
    }

    // Evitar doble punto (..)
    if (key === ".") {
      const cursor = e.target.selectionStart;
      const hastaCursor = valor.slice(0, cursor);
      const lineas = hastaCursor.split("\n");
      const lineaActual = lineas[lineas.length - 1];

      if (lineaActual.endsWith(".")) {
        e.preventDefault();
      }

      // Solo un punto por número
      const puntos = (lineaActual.match(/\./g) || []).length;
      if (puntos >= 1) {
        e.preventDefault();
      }
    }
  };

  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [testResults, setTestResults] = useState(null);
  const [isAutomatic, setIsAutomatic] = useState(true);
  const [quantity, setQuantity] = useState(10);
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
          <Card className="mb-8 p-0 border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r py-3 from-purple-600 to-cyan-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <SquareDot className="h-5 w-5" />
                Ingreso Manual de Números
              </CardTitle>
              <CardDescription className="text-white/80">
                Ingrese los números separados por comas (ej: 0.1, 0.5, 0.3)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="manual-input" className="text-sm font-medium">
                    Números
                  </Label>
                  <div className="flex space-x-2">
                    <Textarea
                      value={valor}
                      onChange={manejarCambio}
                      onKeyDown={manejarKeyDown}
                      placeholder="Ej:\n3.14\n2.71\n1.618"
                      rows={6}
                      cols={30}
                      style={{ resize: "none" }}
                    />
                    <Button
                      disabled={disabledEnter || valor === ""}
                      onClick={() => {}}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Procesar
                    </Button>
                  </div>
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

        {generatedNumbers.length > 0 && (
          <div className="grid grid-cols-1 mb-8">
            <Card className="border-none shadow-lg py-0 gap-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r py-3 from-cyan-500 to-cyan-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Números Generados
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[350px]">
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

        {testResults && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Pruebas Estadísticas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-cyan-500/90 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5" />
                    Prueba de los Promedios
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Media:</span>
                      <span className="font-mono">
                        {testResults.meanTest.mean.toFixed(6)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Valor Esperado:</span>
                      <span className="font-mono">
                        {testResults.meanTest.expected}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Resultado:</span>
                      {testResults.meanTest.passed ? (
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Pasó</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 font-bold">
                          <XCircle className="h-5 w-5" />
                          <span>No Pasó</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-cyan-500/90 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="h-5 w-5" />
                    Prueba de Frecuencia
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Chi-Cuadrado:</span>
                      <span className="font-mono">
                        {testResults.frequencyTest.chiSquare.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Valor Crítico:</span>
                      <span className="font-mono">16.92</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Resultado:</span>
                      {testResults.frequencyTest.passed ? (
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Pasó</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 font-bold">
                          <XCircle className="h-5 w-5" />
                          <span>No Pasó</span>
                        </div>
                      )}
                    </div>
                    <div className="h-[120px] mt-4">
                      <BarChart
                        data={testResults.frequencyTest.frequencies.map(
                          (freq, i) => ({
                            x: `${i / 10}-${(i + 1) / 10}`,
                            y: freq,
                          })
                        )}
                        xLabel="Intervalo"
                        yLabel="Frecuencia"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-cyan-500/90 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Sigma className="h-5 w-5" />
                    Prueba de Kolmogorov-Smirnov
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Diferencia Máxima:</span>
                      <span className="font-mono">
                        {testResults.ksTest.maxDiff.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Valor Crítico:</span>
                      <span className="font-mono">
                        {testResults.ksTest.criticalValue.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Resultado:</span>
                      {testResults.ksTest.passed ? (
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Pasó</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 font-bold">
                          <XCircle className="h-5 w-5" />
                          <span>No Pasó</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-cyan-500/90 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="h-5 w-5" />
                    Prueba de Corrida
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Corridas:</span>
                      <span className="font-mono">
                        {testResults.runsTest.runs}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Corridas Esperadas:</span>
                      <span className="font-mono">
                        {testResults.runsTest.expectedRuns.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <span className="font-medium">Estadístico Z:</span>
                      <span className="font-mono">
                        {testResults.runsTest.z.toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Resultado:</span>
                      {testResults.runsTest.passed ? (
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Pasó</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 font-bold">
                          <XCircle className="h-5 w-5" />
                          <span>No Pasó</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-2">
                <CardHeader className="bg-gradient-to-r from-cyan-500/90 to-cyan-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <LineChartIcon className="h-5 w-5" />
                    Prueba de la Serie
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
                  <div className="space-y-4">
                    <p className="font-medium">Pares (primeros 10):</p>
                    <ScrollArea className="h-[180px]">
                      <Table>
                        <TableHeader className="bg-slate-100 dark:bg-slate-700 sticky top-0">
                          <TableRow>
                            <TableHead className="text-center">i</TableHead>
                            <TableHead className="text-center">Ri</TableHead>
                            <TableHead className="text-center">Ri+1</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {testResults.seriesTest.pairs.map((pair, index) => (
                            <TableRow
                              key={index}
                              className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                            >
                              <TableCell className="text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="text-center font-mono">
                                {pair[0].toFixed(4)}
                              </TableCell>
                              <TableCell className="text-center font-mono">
                                {pair[1].toFixed(4)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
