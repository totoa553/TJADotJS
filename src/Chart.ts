import { ChartInfo } from "./ChartInfo"

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
    Headers: Header[];
    Text: string;
    Composite_Measure: Composite_Measure;
    Composite_Chip: Composite_Chip;
    Info: CourseInfo;
    Measure: Composite_Measure;
    Chip: any;
    constructor(headers: Header[],text: string){
        this.Headers = headers?headers:new Array();
        this.Text = text?text:"";
        this.Measure = new Composite_Measure();
        this.Chip = new Composite_Chip();
        this.Info = new CourseInfo();
    }
}

export class Composite_Measure{
    Common: string[];
    Player1: string[];
    Player2: string[];
    constructor(){
        this.Common = new Array();
        this.Player1 = new Array();
        this.Player2 = new Array();
    }
}

export class Composite_Chip{
    Common: Chip[];
    Player1: Chip[];
    Player2: Chip[];
    constructor(){
        this.Common = new Array();
        this.Player1 = new Array();
        this.Player2 = new Array();
    }
}

export class Header{
    Name: string;
    Value: string;
    constructor(name:string,value:string){
        this.Name = name?name:"";
        this.Value = value?value:"";
    }
    toString(){
        return `${this.Name}:${this.Value}`
    }
}