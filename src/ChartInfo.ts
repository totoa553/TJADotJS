/**
 * 譜面情報クラス
 */
export class ChartInfo{
    Title: string;
    SubTitle: string;
    SubTitleMode: SubTitleModes;
    BPM: number;
    Wave: string;
    Offset: number;
    DemoStart: number;
    Genre: string;
    SongVol: number;
    SeVol: number;
    ScoreMode: ScoreModes;
    Side: Sides;
    Life: number;
    BgImage: string;
    BgMovie: string;
    MovieOffset: number;
    constructor(){
        /**
         * 譜面のタイトル
         */
        this.Title = "";

        /**
         * 譜面のサブタイトル
         */
        this.SubTitle = "";

        /**
         * サブタイトルの表示方式
         */
        this.SubTitleMode = SubTitleModes.Show;

        /**
         * 基本BPM
         */
        this.BPM = 0;

        /**
         * 音源ファイル
         */
        this.Wave = "";

        /**
         * オフセット
         */
        this.Offset = 0;

        /**
         * デモ音源再生開始時間
         */
        this.DemoStart = 0;

        /**
         * ジャンル
         */
        this.Genre = "";

        /**
         * 曲音量
         */
        this.SongVol = 0;

        /**
         * 効果音量
         */
        this.SeVol = 0;

        /**
         * 配点方式
         */
        this.ScoreMode = ScoreModes.Gen3;

        /**
         * 表譜面・裏譜面
         */
        this.Side = Sides.Both;

        /**
         * 残基
         */
        this.Life = 0;

        /**
         * 背景画像
         */
        this.BgImage = "";

        /**
         * 背景動画
         */
        this.BgMovie = "";

        /**
         * 背景動画のオフセット
         */
        this.MovieOffset = 0;
    }
}

export enum ScoreModes{
    /**
     * 旧作配点
     */
    Gen1,

    /**
     * 旧筐体配点
     */
    Gen2,

    /**
     * 新筐体配点
     */
    Gen3
}

/**
 * 表譜面・裏譜面
 */
export enum Sides{
    Normal,
    Extra,
    Both
}

/**
 * サブタイトルの表示方式
 */

export enum SubTitleModes{
    Hide,
    Show
}