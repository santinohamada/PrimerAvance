import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { Sigma } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useActionState, useState } from "react";
import { postAdditiveCongruential } from "@/helpers/queries";
import Loader from "../ui/Loader";

const AdditiveCongruential = ({
  quantity,
  setGeneratedNumbers,
  setMessage,
}) => {
  const [seeds, setSeeds] = useState(["", "", ""]);
  const [modulo, setModulo] = useState("");
  const formWithoutAction = async () => {
    const { numeros, mensaje } = await postAdditiveCongruential(
      modulo,
      quantity,
      seeds
    );
    setGeneratedNumbers(numeros);
    setMessage(mensaje);
  };
  const [formStatus, formAction, isPending] = useActionState(
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
  const handleSeedChange = (index, value) => {
    const newSeeds = [...seeds];
    newSeeds[index] = value.replace(/[.,]/g, "");
    if (newSeeds[index] !== "") {
      newSeeds[index] = +newSeeds[index];
    }
    setSeeds(newSeeds);
  };

  const addSeedField = () => {
    setSeeds([...seeds, ""]);
  };

  const removeSeedField = (index) => {
    if (seeds.length > 2) {
      const newSeeds = [...seeds];
      newSeeds.splice(index, 1);
      setSeeds(newSeeds);
    }
  };

  return (
    <>
      <Card className="border-none p-0 gap-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r py-3 from-purple-600/90 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Sigma className="h-5 w-5" />
            Método Aditivo Generalizado
          </CardTitle>
          <CardDescription className="text-white/80">
            Genera números pseudoaleatorios con X(i+1) = (X(i−k) + X(i)) mod m
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 bg-white dark:bg-slate-800 rounded-b-lg">
          <form
            action={formAction}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-2"
          >
            <div className="flex flex-col space-y-2">
              <Label className="text-sm font-medium">Semillas (mínimo 2)</Label>
              {seeds.map((seed, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex">
                    <Label>
                      <p>
                        n<sub>{index <= 0 ? "0" : "-" + index}</sub>
                      </p>
                    </Label>
                  </div>
                  <Input
                    type="number"
                    value={seed}
                    min="0"
                    onChange={(e) => handleSeedChange(index, e.target.value)}
                    onKeyDown={preventDotComma}
                    className="border-slate-300 focus-visible:ring-purple-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeSeedField(index)}
                    disabled={seeds.length <= 2}
                  >
                    ✖
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addSeedField}
                className="w-fit mt-2"
              >
                + Agregar Semilla
              </Button>
            </div>

            <div className="flex flex-col space-y-2">
              <Label>Módulo (m)</Label>
              <Input
                type="number"
                value={modulo}
                onChange={(e) => handleNumberInput(e, setModulo)}
                onKeyDown={preventDotComma}
                className="border-slate-300 focus-visible:ring-purple-500"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              <Button
                disabled={
                  seeds.some((s) => s === "") ||
                  !modulo ||
                  !quantity ||
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

export default AdditiveCongruential;
