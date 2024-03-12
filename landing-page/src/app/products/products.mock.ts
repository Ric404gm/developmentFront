export const  productsList : any  =[
    {id: 1, name:'Suavitel',price : 19 ,stock:1,detalle : 'Suavisante'},
    {id: 2, name:'Pino',price : 32 ,stock:3,detalle : 'Desinfectante'},
    {id: 3, name:'Salvo',price : 40,stock:4,detalle : 'Jabon' },    
    {id: 4, name:'Zote',price : 15 ,stock:8,detalle : 'Jabon ropa'},
    {id: 5, name:'Maestro',price : 79 ,stock:10,detalle : 'Jabon Ropa polvo'},

]

export interface Product {

    id: number;
    name : string;
    price: number;
    stock: number;
    detalle: string;
}