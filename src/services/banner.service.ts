import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private dbPath = "/banners";
  ref!: AngularFireList<any>

  constructor(private db: AngularFireDatabase) { 
    this.ref = db.list(this.dbPath)
  }

  getAllBanner() {
    return this.ref
  }

}
