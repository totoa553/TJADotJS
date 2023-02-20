export enum Notes{
    /**
     * 空白
     */
    Space,
    /**
     * ドン
     */
    Don,
    /**
     * カッ
     */
    Ka,
    /**
     * ドン(大)
     */
    DON,
    /**
     * カッ(大)
     */
    KA,
    /**
     * 連打開始
     */
    RollStart,
    /**
     * 連打開始(大)
     */
    ROLLStart,
    /**
     * ふうせん連打
     */
    Balloon,
    /**
     * 連打終了
     */
    RollEnd,
    /**
     * くすだま
     */
    Kusudama
}

export class NotesConverter{
    static GetNotesFromChar(ch: string){
        switch (ch)
        {
            case '0': return Notes.Space;
            case '1': return Notes.Don;
            case '2': return Notes.Ka;
            case '3': return Notes.DON;
            case '4': return Notes.KA;
            case '5': return Notes.RollStart;
            case '6': return Notes.ROLLStart;
            case '7': return Notes.Balloon;
            case '8': return Notes.RollEnd;
            case '9': return Notes.Kusudama;
            default: return Notes.Space;
        } 
    }
}