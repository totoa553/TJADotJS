export class Measure{
    Part!: number;
    Beat!: number;
    constructor(part:number,beat:number){
        this.Part = part;
        this.Beat = beat;
    }

    toString(){
        return `${this.Part}/${this.Beat}`
    }

    GetRate(){
        return 240 * ( this.Part / this.Beat )
    }
}