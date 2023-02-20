/**
 * チップのクラス
 */
export class Chip{
    /**
     * 時間
     */
    Time: Number | undefined;

    /**
     * チップのタイプ
     */
    ChipType: Format.Chips.Note | undefined;

    /**
     * 音符のタイプ
     */
    NoteType: Format.Notes | undefined;

    /**
     * 音符のSE
     */
    SENote: Format.SENotes | undefined;

    /**
     * 何譜面か
     */
    Branch: Format.Branches | undefined;

    /**
     * 現在分岐中の譜面かどうか
     */
    Branching: Boolean | undefined;

    /**
     * スクロールスピード
     */
    Scroll: Number | undefined;

    /**
     * BPM
     */
    BPM: Number | undefined;

    /**
     * 音符の流れてくる方向（弧度法）
     */
    Direction: Number | undefined;

    /**
     * このチップが叩かれたか・判定枠を通ったか
     */
    IsHitted: Boolean | undefined;

    /**
     * このチップが見えるかどうか
     */
    CanShow: Boolean | undefined;

    /**
     * このチップがゴーゴータイム中のものか
     */
    IsGoGoTime: Boolean | undefined;

    /**
     * このチップが叩かれたとき、実際の時間とどれくらいの差があったか
     */
    TimeLag: Number | undefined;

    /**
     * 黄色連打数・風船連打数ノルマ
     */
    RollCount: Number | undefined;

    /**
     * 小節数
     */
    MeasureCount: Number | undefined;

    /**
     * Measure
     */
    Measure: Format.Measure | undefined;

    /**
     * 連打の終端
     */
    RollEnd: Chip | undefined;
}