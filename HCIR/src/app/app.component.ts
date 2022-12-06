import {Component} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: Storage) {
  }

  async ngOnInit() {
    await this.storage.create();
    let uuid = await this.storage.get('uuid');
    if (uuid === null) {
      console.log('Generating new UUID')
      uuid = self.crypto.randomUUID();
      await this.storage.set('uuid', uuid);
    }
    console.log(uuid)
  }
}
