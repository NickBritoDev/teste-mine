import fs from "fs"
import path from "path"

export function salvarJsonLocal(cpf: string | undefined, data: any) {
  if (!cpf) {
    console.error("CPF indefinido, não foi possível salvar o arquivo.")
    return
  }

  const pasta = path.join(__dirname, "../dados")
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true })
  }

  const filePath = path.join(pasta, `${cpf}.json`)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")
  console.log(`Arquivo salvo: ${filePath}`)
}

// modo de uso
// salvarJsonLocal(cpf, { // cliente: cliente[offset], // agencia, // conta, // valoresDisponiveis // })