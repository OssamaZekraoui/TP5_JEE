import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private http:HttpClient) {
  }

  products : Array<any> = [];

  ngOnInit() {
   this.getProducts();
  }

  getProducts(){
    this.http.get<Array<any>>("http://localhost:8089/products")
      .subscribe({
        next:data => {
          this.products = data
        },
        error:err => {
          console.log(err)
        }
      })
  }
  handleCheckProduct(product: any) {
    this.http.patch<any>(`https://localhost:8089/products/${product.id}`,
      {checked:!product.checked})
      .subscribe({
          next:updatedProduct => {
            product.checked =!product.checked
          }
        }
      )
  }


}
