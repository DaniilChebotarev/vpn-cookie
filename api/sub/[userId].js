module.exports = async function handler(req, res) {
  const { userId } = req.query;

  try {
    const [r1, r2] = await Promise.all([
      fetch(`https://johntravolta12.mooo.com/30C70YHxj8/${userId}`),
      fetch(`https://de-johntravolta12.mooo.com/SSwKyNnsvU/${userId}`)
    ]);

    const [t1, t2] = await Promise.all([r1.text(), r2.text()]);

    const decode = (str) => Buffer.from(str.trim(), "base64").toString("utf-8");

    const lines = [];
    if (r1.ok) lines.push(decode(t1));
    if (r2.ok) lines.push(decode(t2));

    const result = Buffer.from(lines.join("\n").trim()).toString("base64");

    res.setHeader("Content-Type", "text/plain");
    res.send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
