export default async function handler(req, res) {
  
  if (req.headers.authorization !== `Bearer ${process.env.API_SECRET}`) {
    return res.status(403).json({ success: false });
  }

  const resp1 = await fetch(`${process.env.PANEL_BASE_URL}/panel/api/inbounds/addClient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": process.env.PANEL_COOKIE
    },
    body: JSON.stringify(req.body)
  });

  const resp2 = await fetch(`${process.env.PANEL_BASE_URL_2}/panel/api/inbounds/addClient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": process.env.PANEL_COOKIE_2
    },
    body: JSON.stringify(req.body)
  });

  const text1 = await resp1.text();
  const text2 = await resp2.text();

  if (!resp1.ok) return res.status(resp1.status).send(text1);
  if (!resp2.ok) return res.status(resp2.status).send(text2);

  res.status(200).json({ success: true });
}
