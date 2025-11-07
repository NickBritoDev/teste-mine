export default async function postAutenticacao(usuario: string, senha: string): Promise<any> {
  if (!usuario || !senha) return;
  // console.log('credenciais em uso', usuario, ' ', senha);

  try {
    const response = await fetch("https://correspondente.bb.com.br/api/cfe-acesso/api/v2/token/WEB_CORRESPONDENTE_BANCARIO_CHAVEJ/login", {
      headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
        "content-type": "application/json",
        "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "52571b42094fdec4937909ca65509fdf=a7056ba2f226a7c2a9336734e05e4a5e; 13a0c05899e90eba5c224ffda3ad5d4e=f250f6102e630cd4f972d9a6f336962c; f071c46d12e967cdddd1ceefdfbc7e53=621dde92f6ad584fcf6574e7b589456f; cf_clearance=TXCO3Hs7dE05_aoTcvmUbpOsMCgufldxXvHDwwoemdU-1759153291-1.2.1.1-8yDxPKu_gwGoH9IocYCl.nGd9cX3EBVU5WV44Q974mpOELBr0kxsNQyBpNzM_ev2tZC8G7HxqqnNrydpSM8D7.r84eg6BSakHbmcBconhqN3z0Oy4cCkDozQOegco_oVzCw8UK5O7Hvkg8uzmw1Dj7E.zhvDKr5AZ9NYIbWcdQihqLmzPsUbk9tvHHrky4.WQG69eY6PovTP1IcwXdhSHdgogBgXin6mpt54PNVwcBA; __cf_bm=_9kZaPlSlXx3uxwh0qyA1N2YLnvc7R9MODWOvnaFVBE-1759153292-1.0.1.1-FS14vCTruY5Cxubvi93EGps.1_XsvamEDOJCPc78wf0v7Jd9QJRaUj5pAHbjrUT5evwGjlsATtcY2yg5l8_O26r4YX.C3ezLkP6RAKQuxiQ; TS01ece72c=01a4d9f83a0798000b8d3ff2913f3ed242cac5b93916b54435a8d85dab96b09ce83a9f5e2c403b933fd4f2b266c9e4d2ad1144deb81e4f04e1d8aefe0f399b9c650c1170d7705a5c36aa169a4accc1392a7e81efb15907bc0fac7d3abe4a63d4e3ea29faf7a8e2440151315a65d0dcad593284bffd; ADRUM=s=1759153599291&r=https%3A%2F%2Fcorrespondente.bb.com.br%2Fcbo-portal-web-ui%2F%3Fhash%3D-490144330",
        "Referer": "https://correspondente.bb.com.br/cbo-portal-acesso/"
      },
      body: `{\"identificacaoUsuario\":\"${usuario}\",\"senhaUsuario\":\"${senha}\"}`,
      method: "POST"
    }
    );
    // console.log("response post auth", response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      return { success: false, error: `Erro ao autenticar: ${response.status} - ${errorBody}` };
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const errorBody = await response.text();
      console.error('Resposta não é JSON:', contentType, errorBody);
      return { success: false, error: `Resposta inesperada: ${errorBody}` };
    }
  } catch (error) {
    console.log('Erro ao fazer autenticação:', error);
    return { success: false, error: 'Falha na autenticação' };
  }
}