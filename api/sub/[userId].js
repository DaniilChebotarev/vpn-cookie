module.exports = async function handler(req, res) {
  const { userId } = req.query;

  const SUB_URL_1 = process.env.PANEL_BASE_URL;
  const SUB_URL_2 = process.env.PANEL_BASE_URL_2;

  const [r1, r2] = await Promise.all([
    fetch(`${SUB_URL_1}/${userId}`),
    fetch(`${SUB_URL_2}/${userId}`)
  ]);

  const [t1, t2] = await Promise.all([r1.text(), r2.text()]);

  res.json({
    status1: r1.status,
    status2: r2.status,
    text1: t1.substring(0, 100),
    text2: t2.substring(0, 100)
  });
}
