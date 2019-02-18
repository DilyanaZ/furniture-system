import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedFurnitureComponent } from './searched-furniture.component';

describe('SearchedFurnitureComponent', () => {
  let component: SearchedFurnitureComponent;
  let fixture: ComponentFixture<SearchedFurnitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchedFurnitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchedFurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
