import User from "../../../models/User"
import db from "../../../utils/db"

import bcryptjs from 'bcryptjs'

async function handler (req, res) {
  if(req.method !== 'POST') {
    return;
  }

  const { 
    name, 
    email, 
    password,
    age,
    pain,
    live,
    bed,
    independent,
    activity,
    support,
    regularly 
  } = req.body;
  if(
    !name ||
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5 ||
    !age || age.trim().length < 2
  ) {
    res.status(422).json({
      message: 'Validation error'
    });
    
    return;
  }

  await db.connect();
  
  const existingUser = await User.findOne({ email: email });
  if(existingUser) {
    res.status(422).json({ 
      message: 'User exists already!' 
    });
    await db.disconnect();
    return;
  }

  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
    age: age,
    pain: pain,
    live: live,
    bed: bed,
    independent: independent,
    activity: activity,
    support: support,
    regularly: regularly
  });

  const user = await newUser.save();
  await db.disconnect();

  res.status(201).send({
    message: 'Created user!',
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    age: user.age,
    pain: user.pain,
    live: user.live,
    bed: user.bed,
    independent: user.independent,
    activity: user.activity,
    support: user.support,
    regularly: user.regularly
  });
}


export default handler;