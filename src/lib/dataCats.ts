import { catColors } from "./colorsCats";

export interface Cat {
    id: number;
    description: string;
    imageUrl: string;
    colorPrimario: keyof typeof catColors;
    colorSecundario: keyof typeof catColors;
    breed: string;
}

export const cats: Cat[] = [
  {
    id: 1,
    description: "Un gato juguetón y curioso, amante de las cajas y las siestas al sol.",
    imageUrl: "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
    colorPrimario: "orange",
    colorSecundario: "white",
    breed: "Naranja",
  },
  {
    id: 2,
    description: "Muy cariñosa y vocal, le encanta estar acompañada y observar por la ventana.",
    imageUrl: "https://cdn2.thecatapi.com/images/9j5.jpg",
    colorPrimario: "siamese",
    colorSecundario: "cream",
    breed: "Siamés",
  },
  {
    id: 3,
    description: "Explorador nato, siempre buscando nuevas aventuras en casa.",
    imageUrl: "https://cdn2.thecatapi.com/images/bpc.jpg",
    colorPrimario: "brown",
    colorSecundario: "white",
    breed: "Marrón",
  },
  {
    id: 4,
    description: "Tranquila y elegante, disfruta de largas siestas y cepillados.",
    imageUrl: "https://cdn2.thecatapi.com/images/6qi.jpg",
    colorPrimario: "white",
    colorSecundario: "gray",
    breed: "Persa",
  },
  {
    id: 5,
    description: "Rápido y sigiloso, le encanta jugar a las escondidas.",
    imageUrl: "https://cdn2.thecatapi.com/images/MTY3ODIyNQ.jpg",
    colorPrimario: "black",
    colorSecundario: "gray",
    breed: "Bombay",
  },
  {
    id: 6,
    description: "Muy inteligente y observador, aprende trucos fácilmente.",
    imageUrl: "https://cdn2.thecatapi.com/images/2oo.jpg",
    colorPrimario: "blue",
    colorSecundario: "white",
    breed: "Azul ruso",
  },
  {
    id: 7,
    description: "Gato tranquilo, le gusta dormir en lugares altos y soleados.",
    imageUrl: "https://cdn2.thecatapi.com/images/9j5.jpg",
    colorPrimario: "gray",
    colorSecundario: "white",
    breed: "Británico",
  },
  {
    id: 8,
    description: "Elegante y travieso, parece que siempre lleva puesto un esmoquin.",
    imageUrl: "https://cdn2.thecatapi.com/images/8r.jpg",
    colorPrimario: "black",
    colorSecundario: "white",
    breed: "Tuxedo",
  },
];

