import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage-angular";
import {GlobalVariables} from "../globals";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  uuid: String
  data: any

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
    })
  }

  handleReload($event: any) {
    this.loadData();
    $event.target.complete();
  }

  getScore(targetVal: number, selectedVal: number) {
    return Math.abs(this.calcCents(targetVal, targetVal + Math.abs(targetVal - selectedVal))).toFixed(1)
  }

  calcCents(f1: number, f2: number) {
    return 1200 * Math.log2(f2 / f1);
  }

  getDate(timestamp:number){
    return new Date(timestamp*1000).toLocaleString()
  }
}


