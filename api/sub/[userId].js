module.exports = async function handler(req, res) {
  const { userId } = req.query;

  const SUB_URL_1 = process.env.SUB_URL_1;
  const SUB_URL_2 = process.env.SUB_URL_2;

  res.json({ 
    userId,
    SUB_URL_1: SUB_URL_1 || "NOT SET",
    SUB_URL_2: SUB_URL_2 || "NOT SET"
  });
}
