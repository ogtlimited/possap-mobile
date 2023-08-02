import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignTacticalSquadFormComponent } from './assign-tactical-squad-form.component';

describe('AssignTacticalSquadFormComponent', () => {
  let component: AssignTacticalSquadFormComponent;
  let fixture: ComponentFixture<AssignTacticalSquadFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTacticalSquadFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignTacticalSquadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
