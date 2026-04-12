module.exports = async function handler(req, res) {
  const { userId } = req.query;

  try {
    const [r1, r2] = await Promise.all([
      fetch(`https://johntravolta12.mooo.com/30C70YHxj8/${userId}`),
      fetch(`https://de-johntravolta12.mooo.com/SSwKyNnsvU/${userId}`)
    ]);

    const [t1, t2] = await Promise.all([r1.text(), r2.text()]);

    res.json({
      status1: r1.status,
      status2: r2.status,
      text1: t1.substring(0, 200),
      text2: t2.substring(0, 200)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
