import { Chart,Header,Course } from "./Chart";
import { ScoreModes,Sides,SubTitleModes } from "./ChartInfo";
import { Chip } from "./Chip";
import { CourseConverter, Courses } from "./Course";
import { Conditions, Exam, Gauges, Scopes, Styles } from "./CourseInfo";
import { Branches } from "./Format/Branches";
import { Chips } from "./Format/Chips";
import { Measure } from "./Format/Measure";
import { NotesConverter, Notes } from "./Format/Notes";
import { SENoteGenerator } from "./Format/SENotes";

/**
* .tjaフォーマットの読み込みからパースまでを担当するメインクラス。
*/
export class TJADotJS {
  /**  
* 譜面をパースします。
* @param {string} str - .tjaフォーマットな文字列。
*/

  chart = new Chart();
  constructor(str:string){
    // COURSE: で分割 ついでにコメントも消す
    var splitedCourses = str.replaceAll(/(\/)(?:\*[\s\S]*?\*\/|\/.*)/,"").split("COURSE:");
    // 各要素にCOURSE: をくっつける ただし、[0]は共通ヘッダなので、COURSE:をつけない。
    for (var i = 1; i < splitedCourses.length; i++)
    {
        // COURSE:を再び付与してsplitedCoursesに入れる
        splitedCourses[i] = "COURSE:" + splitedCourses[i];
    };

    // 共通ヘッダを取り出して coursesに投げる。
    var commonHeader = splitedCourses[0];
    var courses = splitedCourses.slice(1);

    // 共通ヘッダのパース
    this.chart.CommonHeader = this.GetHeaderFromString(commonHeader);

    var parentthis = this;
    // 各コースのパース
    for(var i = 1; i < courses.length; i++){
      void function setComposite(course: string,first: boolean){
        var [header, text, remain, side] = parentthis.SplitCourse(course);
        var headerList = parentthis.GetHeaderFromString(header);
        if (first)
        {
          parentthis.chart.Courses.push(new Course(headerList, text));
        }
        if (side == "")
        {
            // #START だった
            parentthis.chart.Courses[i].Measure.Common = getMeasureThisPlayerSide(text);
        }
        else if (side == "P1")
        {
            // #START P1だった
            parentthis.chart.Courses[i].Measure.Player1 = getMeasureThisPlayerSide(text);
        }
        else if (side == "P2")
        {
            // #START P2だった
            parentthis.chart.Courses[i].Measure.Player2 = getMeasureThisPlayerSide(text);
        }
        if (!!remain)
        {
            setComposite(remain, false);
        }

        function getMeasureThisPlayerSide(playerMeasure: string){
          var nowMeasure = "";
          var measures = new Array();
          for(var nowLine in playerMeasure.split("\n")){
            if (nowLine.trim().indexOf(",") > -1)
            {
              // 行にカンマがある
              if (nowLine.trim().startsWith("#"))
              {
                  // カンマがあるけど、多分命令行なので処理を続行する
                  nowMeasure += nowLine + "\n\r";
                  continue;
              }
              else
              {
                  // 小節の終わり
                  // 0,0, という書き方もあるので、ちゃんと今の小節だけ抜き出してやる。
                function addOneMeasure(measureLine: string)
                {
                  // ,を除く譜面の抜き出し。
                  var target = measureLine.substring(0, measureLine.indexOf(","));
                  // 空だった場合、一小節としてカウントする
                  if (target == "")
                  {
                    // つまり,で一小節
                    // 0,と解釈させる
                    target = "0";
                  }
                  nowMeasure += target;
                  // それをListに追加
                  measures.push(nowMeasure);
                  // クリア
                  nowMeasure = "";
                  // 残りに,が存在する(=その行にまだ小節がある)
                  var remain = measureLine.substring(measureLine.indexOf(",") + 1);
                  if (remain.includes(","))
                  {
                    // 再帰処理
                    addOneMeasure(remain);
                  }
                }
                addOneMeasure(nowLine.trim());
                continue;
              }
            }
            else
          {
              // もちろん続ける
              nowMeasure += nowLine + "\n\r";
              continue;
            }
          }
          return measures
        }
        setComposite(courses[i], true);
      };
      this.chart.CommonHeader.forEach(function(common: Header){
        function header(name: string)
        {
                    return name == common.Name.trim();
        }
        function subtitler(value: string)
        {
          var subtitleMode: SubTitleModes;
          if (value.startsWith("--") || value.startsWith("++"))
          {
            var trimedValue = value.substring(2);
            if (value.startsWith("--"))
            {
              subtitleMode = SubTitleModes.Hide;
            }
            else
            {
              subtitleMode = SubTitleModes.Show;
            }
            return [trimedValue,subtitleMode];
          }
          else
          {
            subtitleMode = SubTitleModes.Hide;
            return [value,subtitleMode];
          }
        }
        var result;
        if (header("TITLE"))
        {
          parentthis.chart.Info.Title = common.Value;
        }
        else if (header("SUBTITLE"))
        {
          parentthis.chart.Info.SubTitle = subtitler(common.Value)[0];
          parentthis.chart.Info.SubTitleMode = subtitler(common.Value)[1];
        }
        else if (header("BPM"))
        {
          if (result = parseFloat(common.Value))
          {
            parentthis.chart.Info.BPM = result;
          }
        }
        else if (header("WAVE"))
        {
          parentthis.chart.Info.Wave = common.Value;
        }
        else if (header("OFFSET"))
        {
            if (result = parseFloat(common.Value))
            {
              parentthis.chart.Info.Offset = result;
            }
        }
        else if (header("DEMOSTART"))
        {
            if (result = parseFloat(common.Value))
            {
              parentthis.chart.Info.DemoStart = result;
            }
        }
        else if (header("GENRE"))
        {
          parentthis.chart.Info.Genre = common.Value;
        }
        else if (header("SONGVOL"))
        {
            if (result = parseInt(common.Value))
            {
              parentthis.chart.Info.SongVol = result;
            }
        }
        else if (header("SEVOL"))
        {
            if (result = parseInt(common.Value))
            {
              parentthis.chart.Info.SeVol = result;
            }
        }
        else if (header("SCOREMODE"))
        {
            if (result = parseInt(common.Value))
            {
              switch (result)
              {
                  case 0:
                    parentthis.chart.Info.ScoreMode = ScoreModes.Gen1;
                      break;
                  case 1:
                    parentthis.chart.Info.ScoreMode = ScoreModes.Gen2;
                      break;
                  case 2:
                    parentthis.chart.Info.ScoreMode = ScoreModes.Gen3;
                      break;
                  default:
                    parentthis.chart.Info.ScoreMode = ScoreModes.Gen3;
                      break;
              }
            }
        }
        else if (header("SIDE"))
        {
          if (result = parseInt(common.Value))
          {
            switch (result)
            {
              case 0:
                parentthis.chart.Info.Side = Sides.Normal;
                break;
              case 1:
                parentthis.chart.Info.Side = Sides.Extra;
                break;
              case 2:
                parentthis.chart.Info.Side = Sides.Both;
                break;
              default:
                parentthis.chart.Info.Side = Sides.Both;
                break;
            }
          }
          else
          {
            switch (common.Value)
            {
                case "NORMAL":
                  parentthis.chart.Info.Side = Sides.Normal;
                        break;
                case "EX":
                  parentthis.chart.Info.Side = Sides.Extra;
                        break;
                case "BOTH":
                  parentthis.chart.Info.Side = Sides.Both;
                        break;
                default:
                  parentthis.chart.Info.Side = Sides.Both;
                        break;
            }
          }
        }
        else if (header("LIFE"))
        {
          if (result = parseInt(common.Value))
          {
            parentthis.chart.Info.Life = result;
          }
        }
        else if (header("BGIMAGE"))
        {
          parentthis.chart.Info.BgImage = common.Value;
        }
        else if (header("BGMOVIE"))
        {
          parentthis.chart.Info.BgMovie = common.Value;
        }
        else if (header("MOVIEOFFSET"))
        {
          if (result = parseFloat(common.Value))
          {
            parentthis.chart.Info.MovieOffset = result;
          }
        }
      })
      this.chart.Courses.forEach (function(course: Course){
        course.Headers.forEach (function(item: Header){
          function header(name: string){
            return name == item.Name.trim();
          }
          var result,shin;
          if (header("COURSE")){
            if (result = parseInt(item.Value))
            {
              course.Info.Course = CourseConverter.GetCoursesFromNumber(result);
            }
            else
            {
              course.Info.Course = CourseConverter.GetCoursesFromString(item.Value);
            }
          }
          else if (header("LEVEL"))
          {
              if (result = parseInt(item.Value))
              {
                  course.Info.Level = result;
              }
          }
          else if (header("BALLOON"))
          {
              // 末尾の,対策
              var split = item.Value.split(",").filter((a: string)=>!(a==""));
              for (var ii = 0; ii < split.length; ii++)
              {
                  if (result = parseInt(split[ii]))
                  {
                      course.Info.Balloon.push(result);
                  }
              }
          }
          else if (header("SCOREINIT"))
          {
              // ,で区切って、真打配点をしている場合がある
              var split = item.Value.split(",").filter((a: string)=>!(a==""));
              if (split.length > 1)
              {
                  // 真打あり
                  if (result = parseInt(split[0]))
                  {
                      course.Info.ScoreInit = result;
                  }
                  if (shin = parseInt(split[1]))
                  {
                      course.Info.ScoreInit_Shinuchi = shin;
                  }
              }
              else
              {
                  if (result=parseInt(item.Value))
                  {
                      course.Info.ScoreInit = result;
                  }
              }
          }
          else if (header("SCOREDIFF"))
          {
              if (result=parseInt(item.Value))
              {
                  course.Info.ScoreDiff = result;
              }
          }
          else if (header("STYLE"))
          {
              if (result = parseInt(item.Value))
              {
                  switch (result)
                  {
                      case 1:
                          course.Info.Style = Styles.Single;
                          break;
                      case 2:
                          course.Info.Style = Styles.Double;
                          break;
                      default:
                          course.Info.Style = Styles.Single;
                          break;
                  }
              }
              else
              {
                  switch (item.Value)
                  {
                      case "single":
                          course.Info.Style = Styles.Single;
                          break;
                      case "double":
                      case "couple":
                          course.Info.Style = Styles.Double;
                          break;
                      default:
                          course.Info.Style = Styles.Single;
                          break;
                  }
              }
          }
          else if (header("EXAM1") || header("EXAM2") || header("EXAM3"))
          {
              var split = item.Value.split(",");
              var exam = new Exam();
              // 条件
              if (split[0] != null)
              {
                  switch (split[0])
                  {
                      case "g":
                          exam.Condition = Conditions.Gauge;
                          break;
                      case "jp":
                          exam.Condition = Conditions.JudgePerfect;
                          break;
                      case "jg":
                          exam.Condition = Conditions.JudgeGood;
                          break;
                      case "jb":
                          exam.Condition = Conditions.JudgeBad;
                          break;
                      case "s":
                          exam.Condition = Conditions.Score;
                          break;
                      case "r":
                          exam.Condition = Conditions.Roll;
                          break;
                      case "h":
                          exam.Condition = Conditions.Hit;
                          break;
                      case "c":
                          exam.Condition = Conditions.Combo;
                          break;
                      default:
                          exam.Condition = Conditions.Gauge;
                          break;
                  }
              }
              else
              {
                  exam.Condition = Conditions.Gauge;
              }
              // 範囲
              if (split[3] != null)
              {
                  switch (split[3])
                  {
                      case "m":
                          exam.Scope = Scopes.More;
                          break;
                      case "l":
                          exam.Scope = Scopes.Less;
                          break;
                      default:
                          exam.Scope = Scopes.More;
                          break;
                  }
              }
              else
              {
                  exam.Scope = Scopes.More;
              }
              // 赤合格
              if (split[1] != null)
              {
                  if (result = parseInt(split[1]))
                  {
                      exam.RedValue = result;
                  }
              }
              else
              {
                  exam.RedValue = 0;
              }

              // 金合格
              if (split[2] != null)
              {
                  if (result = parseInt(split[2]))
                  {
                      exam.GoldValue = result;
                  }
              }
              else
              {
                  exam.GoldValue = 0;
              }

              // 最後にEXAM何かを決めて、それに代入。
              switch (item.Name.trim())
              {
                  case "EXAM1":
                      course.Info.Exam1 = exam;
                      break;
                  case "EXAM2":
                      course.Info.Exam2 = exam;
                      break;
                  case "EXAM3":
                      course.Info.Exam3 = exam;
                      break;
                  default:
                      throw new Error();
              }
          }
          else if (header("GAUGEINCR"))
          {
              switch (item.Value)
              {
                  case "NORMAL":
                      course.Info.GaugeIncrease = Gauges.Normal;
                      break;
                  case "FLOOR":
                      course.Info.GaugeIncrease = Gauges.Floor;
                      break;
                  case "ROUND":
                      course.Info.GaugeIncrease = Gauges.Round;
                      break;
                  case "NOTFIX":
                      course.Info.GaugeIncrease = Gauges.NotFix;
                      break;
                  case "CEILING":
                      course.Info.GaugeIncrease = Gauges.Ceiling;
                      break;
                  default:
                      course.Info.GaugeIncrease = Gauges.Normal;
                      break;
              }
          }
          else if (header("TOTAL"))
          {
              if (result=parseFloat(item.Value))
              {
                  course.Info.Total = result;
              }
          }
          else if (header("HIDDENBRANCH"))
          {
              if (!!item.Value)
              {
                  course.Info.HiddenBranch = true;
              }
              else
              {
                  course.Info.HiddenBranch = false;
              }
           }
          })
        })
        this.chart.Courses.forEach (function(course: Course){
          function parseTJA(list: Chip[],measures: string[])
          {
              var nowTime = (parentthis.chart.Info.Offset * 1000 * 1000) * -1;
              var nowScroll = 1.0;
              var nowBPM = parentthis.chart.Info.BPM;
              var gogoTime = false;
              var branching = false;
              var nowBranch = Branches.Normal;
              var nowMeasure = new Measure(4, 4);
              var measureCount = 0;
              var branchBeforeMeasureCount = 0;
              var branchBeforeTime = 0;
              var branchCount = 0;
              var branchAfterMeasure = 0;
              var balloonIndex = 0;
              var rollBegin:null|Chip = null;

              var bgm = new Chip();
              bgm.ChipType = Chips.BGMStart;
              bgm.Time = 0;
              list.push(bgm);
              measures.forEach (function(measure){
                var nowMeasureNotes = 0;
                var measureAdded = false;
                // まずはその小節にある音符数(空白含む)を調べる
                measure.split(/\n|\r|\n\r/).filter(a=>!(a=="")).forEach(function(line){
                    if (!line.startsWith("#"))
                    {
                        nowMeasureNotes += line.length;
                    }
                })


                  // 実際にListにブチ込んでいく
                measure.split(/\n|\r|\n\r/).filter(a=>!(a=="")).forEach(function(line){
                    // 小節開始時の一つの音符あたりの時間
                    // わざわざ文字の度再計算させてるけど仕方ないな！
                    var timePerNotes = (nowMeasure.GetRate() / nowBPM / nowMeasureNotes * 1000 * 1000.0);


                    if (!line.startsWith("#"))
                    {
                        if (!measureAdded)
                        {
                            //小節線
                            var measureChip = new Chip();
                            measureChip.ChipType = Chips.Measure;
                            measureChip.IsHitted = false;
                            measureChip.IsGoGoTime = gogoTime;
                            measureChip.CanShow = true;
                            measureChip.Scroll = nowScroll;
                            measureChip.Branch = nowBranch;
                            measureChip.Branching = branching;
                            measureChip.Time = nowTime;
                            measureChip.Scroll = nowScroll;
                            measureChip.BPM = nowBPM;
                            measureChip.MeasureCount = measureCount;
                            measureChip.Measure = nowMeasure;
                            // Listへ
                            list.push(measureChip);
                            measureAdded = true;
                        }
                        // 音符
                        line.split("").forEach(function(note){
                            var chip = new Chip();
                            chip.ChipType = Chips.Note;
                            chip.NoteType = NotesConverter.GetNotesFromChar(note);
                            chip.IsHitted = false;
                            chip.IsGoGoTime = gogoTime;
                            chip.CanShow = true;
                            chip.Scroll = nowScroll;
                            chip.Branch = nowBranch;
                            chip.Branching = branching;
                            chip.Time = nowTime;
                            chip.Scroll = nowScroll;
                            chip.BPM = nowBPM;
                            chip.MeasureCount = measureCount;
                            chip.Measure = nowMeasure;

                            if (chip.NoteType == Notes.Balloon)
                            {
                                // ふうせん連打のノルマ
                                chip.RollCount = course.Info.Balloon[balloonIndex];
                                balloonIndex++;
                            }

                            if (chip.NoteType == Notes.Balloon || chip.NoteType == Notes.RollStart || chip.NoteType == Notes.ROLLStart)
                            {
                                // 連打
                                // 始点を記憶しておく
                                rollBegin = chip;
                            }

                            if (chip.NoteType == Notes.RollEnd)
                            {
                                // 連打終端
                                if (rollBegin != null)
                                {
                                    rollBegin.RollEnd = chip;
                                }
                                rollBegin = null;
                            }

                            // ひとつ進める
                            nowTime += timePerNotes;

                            // Listへ
                            list.push(chip);
                        })
                    }
                    else
                    {
                        // 命令
                        function command(name: string)
                        {
                            return line.trim().startsWith(name);
                        }

                        var chip = new Chip();
                        chip.IsHitted = false;
                        chip.CanShow = false;

                        var trimed = line.trim();

                        if (command("#MEASURE"))
                        {
                            var param = trimed.substring("#MEASURE".length).trim();
                            var split = param.split("/");
                            // 再計算は自動的にされるから問題ない。
                            if (!!split[0])
                            {
                                nowMeasure.Part = parseFloat(split[0]);
                            }
                            if (!!split[1])
                            {
                                nowMeasure.Beat = parseFloat(split[1]);
                            }
                            chip.ChipType = Chips.MeasureChange;
                        }
                        else if (command("#BPMCHANGE"))
                        {
                            var param = trimed.substring("#BPMCHANGE".length).trim();
                            if (!!param)
                            {
                                nowBPM = parseFloat(param);
                            }
                            chip.ChipType = Chips.BPMChange;
                        }
                        else if (command("#DELAY"))
                        {
                            var param = trimed.substring("#DELAY".length).trim();
                            var delay = 0;
                            if (!!param)
                            {
                                delay = parseInt((parseFloat(param) * 1000 * 1000.0).toString());
                            }
                            nowTime += delay;
                        }
                        else if (command("#SCROLL"))
                        {
                            var param = trimed.substring("#SCROLL".length).trim();
                            if (!!param)
                            {
                                nowScroll = parseFloat(param);
                            }
                            chip.ChipType = Chips.ScrollChange;
                        }
                        else if (command("#GOGOSTART"))
                        {
                            gogoTime = true;
                            chip.ChipType = Chips.GoGoStart;
                        }
                        else if (command("#GOGOEND"))
                        {
                            gogoTime = false;
                            chip.ChipType = Chips.GoGoEnd;
                        }
                        else if (command("#SECTION"))
                        {
                            // シミュレータ側で実装するのでここでは特に何も無い。
                            chip.ChipType = Chips.Section;
                        }
                        else if (command("#BRANCHSTART"))
                        {
                            // #BRANCHSTART <type>,expert,master
                            chip.ChipType = Chips.BranchStart;
                            branching = true;

                            branchBeforeMeasureCount = measureCount;
                            branchBeforeTime = nowTime;
                            branchCount = 0;

                            // 1小節前に分岐するフックを入れる。
                            var beforeMeasure = parentthis.GetBeforeMeasureFromList(list, list.length);
                            var beforeMeasureChip = new Chip();
                            beforeMeasureChip.ChipType = Chips.Branching;
                            beforeMeasureChip.BPM = list[beforeMeasure].BPM;
                            beforeMeasureChip.Scroll = list[beforeMeasure].Scroll;
                            beforeMeasureChip.Time = list[beforeMeasure].Time;
                            beforeMeasureChip.IsGoGoTime = list[beforeMeasure].IsGoGoTime;
                            list.splice(beforeMeasure, 0 , beforeMeasureChip);
                        }
                        else if (command("#BRANCHEND"))
                        {
                            // 時間を……元に戻すッ！！！
                            nowTime = branchBeforeTime;
                            measureCount = branchAfterMeasure;

                            chip.ChipType = Chips.BranchStart;
                            branching = false;
                        }
                        else if (command("#N") || command("#E") || command("#M"))
                        {
                            var type = trimed.substring(0, 2);
                            if (!!type)
                            {
                                // 時間を……元に戻すッ！！！
                                nowTime = branchBeforeTime;
                                branchCount++;
                                // 一番初めに書かれた譜面分岐の小節数を保持
                                if (branchCount == 2)
                                {
                                    branchAfterMeasure = measureCount;
                                }
                                measureCount = branchBeforeMeasureCount;
                                switch (type)
                                {
                                    case "#N":
                                        nowBranch = Branches.Normal;
                                        break;
                                    case "#E":
                                        nowBranch = Branches.Expert;
                                        break;
                                    case "#M":
                                        nowBranch = Branches.Master;
                                        break;
                                }
                            }
                        }
                        else if (command("#LEVELHOLD"))
                        {
                            // シミュレータ側で実装するのでここでは特に何も無い。
                            chip.ChipType = Chips.LevelHold;
                        }

                        // 共通
                        chip.IsGoGoTime = gogoTime;
                        chip.Scroll = nowScroll;
                        chip.BPM = nowBPM;
                        chip.Branch = nowBranch;
                        chip.Branching = branching;
                        chip.Time = nowTime;
                        chip.MeasureCount = measureCount;

                        list.push(chip);
                    }
                    measureCount++;
                })
              })
          }
          parseTJA(course.Chip.Common, course.Measure.Common);
          SENoteGenerator.GenerateSENotes(course.Chip.Common);
          parseTJA(course.Chip.Player1, course.Measure.Player1);
          SENoteGenerator.GenerateSENotes(course.Chip.Player1);
          parseTJA(course.Chip.Player2, course.Measure.Player2);
          SENoteGenerator.GenerateSENotes(course.Chip.Player2);
      });
    };
  };

  GetHeaderFromString(str: string){
    var headers = new Array();
    for (var item in str.split(/\n|\r|\n\r/))
    {
        var line = item.trim();
        var split = line.split(":");
        if (split.length >= 2)
        {
            // splitした結果、要素数が2以上ならヘッダーとして成立する。
            // タイトルなどに:が付く場合もあるので、ちゃんとjoinしてあげる
            headers.push(new Header(split[0], split.slice(1).join()));
        }
    }
    return headers;
  };

  SplitCourse(str: string){
    var split = str.split("\n|\r|\n\r");
    var splitHeader = "";
    var splitText = "";
    var remain = "";
    var side = "";
    for (var lines = 0; lines < split.length; lines++)
    {
      if (split[lines].trim().startsWith("#START"))
      {
        splitHeader = split.slice(lines).join("\n\r");
        // #ENDまでTakeしたい
        for (var endPoint = lines; endPoint < split.length; endPoint++)
        {
          if (split[endPoint].trim().startsWith("#END"))
          {
            // 抜き出したい部分は、linesからendPoint - linesまで。
            splitText = split.slice(lines,endPoint - lines).join("\n\r");
            if (endPoint < split.length)
            {
              // 残りは、endPointの次から最後まで。
              remain = split.slice(endPoint + 1).join("\n\r");
            }
            side = split[lines].trim().substring("#START".length).trim();
            break;
          }
        }
        break;
      }
    }
    return [splitHeader, splitText, remain, side];
  };

  /**
   * パース結果。 
   */

  /**
   * TJADotJSで扱う難易度はいくつあるのか。
   */
  get Total_Difficulty(){
    return Object.keys(Courses).length;  
  } 

  /**
   * TJADotNetで扱う譜面分岐数はいくつあるのか。
   */
  get Total_Branches(){
      return Object.keys(Branches).length;
  }

  /**
   * 改行コード
   */
  // NewLine=/\n|\r|\n\r/;

  /**
   * チップリストからインデックスの前にある小節を返します。
   * @param {Chip[]} list - チップリスト
   * @param {number} index - インデックス
   */
  GetBeforeMeasureFromList(list: Chip[],index: number)
  {
      for (var i = index; i > 0; i--)
      {
          if (list[i].ChipType == Chips.Measure)
          {
              return i;
          }
      }
      return 0;
  }
}