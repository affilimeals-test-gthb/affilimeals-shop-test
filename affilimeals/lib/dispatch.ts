export async function sendEmail(to:string, subject:string, text:string){
  if(!process.env.RESEND_API_KEY) return
  await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{ 'Authorization':`Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ from:'orders@affilimeals.com', to, subject, text })
  })
}
export async function sendWhatsApp(to:string, text:string){
  if(!process.env.TWILIO_ACCOUNT_SID) return
  const body = new URLSearchParams({ To:`whatsapp:${to}`, From:`whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`, Body:text })
  await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,{
    method:'POST', headers:{ 'Authorization':'Basic '+Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64') }, body
  })
}
export async function sendSlack(webhook:string, text:string){
  await fetch(webhook,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})})
}
export async function sendPOSLightspeed(order:any){ /* TODO */ }
