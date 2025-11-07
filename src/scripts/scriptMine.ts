import fs from "fs";
import path from "path";
import { selectChavesSenhas } from "../db/querys/select/route";
import { updateAtivarChavesParaMineracao, updateStopTodosMineradores } from "../db/querys/update/route";
import { printLogsTable } from "../helpers/logs";
import { flow } from "../job/cronMine";

// 🧩 Interface para tipar os dados
interface Credenciais {
  usuario: string;
  senha: string;
  arquivo: string;
}

const TEMP_FILE_PATH = path.resolve(__dirname, "../../tempCredenciais.json");
const TEMPO_EXPIRACAO_MS = 60 * 60 * 1000; // 1 hora

async function obterCredenciais(): Promise<Credenciais[]> {
  try {
    if (fs.existsSync(TEMP_FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(TEMP_FILE_PATH, "utf-8"));
      const criadoEm = new Date(data.criadoEm);
      const agora = new Date();

      // Se ainda não passou 1 hora, usa o cache
      if (agora.getTime() - criadoEm.getTime() < TEMPO_EXPIRACAO_MS) {
        console.log("✅ Usando credenciais em cache (menos de 1h).");
        return data.usuariosESenhas as Credenciais[];
      }
    }
  } catch (err) {
    console.warn("⚠️ Erro ao ler cache de credenciais:", err);
  }

  // Caso não tenha cache válido → buscar no banco
  console.log("🔄 Cache expirado ou inexistente. Buscando no banco...");
  const usuariosESenhas = (await selectChavesSenhas()) as Credenciais[];

  // Salvar o novo cache
  const dataParaSalvar = {
    criadoEm: new Date(),
    usuariosESenhas,
  };

  fs.writeFileSync(TEMP_FILE_PATH, JSON.stringify(dataParaSalvar, null, 2));
  return usuariosESenhas;
}

export async function scriptMine() {
  async function executarTarefa() {
    const usuariosESenhas = await obterCredenciais();

    await updateAtivarChavesParaMineracao(usuariosESenhas[0].usuario);

    const agora = new Date();
    const horaAtual = agora.getHours();
    console.log(`Iniciando verificação às ${agora.toLocaleTimeString()}`);

    if (horaAtual >= 20) {
      await updateStopTodosMineradores();
      console.log("Encerrando execuções, passou das 20h.");
      return;
    }

    // 🔧 Agora o TypeScript entende os tipos corretamente
    const execucoes = usuariosESenhas.map(async ({ usuario, senha, arquivo }: Credenciais) => {
      try {
        console.log(`Executando tarefa para ${usuario} às ${new Date().toLocaleTimeString()}`);
        await flow(usuario, senha, arquivo);
      } catch (err) {
        console.error(`Erro ao executar flow para ${usuario}:`, err);
      }
    });

    await Promise.allSettled(execucoes);

    const intervaloMin = 1 * 60 * 1000;
    const intervaloMax = 5 * 60 * 1000;
    const proximoIntervalo = Math.floor(Math.random() * (intervaloMax - intervaloMin + 1)) + intervaloMin;

    printLogsTable();
    console.log(`Próxima execução em ${(proximoIntervalo / 1000 / 60).toFixed(2)} minutos`);

    setTimeout(executarTarefa, proximoIntervalo);
  }

  executarTarefa();
}
