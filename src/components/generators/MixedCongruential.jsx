import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Dices } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { getMixedCongruential } from "@/helpers/queries";
import Loader from "../ui/Loader";

const MixedCongruential = ({ quantity, setGeneratedNumbers, setMessage }) => {
  const [mixedN, setMixedN] = useState("");
  const [mixedA, setMixedA] = useState("");
  const [mixedC, setMixedC] = useState("");
  const [mixedM, setMixedM] = useState("");
  const formWithoutAction = async () => {
    const { numeros, mensaje } = await getMixedCongruential(
      mixedN,
      mixedA,
      mixedC,
      mixedM,
      quantity
    );
    setGeneratedNumbers(numeros);
    setMessage(mensaje);
  };
  const [formState, formAction, isPending] = useActionState(
    formWithoutAction,
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

  return (
    <>
      <Card className="border-none p-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r py-3 from-purple-600/90 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Dices className="h-5 w-5" />
            Método Congruencial Mixto
          </CardTitle>
          <CardDescription className="text-white/80">
            Genera números pseudoaleatorios usando la fórmula X(n+1) = (a * X(n)
            + c) mod m.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
          <form
            action={formAction}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            <div className="flex flex-col space-y-2">
              <Label htmlFor="mixed-seed" className="text-sm font-medium">
                Semilla
              </Label>
              <Input
                id="mixed-seed"
                type="number"
                value={mixedN}
                onChange={(e) => handleNumberInput(e, setMixedN)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />

              <Label htmlFor="mixed-a" className="text-sm font-medium">
                Constante Multiplicativa (a&gt;0)
              </Label>
              <Input
                id="mixed-a"
                type="number"
                value={mixedA}
                onChange={(e) => handleNumberInput(e, setMixedA)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="mixed-c" className="text-sm font-medium">
                Constante Aditiva (c&gt;0)
              </Label>
              <Input
                id="mixed-c"
                type="number"
                value={mixedC}
                onChange={(e) => handleNumberInput(e, setMixedC)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />

              <Label htmlFor="mixed-m" className="text-sm font-medium">
                Módulo (m&gt;0)
              </Label>
              <Input
                id="mixed-m"
                type="number"
                value={mixedM}
                onChange={(e) => handleNumberInput(e, setMixedM)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-4">
              <Button
                disabled={
                  !mixedA ||
                  !mixedC ||
                  quantity === 0 ||
                  !quantity ||
                  !mixedM ||
                  !mixedN ||
                  isPending
                }
                className="bg-purple-600 hover:bg-purple-700 w-full lg:w-1/6 md:w-auto md:self-end"
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

export default MixedCongruential;
