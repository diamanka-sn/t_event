import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  dropdownOpen2 = false;
  private unsubscribe$ = new Subject<void>();
  userInfo: any;
  notifications: { title: string; time: Date }[] = [];

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.authService.userInfo$
      .subscribe((userInfo) => {
        this.userInfo = userInfo;

        if (userInfo) {
          this.chatService.receiveNotifications(userInfo.id).subscribe((notification) => {
            this.notifications.push({
              title: notification.message,
              time: new Date(notification.timestamp)
            });
            this.chatService.addUnreadNotification(notification);
          });

          const unreadNotifications = this.chatService.getUnreadNotifications();
          unreadNotifications.forEach(notification => {
            this.notifications.push({
              title: notification.message,
              time: new Date(notification.timestamp)
            });
          });
        }
      });
  }
  openNotification(notification: any) {
    this.chatService.clearUnreadNotifications();
  }

  toggleDropdown2(): void {
    this.dropdownOpen2 = !this.dropdownOpen2;
  }
}
