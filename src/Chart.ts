import { ChartInfo } from "./ChartInfo"
import { Chip } from "./Chip";
import { CourseInfo } from "./CourseInfo";

export class Chart{
    CommonHeader!: Header[];
    Courses!: Course[];
    Info!: ChartInfo;
    constructor(){
    }
}

export class Course{
    Headers!: Header[];
    Text!: string;
    Composite_Measure!: Composite_Measure;
    Composite_Chip!: Composite_Chip;
    Info!: CourseInfo;
    constructor(headers: Header[],text: string){
        this.Headers = headers;
        this.Text = text;
    }
}

export class Composite_Measure{
    Common!: string[];
    Player1!: string[];
    Player2!: string[];
    constructor(){
    }
}

export class Composite_Chip{
    Common!: Chip[];
    Player1!: Chip[];
    Player2!: Chip[];
    constructor(){
    }
}

export class Header{
    Name!: string;
    Value!: string;
    constructor(name:string,value:string){
        this.Name = name;
        this.Value = value;
    }
    toString(){
        return `${this.Name}:${this.Value}`
    }
}