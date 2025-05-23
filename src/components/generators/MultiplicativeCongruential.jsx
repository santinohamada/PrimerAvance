import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { getMultiplicativeCongruential } from "@/helpers/queries";
import Loader from "../ui/Loader";

const MultiplicativeCongruential = ({
  quantity,
  setGeneratedNumbers,
  setMessage,
}) => {
  const [multiplicativeN, setMultiplicativeN] = useState("");
  const [multiplicativeA, setMultiplicativeA] = useState("");

  const [multiplicativeM, setMultiplicativeM] = useState("");
  const formWhitoutAction = async () => {
    const { numeros, mensaje } = await getMultiplicativeCongruential(
      multiplicativeN,
      multiplicativeA,
      multiplicativeM,
      quantity
    );
    setGeneratedNumbers(numeros);
    setMessage(mensaje);
  };
  const [formState, formAction, isPending] = useActionState(
    formWhitoutAction,
    null
  );
  const handleNumberInput = (e, setter) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value !== "") {
      value = +value;
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
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text");
    const filtered = pasted.replace(/[^0-9]/g, "");
    const { selectionStart, selectionEnd } = e.target;
  
    e.target.setRangeText(filtered, selectionStart, selectionEnd, "end");
  };
  return (
    <>
      <Card className="border-none p-0 gap-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r py-3 from-purple-600/90 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <X className="h-5 w-5" />
            Método Congruencial Multiplicativo
          </CardTitle>
          <CardDescription className="text-white/80">
            Genera números pseudoaleatorios usando la fórmula X(n+1) = (a *
            X(n)) mod m.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
          <form
            action={formAction}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="multiplicative-seed"
                className="text-sm font-medium"
              >
                Semilla
              </Label>
              <Input
                id="multiplicative-seed"
                onPaste={handlePaste}
                value={multiplicativeN}
                onChange={(e) => handleNumberInput(e, setMultiplicativeN)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />

              <Label htmlFor="multiplicative-a" className="text-sm font-medium">
                Constante Multiplicativa (a&gt;0)
              </Label>
              <Input
                id="multiplicative-a"
                onPaste={handlePaste}
                value={multiplicativeA}
                onChange={(e) => handleNumberInput(e, setMultiplicativeA)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="multiplicative-m" className="text-sm font-medium">
                Módulo (m&gt;0)
              </Label>
              <Input
                id="multiplicative-m"
                onPaste={handlePaste}
                value={multiplicativeM}
                onChange={(e) => handleNumberInput(e, setMultiplicativeM)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <Button
                disabled={
                  !multiplicativeA ||
                  quantity === 0 ||
                  !quantity ||
                  !multiplicativeM ||
                  !multiplicativeN ||
                  isPending
                }
                className="bg-purple-600 hover:bg-purple-700 w-full lg:w-1/4 md:w-auto md:self-end"
              >
                Generar Números
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      {isPending && <Loader />}
    </>
  );
};

export default MultiplicativeCongruential;
