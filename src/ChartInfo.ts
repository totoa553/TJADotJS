/**
 * 譜面情報クラス
 */
export class ChartInfo{
    /**
     * 譜面のタイトル
     */
    Title!: string;
    /**
     * 譜面のサブタイトル
     */
    SubTitle!: string;
    /**
     * サブタイトルの表示方式
     */
    SubTitleMode!: SubTitleModes;
    /**
     * 基本BPM
     */
    BPM!: number;
    /**
     * 音源ファイル
     */
    Wave!: string;
    /**
     * オフセット
     */
    Offset!: number;
    /**
     * デモ音源再生開始時間
     */
    DemoStart!: number;
    /**
     * ジャンル
     */
    Genre!: string;
    /**
     * 曲音量
     */
    SongVol!: number;
    /**
     * 効果音量
     */
    SeVol!: number;
    /**
     * 配点方式
     */
    ScoreMode!: ScoreModes;
    /**
     * 表譜面・裏譜面
     */
    Side!: Sides;
    /**
     * 残基
     */
    Life!: number;
    /**
     * 背景画像
     */
    BgImage!: string;
    /**
    　* 背景動画
    　*/
    BgMovie!: string;
    /**
     * 背景動画のオフセット
     */
    MovieOffset!: number;
    constructor(){
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