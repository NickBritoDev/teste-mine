export default async function postValoresDisponiveis(agencia: number, conta: number, codigoCliente: number, token: string): Promise<any> {
    if (!agencia || !conta || !codigoCliente) return

    try {
        const response = await fetch("https://correspondente.bb.com.br/api/cfe-cbo/api/v1/emprestimo/credito-novo/consultar-sugestoes-linha-credito", {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
                "Authorization": `Bearer ${token}`,
                "cfe-cbo-site-token-v2": "",
                "content-type": "application/json",
                "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "cookie": "52571b42094fdec4937909ca65509fdf=a7056ba2f226a7c2a9336734e05e4a5e; 13a0c05899e90eba5c224ffda3ad5d4e=f250f6102e630cd4f972d9a6f336962c; f071c46d12e967cdddd1ceefdfbc7e53=621dde92f6ad584fcf6574e7b589456f; cf_clearance=WmZLZjBZzvvV216CjdK7DAvbPnPV5XIvDoKkZDJ17og-1759155068-1.2.1.1-.E5eKcVjeo_Srl43EjtKY0ScA9MHKuP5Xa2iMGF9bdoSB_0RwQWnmjVuPo89cVsX08GzS41_GkVMajrRpKUEMVadsaptKZIrghLglZN.WDlvSO.9NpMSfK_ojZ.xpWsK4uF3XzCv7t4mGPcB_mS2_ypMvHRqANZW6cNr453gP92TRE71.hSZvGpfkRhSMnV7hrVegNQziaAQjAC71oYyT0KzERqb7XWFSVN3idl9390; ADRUM=s=1759155696956&r=https%3A%2F%2Fcorrespondente.bb.com.br%2Fcbo-portal-web-ui%2F%3Fhash%3D1535930207; __cf_bm=_OLcUUqVHc96sPHp67hn9IYNgYQYOHJkAby6z1h1bPI-1759156572-1.0.1.1-e5fkNU0AtVSSqXddjWU_SK5D.Ll175fC5l2ShWokwU4BThK_TCo9hwpc3unKXsOWuFhdM185zCxPLPdo5gmSPtQTWm3EUziHdmo7ZVcZfX8; TS01ece72c=01a4d9f83a65ceedb7d7e1c4aa1c17e75e07411a03c72320e7ea181bda8675bfe9498d034de508f2ed2e79b41e10c5b437c4163c9fd6fe36f979dd49214be19cabe86808513e579ba7a74e984ca27f309fe5f0ff77fd303ad74e6ba6ee0c4edbc44be60ebe73f84a3e165381e680fb13723c297337",
                "Referer": "https://correspondente.bb.com.br/cdc-portal-coban/pages/credito"
            },
            body: `{\"codigoCanalOrigem\":99,\"nomeProgramaOrigem\":\"COBAN\",\"codigoDependenciaOrigem\":300,\"codigoCliente\":${Number(codigoCliente)},\"numeroAgenciaCliente\":${Number(agencia)},\"numeroContaCorrenteCliente\":${Number(conta)},\"numeroTitularidadeCliente\":1}`,
            method: "POST"
        });

        // console.log("response post valores disponíveis", response.status);

        if (!response.ok) {
            const errorBody = await response.text()
            return { success: false, error: `Erro ao consultar valores disponíveis: ${response.status} - ${errorBody}` }
        }

        const contentType = response.headers.get('Content-Type')
        if (contentType && contentType.includes('application/json')) {
            return await response.json()
        } else {
            const errorBody = await response.text()
            console.error('Resposta não é JSON:', contentType, errorBody)
            return { success: false, error: `Resposta inesperada: ${errorBody}` }
        }
    } catch (error) {
        console.log('Erro ao consultar valores disponíveis:', error)
        return { success: false, error: 'Falha ao consultar valores disponíveis' }
    }
}