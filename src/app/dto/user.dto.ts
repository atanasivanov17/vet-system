export class User {
  private _username: string;
  private _password: string;

  constructor(username: string, password: string, role: string, jwtToken: string) {
    this._username = username;
    this._password = password;
  }

}
