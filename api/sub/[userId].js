module.exports = async function handler(req, res) {
  const { userId } = req.query;

  const SUB_URL_1 = process.env.PANEL_BASE_URL;
  const SUB_URL_2 = process.env.PANEL_BASE_URL_2;

  try {
    const [r1, r2] = await Promise.all([
      fetch(`${SUB_URL_1}/${userId}`),
      fetch(`${SUB_URL_2}/${userId}`)
    ]);

    const [t1, t2] = await Promise.all([r1.text(), r2.text()]);

    const decode = (str) => Buffer.from(str.trim(), "base64").toString("utf-8");

    const configs = [decode(t1), decode(t2)].join("\n").trim();

    const result = Buffer.from(configs).toString("base64");

    res.setHeader("Content-Type", "text/plain");
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
