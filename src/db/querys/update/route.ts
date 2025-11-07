import pool from '../../db'

export async function updateUltimaConsulta(propsUpdate: { id: any; score: any; chaveJ: any }): Promise<any> {
  const query = `
  UPDATE crm_malling_banco_brasil
  SET ultima_consulta = NOW(),
  status = "PROCESSADO",
  score = ?,
  chave_j = ?
  WHERE id = ?`

  try {
    const [result]: any = await pool.execute(query, [propsUpdate.score, propsUpdate.chaveJ, propsUpdate.id])

    if (result.affectedRows === 0) {
      console.log(`Nenhuma linha foi afetada para o id: ${propsUpdate.id}`)
    } else {
      console.log(`Atualizado com sucesso o id: ${propsUpdate.id}`)
    }
  } catch (error) {
    console.error('Error updating ultima_consulta and response_json:', error)
    throw error
  }
}

export async function updateStopTodosMineradores(): Promise<any> {
  const query = `
  UPDATE crm_chaves_minerador_banco_do_brasil
  SET data_ultima_mineracao = NOW(), minerando = 0, status = NULL
  `

  try {
    const [result]: any = await pool.execute(query)

    if (result.affectedRows === 0) {
      console.log(`Nenhuma linha foi afetada`)
    } else {
      console.log(`Atualizado com sucesso`)
    }
  } catch (error) {
    console.error('Error updating data_ultima_mineracao and response_json:', error)
    throw error
  }
}


export async function updateFalhaNaAutenticacao(usuario: string): Promise<any> {
  const query = `
  UPDATE crm_chaves_minerador_banco_do_brasil
  SET data_ultima_mineracao = NOW(), minerando = 0, status = "FALHA NA AUTENICAÇÃO CONSULTAR CREDENCIAIS NO PORTAL DO BB" WHERE usuario = "${usuario}"`

  try {
    const [result]: any = await pool.execute(query)

    if (result.affectedRows === 0) {
      console.log(`Nenhuma linha foi afetada`)
    } else {
      console.log(`Atualizado com sucesso`)
    }
  } catch (error) {
    console.error('Error updating data_ultima_mineracao and response_json:', error)
    throw error
  }
}

export async function updateLeadsMinerados5Dias(): Promise<any> {
  const query = `
  UPDATE crm_malling_banco_brasil
  SET ultima_consulta = NULL
  WHERE ultima_consulta < CURDATE() - INTERVAL 5 DAY;`

  try {
    const [result]: any = await pool.execute(query)

    if (result.affectedRows === 0) {
      console.log(`Nenhuma linha foi afetada`)
    } else {
      console.log(`Atualizado com sucesso`)
    }
  } catch (error) {
    console.error('Error updating ultima_consulta and response_json:', error)
    throw error
  }
}

export async function updateAtivarChavesParaMineracao(usuario: string): Promise<any> {
  const query = `
  UPDATE crm_chaves_minerador_banco_do_brasil
  SET minerando = 1, status = NULL 
  where usuario = "${usuario}";`

  try {
    const [result]: any = await pool.execute(query)

    if (result.affectedRows === 0) {
      console.log(`Nenhuma linha foi afetada`)
    } else {
      console.log(`Atualizado com sucesso`)
    }
  } catch (error) {
    console.error('Error updating ultima_consulta and response_json:', error)
    throw error
  }
}