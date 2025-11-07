import cron from "node-cron";
import { updateLeadsMinerados5Dias } from "./db/querys/update/route";
import { scriptMine } from "./scripts/scriptMine";

cron.schedule("0 7 * * *", async () => {
  try {
    console.log(`Iniciando mineração ${new Date().toLocaleString()}`);
    await updateLeadsMinerados5Dias();
    await scriptMine();
  } catch (err) {
    console.error("Erro ao atualizar leads minerados:", err);
  }
});

scriptMine()
  .then(() => console.log("Cron iniciado com sucesso."))
  .catch((error) => console.error("Erro ao iniciar o cron:", error));