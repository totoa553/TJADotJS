import { Chip } from "../Chip"
import { Notes } from "./Notes"

export enum SENotes{
    /**
      * ドン
      */
    Don,
    /**
      * ド
      */
    Do,
    /**
      * コ
      */
    Ko,
    /**
      * カッ
      */
    Katsu,
    /**
      * カ
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
      * 連打
      */
    RollStart,
    /**
      * 連打(大)
      */
    ROLLStart,
    /**
      * 連打中
      */
    Rolling,
    /**
      * 連打終了
      */
    RollEnd,
    /**
      * 風船
      */
    Balloon,
    /**
      * くすだま
      */
    Kusudama
}

export class SENoteGenerator{
  static GenerateSENotes(chips: Chip[]){
    for(var i=0;i<=chips.length;i++){
      if(chips[i].NoteType == Notes.Space){
        continue;
      }

      var nowChip = chips[i];
      var beforeChip = this.GetBeforeChip(i, chips);
      var afterChip = this.GetAfterChip(i, chips);

      //SENoteつけ始め
      switch(nowChip.NoteType)
      {
        case Notes.DON:
          nowChip.SENote = SENotes.DON;
          break;
        case Notes.KA:
          nowChip.SENote = SENotes.KA;
          break;
        case Notes.RollStart:
          nowChip.SENote = SENotes.RollStart;
          break;
        case Notes.ROLLStart:
          nowChip.SENote = SENotes.ROLLStart;
          break;
        case Notes.Balloon:
          nowChip.SENote = SENotes.Balloon;
          break;
        case Notes.Kusudama:
          nowChip.SENote = SENotes.Kusudama;
          break;
        default:
          nowChip.SENote = this.GetSENoteFromDuration(i, chips);
          break;
      }
    }
  }
  static GetBeforeChip(i: number, chips:Chip[]){
    if(i > 0){
      for(var index = i;index > 0; index--){
        if(chips[index].NoteType != Notes.Space){
          return chips[index]
        }
      }
    }
    return null
  }
  static GetAfterChip(i: number, chips:Chip[]){
    if(i < chips.length-1){
      for(var index = i;index < chips.length; index++){
        if(chips[index].NoteType != Notes.Space){
          return chips[index]
        }
      }
    }
    return null
  }
  static GetSENoteFromDuration(i: number,chips:Chip[]){
    var nowChip = chips[i];
    var beforeChip = this.GetBeforeChip(i, chips);
    var afterChip = this.GetAfterChip(i, chips);

    var nowTime = nowChip.Time;
    var diffBefore:number = nowTime - beforeChip.Time;
    var diffAfter:number = afterChip.Time - nowTime;

    var time12 = (nowChip.Measure.GetRate() / nowChip.BPM / 12 * 1000 * 1000.0);

    if (diffBefore > time12 && diffAfter > time12)
    {
      // 3連符の間隔より大きく離れてる …… ドン・カッ
      if (nowChip.NoteType == Notes.Don) return SENotes.Don;
      if (nowChip.NoteType == Notes.Ka) return SENotes.Katsu;
    }

    if (diffBefore <= time12 && diffAfter <= time12)
    {
      // 3連符の間隔未満離れてる …… ド・カ
      if (nowChip.NoteType == Notes.Don) return SENotes.Do;
      if (nowChip.NoteType == Notes.Ka) return SENotes.Ka;
    }
    return nowChip.SENote;
  }
}