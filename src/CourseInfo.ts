import { SubTitleModes } from "./ChartInfo";
import { Courses } from "./Course"

export class CourseInfo{
    /**
     * コース名
     */
    Course!: Courses ;
    /**
     * 難易度
     */
    Level!: number;
    /**
     * 風船連打
     */
    Balloon: number[] = [];
    /**
     * 初項
     */
    ScoreInit!: number;
    /**
     * 真打配点時の初項
     */
    ScoreInit_Shinuchi!: number;
    /**
     * 公差
     */
    ScoreDiff!: number;
    /**
     * 譜面スタイル
     */
    Style!: Styles;
    /**
     * 段位認定モードの条件1
     */
    Exam1: Exam = new Exam();
    /**
     * 段位認定モードの条件2
     */
    Exam2: Exam = new Exam();
    /**
     * 段位認定モードの条件3
     */
    Exam3: Exam = new Exam();
    /**
     * 段位認定モードの条件4(#1)
     */
    Exam4: Exam = new Exam();
    /**
     * 段位認定モードの条件5(#1)
     */
    Exam5: Exam = new Exam();
    /**
     * 段位認定モードの条件6(#1)
     */
    Exam6: Exam = new Exam();
    /**
     * 段位認定モードの条件7(#1)
     */
    Exam7: Exam = new Exam();
    /**
     * 段位認定モードの幕画面リスト
     */
    NextSongs: NextSong[] = new Array();
    /**
     * ゲージ増加量モード
     */
    GaugeIncrease!: Gauges;
    /**
     * 総音符あたりの総ゲージ量
     */
    Total!: number;
    /**
     * 譜面分岐を分岐時まで隠す
     */
    HiddenBranch!: Boolean;
}

/**
 * 譜面スタイル
 */
export enum Styles{
    /**
     * シングル譜面
     */
    Single,
    /**
     * ダブル譜面
     */
    Double
}

/**
 * 段位認定モードクラス
 */
export class Exam{
    /**
     * 条件の種類
     */
    Condition!: Conditions;
    /**
     * 条件の範囲
     */
    Scope!: Scopes;
    /**
     * 赤合格の閾値
     */
    RedValue!: number;
    /**
     * 金合格の閾値
     */
    GoldValue!: number;
}

/**
 * 段位認定モードの条件の種類の列挙型
 */
export enum Conditions{
    /**
     * ゲージ
     */
    Gauge,
    /**
     * 良の数
     */
    JudgePerfect,
    /**
     * 可の数
     */
    JudgeGood,
    /**
     * 不可の数
     */
    JudgeBad,
    /**
     * スコア
     */
    Score,
    /**
     * ロール
     */
    Roll,
    /**
     * 叩けた数
     */
    Hit,
    /**
     * 最大コンボ数
     */
    Combo,
    /**
     * 精度(#1)
     */
    Accuracy,
    /**
     * 叩いたADLIBの数(#1)
     */
    JudgeADLIB,
    /**
     * 叩いた爆弾音符の数(#1)
     */
    JudgeMine,
}

/**
 * 段位認定モードの条件の列挙型
 */
export enum Scopes{
    /**
     * 以上
     */
    More,
    /**
     * 未満
     */
    Less
}

/**
 * ゲージ増加量モードの列挙型
 */
export enum Gauges{
    /**
     * 普通。シミュレータによって挙動が異なる
     */
    Normal,
    /**
     * 切り捨て
     */
    Floor,
    /**
     * 四捨五入
     */
    Round,
    /**
     * 切り上げ
     */
    Ceiling,
    /**
     * 丸め処理を行わない
     */
    NotFix
}

/**
 * 段位認定モードの幕画面クラス
 */
export class NextSong{
    /**
     * タイトル
     */
    Title!: string;
    /**
     * サブタイトル
     */
    SubTitle!: string;
    /**
     * サブタイトルの表示方式
     */
    SubTitleMode!: SubTitleModes;
    /**
     * ジャンル
     */
    Genre!: string;
    /**
     * 音源ファイル
     */
    Wave!: string;
    /**
     * 初項
     */
    ScoreInit!: number;
    /**
     * 公差
     */
    ScoreDiff!: number;
}