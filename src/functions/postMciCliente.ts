export default async function postMciCliente(cpf: number, token: string, mciCorrespondente: number): Promise<any> {
  if (!cpf) return

  try {
    const response =
      await fetch("https://correspondente.bb.com.br/api/cfe-cbo/api/v3/emprestimo/credito-novo/consultar-mci-cliente", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
          "authorization": `Bearer ${token}`,
          "cfe-cbo-site-token-v2": "",
          "content-type": "application/json",
          "sec-ch-ua": "\"Microsoft Edge\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "_evga_df80={%22uuid%22:%22013493d39e2901d7%22}; _sfid_2f9e={%22anonymousId%22:%22013493d39e2901d7%22%2C%22consents%22:[]}; _gcl_au=1.1.1615043094.1754315946; _tt_enable_cookie=1; _ttp=01K1TP1ZATGWEPGQB81SG58KY9_.tt.2; ttcsid=1754937301932::oQ8vPJvJ0Eqv9VEVa3jn.2.1754937301934; ttcsid_C9ES1K3C77U12DDTH7OG=1754937301930::a2CWttTaxCetuUd2OBhg.2.1754937315586; _ga=GA1.3.404472825.1754315946; _clck=14cb56r%5E2%5Eg0f%5E0%5E2042; _ga_WNT15F74XM=GS2.1.s1761329055$o3$g1$t1761329066$j49$l0$h0; __cf_bm=TAphd7mUFTxWRYf_dwzDsXwZPI7resJiwpugR4Mj1F4-1761852001-1.0.1.1-1.0govQXxEt4qDHz4Gw.ttbJyE.npuhcTenzs8m6rgmgEZc.D.2aFzzVGO0ahEjRJQF8wLLPcgWE8vfJlOE6rdid_9a9270o.49.tQkgPbI; cf_clearance=nEH1cVPiKC8zphflTFfpR_P98Wtdlq5NnpyiIILrl2A-1761852003-1.2.1.1-o87sjJcjsu_8crq2RO0SNRmkyPOR4aLgrV87xNG1tnb71I.Ftif4x68f7E19uJ5UOnC.LScHaBdkY5YZ8NGd3XaoDbI40PO6kRAMMJN6iZNI07uMVsub5GFZEIhldM7KQk7DhgErRyUIXoWg8y0EoF6JblpqyAcard4TqBTaNcDKYcz6PLAmdndaAEeukJbesHB2QW1Wlq8BQW0Ma8lUd3arXOm4rxNYt8vH3JLSm1g; 52571b42094fdec4937909ca65509fdf=73a85a84f50e692f17000cf8df73763f; 13a0c05899e90eba5c224ffda3ad5d4e=8e98e99b6e0bc4ed5b12ceb463076867; f071c46d12e967cdddd1ceefdfbc7e53=7a63a5c0609ef9a1dcff21ef4d18b242; TS01ece72c=01a4d9f83a4ea7968c7026aa54fb89e978e225d5f4eae771bf2f81b86fd7cc1be1f9065844af17cb534f4215308aa654e75f764bdef688eee3a3c6ee230d81721187ea7bb24ade3c812e46c7dbed3364a998343a2e3c9e57e7785d817d87b98528571c78c3d4dfcb718ee5033932f21fdbb9f1adc5",
          "Referer": "https://correspondente.bb.com.br/cdc-portal-coban/pages/credito"
        },
        "body": `{\"cpf\":${cpf},\"prefixoAgencia\":0,\"numeroConta\":0,\"indicadorTipoCredito\":1,\"mciCorrespondente\":${mciCorrespondente},\"prefixoAgenciaMovimento\":300}`,
        "method": "POST"
      });

    return await response.json()
  } catch (error) {
    console.log('Erro ao consultar MCI cliente:', error)
    return { success: false, error: 'Falha ao consultar MCI cliente' }
  }
}