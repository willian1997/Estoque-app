import { catchError, EMPTY, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/Cliente.model';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url ='http://localhost:3000/clientes'

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  create(cliente: Cliente){
    return this.http.post(this.url, cliente);
  }

  getAll(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url).pipe(
      map(retorno => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  getOne(id: number){
    return this.http.get(`${this.url} / ${id}}`);
  }

  update(cliente: Cliente){
    return this.http.put(`${this.url} / ${cliente.id}`, cliente);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  login(){}

  loggout(){}


  exibirErro(erro: any): Observable<any>{
    const titulo = 'Erro na Conexão!!!'
    const msg = `Verifique sua conexão ou informe ao suporte o erro: ${erro.status}`;
    this.presentAlert(titulo, msg);
    return EMPTY;
  }

  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
