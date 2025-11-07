/* eslint-disable @typescript-eslint/no-explicit-any */
import pool from '../../db'

export async function selectCliente(arquivo: string | null, offset: number): Promise<any> {
  try {
    // 1º tenta buscar com arquivo = 'APP'
    const [rowsApp]: any = await pool.query(
      `SELECT id, cpf, agencia, conta, ultima_consulta
       FROM crm_malling_banco_brasil
       WHERE ultima_consulta IS NULL
       AND cpf IS NOT NULL
       ORDER BY id DESC
       LIMIT 300 OFFSET ?;`,
      [offset]
    )

    if (rowsApp.length > 0) return rowsApp

    // 2º tenta buscar com arquivo = ?
    if (arquivo) {
      const [rowsArquivo]: any = await pool.query(
        `SELECT id, cpf, agencia, conta, ultima_consulta
         FROM crm_malling_banco_brasil
         WHERE ultima_consulta IS NULL
         AND cpf IS NOT NULL
         ORDER BY id DESC
         LIMIT 300 OFFSET ?;`,
        [arquivo, offset]
      )

      if (rowsArquivo.length > 0) return rowsArquivo
    }

    // 3º busca sem filtro de arquivo
    const [rowsFallback]: any = await pool.query(
      `SELECT id, cpf, agencia, conta, ultima_consulta
       FROM crm_malling_banco_brasil
       WHERE ultima_consulta IS NULL
       AND cpf IS NOT NULL
       ORDER BY id DESC
       LIMIT 300 OFFSET ?;`,
      [offset]
    )

    return rowsFallback
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export async function selectChavesSenhas(): Promise<any> {
  try {
    const [usuariosSenhas]: any = await pool.query(`
      SELECT usuario, senha, arquivo
      FROM crm_chaves_minerador_banco_do_brasil
      where minerando = 0
      limit 1;
    `)

    return usuariosSenhas
  } catch (error) {
    console.error(error)
    return { error }
  }
}
