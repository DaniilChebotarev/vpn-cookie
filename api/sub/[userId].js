import fetch from "node-fetch";

const SUB_URL_1 = process.env.SUB_URL_1; // эстония
const SUB_URL_2 = process.env.SUB_URL_2; // германия

export default async function handler(req, res) {
  const { userId } = req.query;

  // Получаем конфиги с обоих серверов
  const [r1, r2] = await Promise.all([
    fetch(`${SUB_URL_1}/${userId}`),
    fetch(`${SUB_URL_2}/${userId}`)
  ]);

  const [t1, t2] = await Promise.all([r1.text(), r2.text()]);

  // Декодируем base64 с каждого сервера
  const decode = (str) => Buffer.from(str.trim(), "base64").toString("utf-8");

  const configs = [decode(t1), decode(t2)]
    .join("\n")
    .trim();

  // Кодируем обратно в base64
  const result = Buffer.from(configs).toString("base64");

  res.setHeader("Content-Type", "text/plain");
  res.send(result);
}
