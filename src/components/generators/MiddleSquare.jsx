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
import { useActionState, useState } from "react";
import { getMiddleSquare } from "@/helpers/queries";
import Loader from "../ui/Loader";

const MiddleSquare = ({ quantity, setGeneratedNumbers, setMessage }) => {
  const [middleSquareN, setMiddleSquareN] = useState("");
  const [middleSquareSeed, setMiddleSquareSeed] = useState("");
  const formWithoutAction = async () => {
    const { numeros, mensaje } = await getMiddleSquare(
      middleSquareSeed,
      middleSquareN,
      quantity
    );
    setGeneratedNumbers(numeros);
    setMessage(mensaje);
  };
  const [formStatus, formAction, isPending] = useActionState(
    formWithoutAction,
    null
  );
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const filtered = pasted.replace(/[^0-9]/g, "");
    const { selectionStart, selectionEnd } = e.target;
  
    e.target.setRangeText(filtered, selectionStart, selectionEnd, "end");
  };
  const handleNumberInput = (e, setter, isN = false) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value !== "") {
      value = +value;
    }

    if (!isN && Math.pow(value, 2).toString().length <= middleSquareN) {
      setMiddleSquareN(Math.pow(value, 2).toString().length);
    }
    if (isN && value >= Math.pow(middleSquareSeed, 2).toString().length) {
      value = Math.pow(middleSquareSeed, 2).toString().length;
    }
    if (value === 0) {
      value = 1;
    }

    setter(value);
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

  return (
    <>
      <Card className="border-none p-0 gap-0 shadow-lg">
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
          <form action={formAction} className="grid gap-6">
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="middle-square-seed"
                className="text-sm font-medium"
              >
                Semilla M (Valor Inicial)
              </Label>
              <Input
                 onPaste={handlePaste}
                placeholder="0"
                id="middle-square-seed"
                type="text"
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
              onPaste={handlePaste}
                placeholder="0"
                id="middle-square-N"
                type="text"
                value={middleSquareN}
                onChange={(e) => handleNumberInput(e, setMiddleSquareN, true)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>
            <Button
              disabled={
                !middleSquareN ||
                !middleSquareSeed ||
                quantity === 0 ||
                !quantity ||
                isPending
              }
              className="bg-purple-600 hover:bg-purple-700 w-full lg:w-1/4 md:w-auto md:self-end"
            >
              Generar Números
            </Button>
          </form>
        </CardContent>
      </Card>
      {isPending && <Loader />}
    </>
  );
};

export default MiddleSquare;
