import pg from "../../database/index.js";



export default class UsersRepository {
  constructor() {
    this.pg = pg;
  }

   async getUsers() {
    const allUsers = await this.pg.manyOrNone("SELECT * from users");
    console.log(allUsers)
    return allUsers;
  }

  async getUserById(id) {
   const user = await this.pg.oneOrNone(
    "SELECT * FROM users WHERE id = $1 ", id
    );
   
   
  }

   async getUserByEmail(email) {
    const user = await this.pg.oneOrNone("SELECT * FROM users WHERE email = $1", email);
    return user;
  }

  async createUser(user) {
    await this.pg.nome(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)", [ user.name, user.email, user.password]);
      return user;
    
    
  }
  async  updateUser(id, name, email, password) {
    const user = await this.getUserById(id);

    if (!user) {
      return null;
    }
    const userUpdate = await this.pg.oneOrNone("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, password, id]);

    return userUpdate;
  }

  async deleteUser(id) {
   await this.pg.none("DELETE FROM users WHERE id = $1", id);
  }
}
