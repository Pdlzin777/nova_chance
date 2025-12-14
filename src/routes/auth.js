import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

// USUÁRIO FAKE (exemplo)
const USER = {
  email: 'teste@gmail.com',
  senha: '123456'
}

router.post('/login', (req, res) => {
  const { email, senha } = req.body

  if (email !== USER.email || senha !== USER.senha) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.json({ token })
})

export default router
