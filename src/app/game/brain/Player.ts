export interface Player {
    id: number;
    name: string;
    score: number;
}

export class Player {
    constructor (name, id) {
      this.id = id;
      this.name = name;
      this.score = 0;
    }
}