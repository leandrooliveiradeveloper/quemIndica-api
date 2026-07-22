// src/app/utils/PasswordService.js
import bcrypt from "bcrypt";

class PasswordService {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

// exporta como default
export default new PasswordService();
