import Table from "cli-table3";
import chalk from "chalk";

type LogEntry = { step: string; detail?: any; timestamp: string };
let logsPorUsuario: Record<string, LogEntry[]> = {};

export function addLog(usuario: string, step: string, detail?: any) {
  const timestamp = new Date().toLocaleTimeString();
  if (!logsPorUsuario[usuario]) {
    logsPorUsuario[usuario] = [];
  }
  logsPorUsuario[usuario].push({ step, detail, timestamp });
}

export function printLogsTable() {
  for (const usuario of Object.keys(logsPorUsuario)) {
    console.log(chalk.bgBlue("\n"));
    console.log(`📊 ${chalk.bold("LOGS DO USUÁRIO:")} ${chalk.yellow(usuario)}`);

    const table = new Table({
      head: [
        chalk.black.bgGreen(" STEP "),
        chalk.black.bgBlue(" DETAIL "),
        chalk.black.bgMagenta(" TIMESTAMP "),
      ],
      style: { head: [], border: [] },
      wordWrap: true,
      colWidths: [35, 20, 20],
    });


    logsPorUsuario[usuario].forEach((log) => {
      table.push([
        chalk.white(log.step),
        log.detail === true
          ? chalk.green("✅ " + log.detail)
          : log.detail === false || log.detail === "❌"
            ? chalk.red("❌ " + log.detail)
            : chalk.yellow(String(log.detail ?? "")),
        chalk.gray(log.timestamp),
      ]);
    });

    console.log(table.toString());
    console.log(chalk.bgBlue("\n"));
  }
}
