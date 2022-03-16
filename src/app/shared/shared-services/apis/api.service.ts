import { UserModel } from './../../../core/models/user-dashboard.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public userNameSub$ = new Subject<UserModel>();
  public toggleHF = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  postUser(data: UserModel) {
    return this.http.post<UserModel>('http://localhost:3000/posts', data);
  }

  getUser() {
    return this.http.get<UserModel>('http://localhost:3000/posts');
  }

  updateUser(data: UserModel, id: number) {
    return this.http.put<UserModel>('http://localhost:3000/posts/' + id, data);
  }

  deleteUser(id: number) {
    return this.http.delete<UserModel>('http://localhost:3000/posts/' + id);
  }
}

// .pipe(
//   map((res: any) => {
//     sessionStorage.setItem(
//             'loggedUserName',
//             JSON.stringify(res.firstName)
//           );
//           this.api.userNameSub$.next(res);
//   })
// );
