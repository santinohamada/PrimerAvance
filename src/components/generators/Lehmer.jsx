import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Cpu } from "lucide-react";
import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { getLehmer } from "@/helpers/queries";
import Loader from "../ui/Loader";

const Lehmer = ({ quantity, setGeneratedNumbers, setMessage }) => {
  const [lehmerSeed, setLehmerSeed] = useState("");
  const [lehmerT, setLehmerT] = useState("");
  const formWithoutAction = async () => {
    const { numeros, mensaje } = await getLehmer(
      lehmerSeed,
      lehmerT,
      lehmerT.toString().length,
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
  const handleNumberInput = (e, setter, isT = false) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value !== "") {
      value = +value;
    }
    if (value === 0) {
      value = 1;
    }
    if (isT && lehmerSeed.toString().length !== 0) {
      const seedDigits = lehmerSeed.toString().length;
      const tDigits = value.toString().length;

      if (tDigits >= seedDigits) {
        return; // No permitir que t tenga igual o más dígitos que la semilla
      }
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
            <Cpu className="h-5 w-5" />
            Método de Lehmer
          </CardTitle>
          <CardDescription className="text-white/80">
            Genera números pseudoaleatorios usando la fórmula X(n+1) = (a *
            X(n)) mod m.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
          <form action={formAction} className="grid gap-6 ">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="lehmer-seed" className="text-sm font-medium">
                Semilla (numero entero de n digitos)
              </Label>
              <Input
                id="lehmer-seed"
                onPaste={handlePaste}
                value={lehmerSeed}
                onChange={(e) => handleNumberInput(e, setLehmerSeed)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500 "
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="lehmer-t" className="text-sm font-medium">
                t (numero entero de K digitos)
              </Label>
              <Input
                id="lehmer-t"
                onPaste={handlePaste}
                value={lehmerT}
                onChange={(e) => handleNumberInput(e, setLehmerT, true)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>

            <Button
              disabled={
                !lehmerSeed ||
                !lehmerT ||
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

export default Lehmer;
