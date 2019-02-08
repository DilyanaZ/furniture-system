export class CreateFurnitureModel {
    constructor(
       public make:string, 
       public model: string,
       public year: number, 
       public description : string, 
       public price: number,
       public image: string,
       //public imageFile?: File,  
       public material?: string
    ){}
} 