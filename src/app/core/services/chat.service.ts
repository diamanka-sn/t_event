import {Injectable, OnInit} from '@angular/core';
import {io} from "socket.io-client";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const SERVER_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ChatService
{
  private socket: any;
  messages: string[] = [];

  constructor(private http: HttpClient) {
    this.socket = io(SERVER_URL);
  }

  sendMessage(message: any) {
    this.socket.emit('send-message', message);
  }

  receiveMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('new-message', (data:any) => {
        observer.next(data);
      });
    });
  }
  receiveNotifications(userId: number): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(`notify-user-${userId}`, (data: any) => {
        observer.next(data);
      });
    });
  }

  createMessage(message: any) {
    return this.http.post(`${SERVER_URL}/api/messages`, message);
  }

  getMessages(senderId: number,receiverId: number) {
    return this.http.get(`${SERVER_URL}/api/messages/${senderId}/${receiverId}`);
  }
  addUnreadNotification(notification: any) {
    const unreadNotifications = this.getUnreadNotifications();
    unreadNotifications.push(notification);
    localStorage.setItem('unreadNotifications', JSON.stringify(unreadNotifications));
  }

  getUnreadNotifications(): any[] {
    const unreadNotifications = localStorage.getItem('unreadNotifications');
    return unreadNotifications ? JSON.parse(unreadNotifications) : [];
  }

  clearUnreadNotifications() {
    localStorage.removeItem('unreadNotifications');
  }
}
