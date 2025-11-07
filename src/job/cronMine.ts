import { selectCliente } from "../db/querys/select/route"
import { insertConvenioEmpregador, insertDadosMinerados } from "../db/querys/insert/route"
import { updateFalhaNaAutenticacao, updateUltimaConsulta } from "../db/querys/update/route"
import { getRandomNumber } from "../helpers/random"
import { delay } from "../helpers/delay"
import { addLog } from "../helpers/logs"
import postAutenticacao from "../functions/postAutenticacao"
import postMciCliente from "../functions/postMciCliente"
import postAgenciaConta from "../functions/postAgenciaConta"
import postValoresDisponiveis from "../functions/postValoresDisponiveis"

export async function flow(username: string, password: string, arquivo: string) {
  const offset = await getRandomNumber(2, 150)
  const cliente = await selectCliente(arquivo, 1)
  const token = await postAutenticacao(username, password)
  const cpf = cliente[offset]?.cpf

  addLog(username, "Iniciando cron", true)
  addLog(username, "Cliente selecionado", cliente[offset]?.id)
  addLog(username, "Código de autenticação", token?.response?.dadosCliente?.mciCorrespondente)

  if (!token?.response?.token?.access_token) {
    await updateFalhaNaAutenticacao(username)
    addLog(username, "Falha na autenticação", '❌')
    return
  }

  const mciCliente = await postMciCliente(cpf, token.response.token.access_token, token?.response?.dadosCliente?.mciCorrespondente)
  const validadeDoCliente = mciCliente?.response?.indicadorPermitidoContratarCredito

  await delay(5000)

  if (mciCliente?.success === false) {
    addLog(username, "Cliente inválido", '❌')
    await updateUltimaConsulta({ id: cliente[offset].id, score: "CLIENTE INVALIDO", chaveJ: username })
    return
  } else {
    addLog(username, "MCI Cliente", mciCliente?.response?.mciCliente)
  }

  const agenciaConta = await postAgenciaConta(mciCliente?.response?.mciCliente, token.response.token.access_token)
  const agencia = agenciaConta?.response?.listaOcorrencia[0]?.codigoPrefixoDependenciaConducao
  const conta = agenciaConta?.response.listaOcorrencia[0]?.numeroContratoOperacao

  await delay(10000)

  addLog(username, "Agência", agencia)
  addLog(username, "Conta", conta)

  if (!agencia || !conta) {
    addLog(username, "Agência/Conta não encontrada", '❌')
    await updateUltimaConsulta({ id: cliente[offset].id, score: "AGENCIA E CONTA NAO ENCONTRADA", chaveJ: username })
    return
  }

  const valoresDisponiveis = await postValoresDisponiveis(agencia, conta, mciCliente?.response?.mciCliente, token.response.token.access_token)

  addLog(username, "Valores disponíveis", valoresDisponiveis?.response?.linhaCreditoSugestao?.length > 0 ? "✅" : "❌")

  await updateUltimaConsulta({ id: cliente[offset].id, score: valoresDisponiveis?.response?.linhaCreditoSugestao?.length > 0 ? "PROSPECTAR" : "SEM LIMITES", chaveJ: username })

  addLog(username, "Score", valoresDisponiveis?.response?.linhaCreditoSugestao?.length > 0 ? "PROSPECTAR" : "SEM LIMITES")

  for (const linhaCreditoSugestao of valoresDisponiveis?.response?.linhaCreditoSugestao || []) {
    for (const item of linhaCreditoSugestao.itens) {
      await insertConvenioEmpregador(cliente[offset].id, item)
      await insertDadosMinerados(cliente[offset].id, linhaCreditoSugestao.codigo, item, validadeDoCliente)
    }
  }
}
