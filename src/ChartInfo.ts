/**
 * 譜面情報クラス
 */
export class ChartInfo{
    /**
     * 譜面のタイトル
     */
    Title: string | undefined;
    /**
     * 譜面のサブタイトル
     */
    SubTitle: string | undefined;
    /**
     * サブタイトルの表示方式
     */
    SubTitleMode: SubTitleModes | undefined;
    /**
     * 基本BPM
     */
    BPM: number | undefined;
    /**
     * 音源ファイル
     */
    Wave: string | undefined;
    /**
     * オフセット
     */
    Offset: number | undefined;
    /**
     * デモ音源再生開始時間
     */
    DemoStart: number | undefined;
    /**
     * ジャンル
     */
    Genre: string | undefined;
    /**
     * 曲音量
     */
    SongVol: number | undefined;
    /**
     * 効果音量
     */
    SeVol: number | undefined;
    /**
     * 配点方式
     */
    ScoreMode: ScoreModes | undefined;
    /**
     * 表譜面・裏譜面
     */
    Side: Sides | undefined;
    /**
     * 残基
     */
    Life: number | undefined;
    /**
     * 背景画像
     */
    BgImage: string | undefined;
    /**
    　* 背景動画
    　*/
    BgMovie: string | undefined;
    /**
     * 背景動画のオフセット
     */
    MovieOffset: number | undefined;
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