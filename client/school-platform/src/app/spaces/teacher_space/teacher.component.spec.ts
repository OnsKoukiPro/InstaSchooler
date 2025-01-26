import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeacherComponent } from './teacher.component';

describe('TeacherComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [TeacherComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TeacherComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'New'`, () => {
    const fixture = TestBed.createComponent(TeacherComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('New');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TeacherComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('New app is running!');
  });
});
