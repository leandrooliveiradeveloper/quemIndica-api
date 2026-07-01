export class RequestResponse {
  constructor(id, sucess, status, message, objeto) {
    this.status = status;
    this.message = message;
    this.id = id;
    this.sucess = sucess;
    this.objeto = objeto;
  }
}
