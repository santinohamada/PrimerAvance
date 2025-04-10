"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { EstadisticosTest } from "../EstadisticosTest"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"



export const ResultadosPage = ({ numeros, metodo, semilla, digitosTomados }) => {
  const [numerosNormalizados, setNumerosNormalizados] = useState([])

  useEffect(() => {
    // Normalizar los números al rango [0,1) si es necesario
    if (numeros && numeros.length > 0) {
      // Verificar si los números ya están en el rango [0,1)
      const yaEstanNormalizados = numeros.every((num) => num >= 0 && num < 1)

      if (yaEstanNormalizados) {
        setNumerosNormalizados(numeros)
      } else {
        // Normalizar dividiendo por el máximo valor posible según los dígitos
        const maxValor = Math.pow(10, digitosTomados || 4)
        const normalizados = numeros.map((num) => num / maxValor)
        setNumerosNormalizados(normalizados)
      }
    }
  }, [numeros, digitosTomados])

  if (!numeros || numeros.length === 0) {
    return <div>No hay números para mostrar resultados.</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Resultados - {metodo}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Parámetros utilizados</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {semilla !== undefined && (
                <>
                  <div className="font-medium">Semilla (M):</div>
                  <div>{semilla}</div>
                </>
              )}
              {digitosTomados !== undefined && (
                <>
                  <div className="font-medium">Dígitos tomados (N):</div>
                  <div>{digitosTomados}</div>
                </>
              )}
              <div className="font-medium">Cantidad de números:</div>
              <div>{numeros.length}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Secuencia generada</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>i</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Ri (Normalizado)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {numeros.map((num, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{num}</TableCell>
                      <TableCell>{numerosNormalizados[index]?.toFixed(6)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <EstadisticosTest numeros={numerosNormalizados} semilla={semilla || 0} digitosTomados={digitosTomados || 0} />
    </div>
  )
}
