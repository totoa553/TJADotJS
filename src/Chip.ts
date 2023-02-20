import { Branches } from "./Format/Branches";
import { Chips } from "./Format/Chips"
import { Notes } from "./Format/Notes";
import { Measure } from "./Format/Measure";
import { SENotes } from "./Format/SENotes";

/**
 * チップのクラス
 */
export class Chip{
    /**
     * 時間
     */
    Time!: Number;

    /**
     * チップのタイプ
     */
    ChipType!: Chips;

    /**
     * 音符のタイプ
     */
    NoteType!: Notes;

    /**
     * 音符のSE
     */
    SENote!: SENotes;

    /**
     * 何譜面か
     */
    Branch!: Branches;

    /**
     * 現在分岐中の譜面かどうか
     */
    Branching!: Boolean;

    /**
     * スクロールスピード
     */
    Scroll!: Number;

    /**
     * BPM
     */
    BPM!: Number;

    /**
     * 音符の流れてくる方向（弧度法）
     */
    Direction!: Number;

    /**
     * 音符であるかどうか
     */
    get IsNote(){
        return this.ChipType == Chips.Note;
    }

    /**
     * このチップが叩かれたか・判定枠を通ったか
     */
    IsHitted!: Boolean;

    /**
     * このチップが見えるかどうか
     */
    CanShow!: Boolean;

    /**
     * このチップがゴーゴータイム中のものか
     */
    IsGoGoTime!: Boolean;

    /**
     * このチップが叩かれたとき、実際の時間とどれくらいの差があったか
     */
    TimeLag!: Number;

    /**
     * 黄色連打数・風船連打数ノルマ
     */
    RollCount!: Number;

    /**
     * 小節数
     */
    MeasureCount!: Number;

    /**
     * Measure
     */
    Measure!: Measure;

    /**
     * 連打の終端
     */
    RollEnd!: Chip;

    toString(){
        var s = this.IsNote
            ? `Time: ${this.Time} / NoteType: ${this.NoteType} / Branch: ${this.Branch} / IsGoGoTime: ${this.IsGoGoTime}`
            : `Time: ${this.Time} / ChipType: ${this.ChipType} / Branch: ${this.Branch} / IsGoGoTime: ${this.IsGoGoTime}`;
        return s;
    }
}