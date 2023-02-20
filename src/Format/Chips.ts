export enum Chips{
    /**
     * 音符
     */
    Note,
    /**
     * 小節線
     */
    Measure,
    /**
     * 表紙変更
     */
    MeasureChange,
    /**
     * BPM変更
     */
    BPMChange,
    /**
     * ゴーゴータイム開始
     */
    GoGoStart,
    /**
     * ゴーゴータイム終了
     */
    GoGoEnd,
    /**
     * 小節線OFF
     */
    BarLineOff,
    /**
     * 小節線ON
     */
    BarLineOn,
    /**
     * 実際に分岐する
     */
    Branching,
    /**
     * 譜面分岐開始
     */
    BranchStart,
    /**
     * 譜面分岐終了
     */
    BranchEnd,
    /**
     * 譜面分岐リセット
     */
    Section,
    /**
     * 譜面分岐維持
     */
    LevelHold,
    /**　
     * 段位認定モード　曲切り替え
     */
    NextSong,
    /**
     * 歌詞変更
     */
    LyricChange,
    /**
     * BGMの開始
     */
    BGMStart,
    /**
     * 背景動画の開始
     */
    MovieStart,
    /**
     * 背景画像の変更
     */
    BGChange
}