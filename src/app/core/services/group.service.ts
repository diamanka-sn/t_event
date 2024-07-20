import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(group: any) {
    return this.http.post(`${SERVER_URL}/api/groups`, group);
  }

  findUserGroups(userId: number) {
    return this.http.get(`${SERVER_URL}/api/groups/${userId}`);
  }
  findChatGroup(senderId: number,receiverId: number) {
    return this.http.get(`${SERVER_URL}/api/groups/${senderId}/${receiverId}`);
  }
}
