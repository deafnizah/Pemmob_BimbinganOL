import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomemhsPage } from './homemhs.page';

describe('HomemhsPage', () => {
  let component: HomemhsPage;
  let fixture: ComponentFixture<HomemhsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomemhsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
