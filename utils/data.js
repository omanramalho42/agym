import bcrypt from 'bcryptjs';

export const data = {
  users: [
    {
      name: 'Oman',
      email: 'omanapple42@hotmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
      age: '22',
      pain: false,
      live: false,
      bed: false,
      independent: false,
      activity: false,
      support: false,
      regularly: "1"
    },
    {
      name: 'Thiago',
      email: 'thiago@hotmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      age: '22',
      pain: false,
      live: false,
      bed: false,
      independent: false,
      activity: false,
      support: false,
      regularly: "2-3"
    },
    {
      name: 'Kaneson',
      email: 'kaneson@hotmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
      age: '22',
      pain: false,
      live: false,
      bed: false,
      independent: false,
      activity: false,
      support: false,
      regularly: "2-3"
    },
  ]
}