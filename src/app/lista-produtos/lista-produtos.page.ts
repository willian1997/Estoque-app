import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Produto } from '../models/Produto.models';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ListaProdutosPage{

  listaProdutos: Produto[] = [];


  constructor(private produtoService: ProdutosService) {
    this.buscarProdutos()
  }

  buscarProdutos(){
    this.produtoService.getAll().subscribe(dados => {
      this.listaProdutos = dados as Produto[];
    });
  }
}
