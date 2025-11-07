export default async function postAgenciaConta(codigoPessoaContratoOperacao: number, token: string): Promise<any> {
    if (!codigoPessoaContratoOperacao) return

    try {
        const response = await fetch("https://correspondente.bb.com.br/api/cfe-cbo/api/v1/contas-cliente/listar", {
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
                "cookie": "__cf_bm=5fCS7K.rLfIgeg8.p9PNEUjaPH88.PJvNFaBP2fmPdA-1759322330-1.0.1.1-tsREVH_FagrNYYgW1hns3DaQQ.DKvXeePBnn_2tY.elBZegxGvtOBKGkGPvEwqbz2.JHze5RWgGZTgEJnyuG_gdsPUQFyq_uIM_lyqKORPw; cf_clearance=0QjgmUAIaylL9wQIe_7OZiOgyRaFG_VT.lMY03czyyo-1759322331-1.2.1.1-RwbI94qoAu45qRPj.qr3waxrPovOOlO__Z3Lprb_zsQQdsonNVCEgZSeVrDk4kXmy.qkr8XHlVDn0VWU9Tdt8q2XyaQQtfg8tOT5hmW9f0vEu62joKnOBUjD5S8hVO4dPhRQ1Z58X6RmefEF8oJveHYBB6PdycZQHDAdsOrHLEikhj2j0oue4VzX6RcgFHm9xpy5_Gb2ME48G.zb7vLuTOo7EAjy8z54Gt1erCjYX5A; 52571b42094fdec4937909ca65509fdf=7fd4f8d721d81483f13f62330d72c81c; 13a0c05899e90eba5c224ffda3ad5d4e=6273552a17946f8bdb01d86038051f6f; f071c46d12e967cdddd1ceefdfbc7e53=0c5a169adadd18b090e5710fc7356f56; TS01ece72c=01a4d9f83af1a6d52ba1b1f9f3b99d51c49cea2183ff5800f2ced4d1f78dcc1038e5128d039c78361a8967dbc115c381337b37aae70b1db9f35759108275ef279c9fed973f80c1b156d91a94f82377e1c76ab0a83e9d819e27f2dc881e31ffc12109a2a319",
                "Referer": "https://correspondente.bb.com.br/cdc-portal-coban/pages/credito"
            },
            body: `{\"codigoPessoaContratoOperacao\":${codigoPessoaContratoOperacao}}`,
            method: "POST"
        });
        // console.log("response post agencia conta", response.status);

        if (!response.ok) {
            const errorBody = await response.text()
            return { success: false, error: `Erro ao buscar agência/conta: ${response.status} - ${errorBody}` }
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
        console.log('Erro ao buscar agência/conta:', error)
        return { success: false, error: 'Falha ao buscar agência/conta' }
    }
}