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
    Kusudama,
    /**
     * 手つなぎ音符(ドン) (#1)
     */
    JointDon,
    /**
     * 手つなぎ音符(カッ) (#1)
     */
    JointKa,
    /**
     * 爆弾音符 (#1)
     */
    Mine,
    /**
     * Fuse Roll (#1)
     */
    FuseRoll,
    /**
     * アドリブ(#1)
     */
    ADLIB,
    /**
     * 面縁両押し(#1)
     */
    DoubleHit,
    /**
     * Konga Clap Roll | Taiko big Roll (#1)
     */
    KongaROLL,
    /**
     * Konga yellow roll | Taiko small roll (#1)
     */
    KongaRoll,
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
            case 'A': return Notes.JointDon;
            case 'B': return Notes.JointKa;
            case 'C': return Notes.Mine;
            case 'D': return Notes.FuseRoll;
            case 'F': return Notes.ADLIB;
            case 'G': return Notes.DoubleHit;
            case 'H': return Notes.KongaROLL;
            case 'I': return Notes.KongaRoll;
            default: return Notes.Space;
        } 
    }
}