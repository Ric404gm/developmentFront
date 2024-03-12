import { Injectable  } from "@angular/core";
import { Observable } from 'rxjs';
import { CatalogoGestor } from "../interfaces/catalog-interface";
import { CatalogsService } from "src/app/services/catalogs/catalogs.service";


@Injectable({
  providedIn: 'root',
})
export class CatalogsSandBox {
 
  constructor(private catalogsService:  CatalogsService){}


   get( catalogName:  string){
    return new Observable<Array<CatalogoGestor>> ( (observer : any ) => {
        this.catalogsService.obtenerCatalogo(catalogName).subscribe((res) =>{
            observer.next(res)
            observer.complete();
        });  
    });
   }



}