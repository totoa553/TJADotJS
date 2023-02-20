import { ChartInfo } from "./ChartInfo"
import { Chip } from "./Chip";

export class Chart{
    CommonHeader: Header[];
    Courses: Course[];
    Info: ChartInfo;
    constructor(){
        this.CommonHeader = new Array();
        this.Courses = new Array();
        this.Info = new ChartInfo();
    }
}

export class Course{
    Headers: Header[] | undefined;
    Text: string | undefined;
    Composite_Measure: Composite_Measure | undefined;
    Composite_Chip: Composite_Chip | undefined;
    Info: CourseInfo | undefined;
    constructor(headers: Header[],text: string){
        this.Headers = headers;
        this.Text = text;
    }
}

export class Composite_Measure{
    Common: string[] | undefined;
    Player1: string[] | undefined;
    Player2: string[] | undefined;
    constructor(){
    }
}

export class Composite_Chip{
    Common: Chip[] | undefined;
    Player1: Chip[] | undefined;
    Player2: Chip[] | undefined;
    constructor(){
    }
}

export class Header{
    Name: string;
    Value: string;
    constructor(name:string,value:string){
        this.Name = name;
        this.Value = value;
    }
    toString(){
        return `${this.Name}:${this.Value}`
    }
}