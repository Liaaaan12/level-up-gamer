import type { Product } from '../types';

// La ruta ahora sube a 'src' (../) y luego baja a 'assets/images/'
import imgCatan from '../assets/images/resena-catan-1024x1024.jpg';
import imgCarcassonne from '../assets/images/OIP.jpg';
import imgMandoXbox from '../assets/images/mando-xbox.jpg';
import imgAudisHyperX from '../assets/images/audis_hyperX cloud 2.jpg';

export const products: Product[] = [
  {
    codigo: "JM001",
    categoria: "Juegos de Mesa",
    nombre: "Catan",
    precio: "$29.990 CLP",
    descripcion: "Un clásico juego de estrategia...",
    imagen: imgCatan 
  },
  {
    codigo: "JM002",
    categoria: "Juegos de Mesa",
    nombre: "Carcassonne",
    precio: "$24.990 CLP",
    descripcion: "Un juego de colocación de fichas...",
    imagen: imgCarcassonne
  },
  {
    codigo: "AC001",
    categoria: "Accesorios",
    nombre: "Controlador Inalámbrico Xbox series X",
    precio: "$59.990 CLP",
    descripcion: "Ofrece una experiencia de juego cómoda...",
    imagen: imgMandoXbox
  },
  {
    codigo: "AC002",
    categoria: "Accesorios",
    nombre: "Auriculares Gamer HyperX Cloud II",
    precio: "$79.990 CLP",
    descripcion: "Proporcionan un sonido envolvente de calidad...",
    imagen: imgAudisHyperX
  },
];