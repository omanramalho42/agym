import bcrypt from 'bcryptjs';

export const data = {
  users: [
    {
      name: 'Oman',
      email: 'omanapple42@hotmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'Thiago',
      email: 'thiago@hotmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false
    },
  ]
}