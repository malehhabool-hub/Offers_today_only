// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
    name: 'Offers Design Platform API',
    version: '1.0.0',
    status: 'active',
    message: 'مرحباً بك في منصة تصميم العروض'
  })
}
