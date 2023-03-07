import mongoose from "mongoose"

const userSchema  = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    age: { type: String, required: true },
    pain: { type: Boolean, required: true, default: false },
    live: { type: Boolean, required: true, default: false },
    bed: { type: Boolean, required: true, default: false },
    independent: { type: Boolean, required: true, default: false },
    activity: { type: Boolean, required: true, default: false },
    support: { type: Boolean, required: true, default: false },
    objectives: { type: String, required: true },
    restrictions: { type: Boolean, required: true, default: false },
    genrer: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true }
  }, { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;