import env from "./env";

const hostPre = {
  API: "http://106.75.79.71/leben/"
};

const hostPrd = {
  API: "http://106.75.75.110/seele/"
};

const hostMap = new Map([
  ["pre", hostPre],
  ["prd", hostPrd]
]);
const host = hostMap.get(env);

export default host;
