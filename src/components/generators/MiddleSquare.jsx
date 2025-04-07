import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SquareDot } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { getMiddleSquare } from "@/helpers/queries";

const MiddleSquare = ({ quantity,setGeneratedNumbers,setMessage }) => {
  const [middleSquareN, setMiddleSquareN] = useState("");
  const [middleSquareSeed, setMiddleSquareSeed] = useState("");

  const handleNumberInput = (e, setter) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
   if(value!==""){
    value = +value
   }
   if(value===0){
    value = 1
   }
    setter(value);
  };

  const preventDotComma = (e) => {
    if (e.key === "." || e.key === "," || e.key === "-" || e.key === "+")
      e.preventDefault();
  };


  return (
    <Card className="border-none p-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r py-3 from-purple-600/90 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <SquareDot className="h-5 w-5" />
          Método de la Parte Central del Cuadrado
        </CardTitle>
        <CardDescription className="text-white/80">
          Genera números pseudoaleatorios tomando los dígitos centrales del
          cuadrado del número anterior.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
        <div className="grid gap-6">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="middle-square-seed" className="text-sm font-medium">
              Semilla M (Valor Inicial)
            </Label>
            <Input
              placeholder="0"
              id="middle-square-seed"
              type="number"
              value={middleSquareSeed}
              onChange={(e) => handleNumberInput(e, setMiddleSquareSeed)}
              onKeyDown={preventDotComma}
              className="border-slate-300 focus-visible:ring-purple-500"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="middle-square-N" className="text-sm font-medium">
              Número de dígitos a tomar (N)
            </Label>
            <Input
              placeholder="0"
              id="middle-square-N"
              type="number"
              value={middleSquareN}
              onChange={(e) => handleNumberInput(e, setMiddleSquareN)}
              onKeyDown={preventDotComma}
              className="border-slate-300 focus-visible:ring-purple-500"
            />
          </div>
          <Button
            disabled={
              !middleSquareN || !middleSquareSeed || quantity === 0 || !quantity
            }
            onClick={async () => {
              const {numeros,mensaje} = await getMiddleSquare(
                middleSquareSeed,
                middleSquareN,
                quantity
              );
              setGeneratedNumbers(numeros);
              setMessage(mensaje)
            }}
            className="bg-purple-600 hover:bg-purple-700 w-full lg:w-1/6 md:w-auto md:self-end"
          >
            Generar Números
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiddleSquare;
