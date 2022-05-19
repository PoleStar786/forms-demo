import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

import { UserModel } from './../../../core/models/user-dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public userNameSub$ = new Subject<UserModel>();
  public toggleHF = new BehaviorSubject<boolean>(false);
  public toggleView$ = new BehaviorSubject<boolean>(false);
  public addCrew$ = new Subject<any>();
  public startTime$ = new Subject<string>();

  loggedInUser: string = localStorage.getItem('loggedInUser') || '{}';
  uData: UserModel[] = [];
  crewArr = [];
  data: UserModel;
  tempo: any;
  post = 'http://localhost:3000/posts';
  POST = 'http://localhost:3000/posts/';
  subUser = 'http://localhost:3000/subUsers';
  SUBUSER = 'http://localhost:3000/subUsers/';

  constructor(private http: HttpClient) {}

  postUser(data: UserModel) {
    return this.http.post<UserModel>(this.post, data);
  }

  getUser() {
    return this.http.get<UserModel>(this.post);
  }

  updateUser(data: UserModel, id: number) {
    return this.http.put<UserModel>(this.POST + id, data);
  }

  deleteUser(id: number) {
    return this.http.delete<UserModel>(this.POST + id);
  }

  // crew users
  postSubUser(data: UserModel) {
    return this.http.post<UserModel>(this.subUser, data);
  }

  getSubUser() {
    return this.http.get<UserModel>(this.subUser);
    // .pipe(
    //   map((res) => {
    //     this.data = res;
    //     this.crewArr = JSON.parse(this.loggedInUser).crew;

    //     this.crewArr.map((c) => {
    //       this.tempo = this.data.filter((v: UserModel) => {
    //         if (v.id === c) {
    //           this.uData.push(v);
    //         }
    //       });
    //     });
    //     return this.uData;
    //   })
    // );
  }

  updateSubUser(data: UserModel, id: number) {
    return this.http.put<UserModel>(this.SUBUSER + id, data);
  }

  deleteSubUser(id: number) {
    return this.http.delete<UserModel>(this.SUBUSER + id);
  }

  // add id of crew to array in current user
  postID(id: number, cID: number) {
    return this.http.put<UserModel>(this.POST + id, cID);
  }
}

// .pipe(
//   map((res: any) => {
//     localStorage.setItem(
//             'loggedUserName',
//             JSON.stringify(res.firstName)
//           );
//           this.api.userNameSub$.next(res);
//   })
// );

////////////////////////////////////////////////////////////////
// .pipe(
//   map((res) => {
//     this.data = res;
//     this.crewArr = JSON.parse(this.loggedInUser).crew;

//     this.crewArr.map((c) => {
//       this.tempo = this.data.filter((v: UserModel) => v.id === c);
//       // console.log(this.tempo);
//     });

//     // for (let crew of this.crewArr) {
//     //   this.tempo = this.data.filter((v: UserModel) => {
//     // if (v.id === crew) {
//     //   this.uData.push(v);
//     // }
//     //   });
//     //   console.log(this.uData);
//     // }

//     return this.data;
//   })
// );

// this.crewArr.forEach((ele: number) => {
//   console.log(ele);
// });
// this.tempo = this.data.some((v: UserModel) => {
//   if (v.id === ele) {
//     this.uData.push(v);
//   }
// });

// result.forEach((ele: any) => {
//   const crewArr = JSON.parse(this.loggedInUser).crew;
//   const tempo = crewArr.some((v: any) => {
//     return v === ele.id;
//   });
//   if (tempo) {
//     this.uData.push(ele);
//   }
// });

// console.log(result);

// result = this.uData

// return result;
