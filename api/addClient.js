export default async function handler(req, res) {
  
  if (req.headers.authorization !== `Bearer ${process.env.API_SECRET}`) {
    return res.status(403).json({ success: false });
  }
  
  const panelResp = await fetch(`${process.env.PANEL_BASE_URL}/panel/api/inbounds/addClient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": process.env.PANEL_COOKIE
    },
    body: JSON.stringify(req.body)
  });

  const text = await panelResp.text();
  res.status(panelResp.status).send(text);
}
