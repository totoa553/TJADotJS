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
    ChipType!: Format.Chips.Note;

    /**
     * 音符のタイプ
     */
    NoteType!: Format.Notes;

    /**
     * 音符のSE
     */
    SENote!: Format.SENotes;

    /**
     * 何譜面か
     */
    Branch!: Format.Branches;

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
    Measure!: Format.Measure;

    /**
     * 連打の終端
     */
    RollEnd!: Chip;
}