// // src/lib/recaptcha.ts
// export async function verifyRecaptcha(token: string): Promise<boolean> {
//     const secret = process.env.RECAPTCHA_SECRET_KEY!
//     const res = await fetch(
//       'https://www.google.com/recaptcha/api/siteverify',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams({ secret, response: token }),
//       }
//     )
//     const json = await res.json()
//     // For v3 you may also check json.score >= 0.5
//     return json.success === true
//   }
  