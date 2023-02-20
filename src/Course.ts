export enum Courses{
    /**
     * かんたん
     */
    Easy,
    /**
     * ふつう
     */
    Normal,
    /**
     * むずかしい
     */
    Hard,
    /**
     * おに
     */
    Oni,
    /**
     * エディット
     */
    Edit,
    /**
     * 太鼓タワー
     */
    Tower,
    /**
     * 段位認定モード
     */
    Dan
}

export class CourseConverter{
    /**
     * 整数からその整数が意味するコース名を返します。該当しない場合、おにが戻り値になります。
     * @param number 整数
     * @returns コース名
     */
    static GetCoursesFromNumber(number:Number){
        switch(number){
            case 0: return Courses.Easy;
            case 1: return Courses.Normal;
            case 2: return Courses.Hard;
            case 3: return Courses.Oni;
            case 4: return Courses.Edit;
            case 5: return Courses.Tower;
            case 6: return Courses.Dan;
            default: return Courses.Oni;
        }
    }

    /**
     * 文字列からその文字列が意味するコース名を返します。該当しない場合、おにが戻り値になります。
     * @param str 文字列
     * @returns コース名
     */
    static GetCoursesFromString(str:string){
        str = str.toLowerCase();
        switch (str)
        {
            case "easy": return Courses.Easy;
            case "normal": return Courses.Normal;
            case "hard": return Courses.Hard;
            case "oni": return Courses.Oni;
            case "edit": return Courses.Edit;
            case "tower": return Courses.Tower;
            case "dan": return Courses.Dan;
            default: return Courses.Oni;
        }
    }
}