import { HttpsProxyAgent } from 'https-proxy-agent';

const PROXY_CONFIG = {
    host: '191.96.73.176',
    port: '50100',
    username: 'marcinhofilho94',
    password: '3ZoxvHpY6m'
};

export function getProxyAgent() {
    const proxyUrl = `http://${PROXY_CONFIG.username}:${PROXY_CONFIG.password}@${PROXY_CONFIG.host}:${PROXY_CONFIG.port}`;
    return new HttpsProxyAgent(proxyUrl);
}