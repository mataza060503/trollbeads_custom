import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = "/products";
  private dbProductListPath = "/product-list"
  private dbSignatureProduct = "/signature-product"
  private dbBeads = "/beads"
  private dbSilverBeads = "/silver-beads"

  ref!: AngularFireList<any>
  productListRef!: AngularFireList<any>
  signatureProductRef!: AngularFireList<any>
  beadsRef!: AngularFireList<any>
  silverBeadsRef!: AngularFireList<any>

  constructor(private db: AngularFireDatabase) { 
    this.ref = db.list(this.dbPath)
    this.productListRef = db.list(this.dbProductListPath)
    this.signatureProductRef = db.list(this.dbSignatureProduct)
    this.beadsRef = db.list(this.dbBeads)
    this.silverBeadsRef = db.list(this.dbSilverBeads)
  }

  getAllProduct() {
    return this.ref
  }

  getAllProductList() {
    return this.productListRef
  }

  getAllSignatureProduct() {
    return this.signatureProductRef
  }
  
  getAllBeads() {
    return this.beadsRef
  }

  getAllSilverBeads() {
    return this.silverBeadsRef
  }
}
