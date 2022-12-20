import {Component, OnInit} from '@angular/core';
import {GlobalVariables} from "../../globals";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-training-completed',
  templateUrl: './training-completed.page.html',
  styleUrls: ['./training-completed.page.scss'],
})
export class TrainingCompletedPage implements OnInit {

  uuid: String
  data: any

  scoreToday: number
  scoreYesterday: number
  scoreEval: String

  constructor(private http: HttpClient, private storage: Storage) {
  }

  async ngOnInit() {
    await this.storage.create();
    this.uuid = await this.storage.get('uuid');

    this.loadData();
  }

  loadData() {
    // Get Data
    const formData: any = new FormData();
    formData.append("user", this.uuid);

    this.http.post(`${GlobalVariables.BASE_API_URL}getResults.php?key=${GlobalVariables.API_KEY}`, formData).subscribe(result => {
      console.log(result)
      // @ts-ignore
      this.data = result.data

      let scoresToday = [];

      for (let i = 0; i < 15; i++) {
        scoresToday.push(this.getScore(this.data[i].targetVal, this.data[i].selectedVal))
      }

      this.scoreToday = median(scoresToday)

      if (this.data.length > 15) {
        let scoresYesterday = [];

        for (let i = 15; i < 30; i++) {
          scoresYesterday.push(this.getScore(this.data[i].targetVal, this.data[i].selectedVal))
        }

        this.scoreYesterday = median(scoresYesterday)
        console.log(this.scoreYesterday)
        if (this.scoreToday <= this.scoreYesterday) {
          this.scoreEval = `Das ist eine Verbesserung um ${(this.scoreYesterday - this.scoreToday).toFixed(1)} Cents`
        } else {
          this.scoreEval = `Das ist eine Verschlechterung um ${(this.scoreToday - this.scoreYesterday).toFixed(1)} Cents`
        }
      }
    })
  }

  getScore(targetVal: number, selectedVal: number) {
    return Math.abs(this.calcCents(targetVal, targetVal + Math.abs(targetVal - selectedVal))).toFixed(1)
  }

  calcCents(f1: number, f2: number) {
    return 1200 * Math.log2(f2 / f1);
  }

}

//https://stackoverflow.com/a/53660837/4774591
function median(numbers): number {
  // @ts-ignore
  const sorted = Array.from(numbers).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    // @ts-ignore
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return <number>sorted[middle];
}

