  
export interface Breed {
    id: string;
    name: string;
    description: string;
    primaryColors: string[];
    secondaryColors: string[];
    image: string;
    likes?: number;
  }