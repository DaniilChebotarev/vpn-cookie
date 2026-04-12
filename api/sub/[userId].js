module.exports = async function handler(req, res) {
  const { userId } = req.query;

  const SUB_URL_1 = process.env.SERVER1_URL;
  const SUB_URL_2 = process.env.SERVER2_URL;

  res.json({ 
    userId,
    SUB_URL_1: SUB_URL_1 || "NOT SET",
    SUB_URL_2: SUB_URL_2 || "NOT SET"
  });
}
