import { Component, OnInit } from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../core/services/auth.service";
import {ChatService} from "../../../../core/services/chat.service";
import {GroupService} from "../../../../core/services/group.service";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  messages: { content: string, senderId: number, receiverId: number }[] = [];
  userInfo: any;
  groupInfo: any;
  messageInfo: any;
  receiverId!: number ;
  activeConversationsCount: number = 0;
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService,
              private chatService: ChatService,
              private groupService: GroupService) {

  }

  ngOnInit() {
    this.authService.userInfo$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });

    this.chatService.receiveMessages().subscribe((data) => {
      this.messageInfo.push(data);
      console.log(data)
    });


    this.getUserRelationChip();

  }



  sendMessage(newMessage: string = '') {
    if (newMessage.trim() !== '') {
      const message = {
        content: newMessage,
        senderId: this.userInfo.id,
        receiverId: this.receiverId,
        sentAt: new Date()
      };
      this.chatService.createMessage(message).subscribe((data: any) => {
        console.log(data)
          this.chatService.sendMessage(message);
        newMessage = '';
      },(error) => {
        console.error(error);
      }
      );

    }
  }


  getMessages(receiverId: number ) {
      this.receiverId = receiverId;
    console.log(this.receiverId)
      this.chatService.getMessages(this.userInfo.id,receiverId).subscribe((data: any) => {
        this.messageInfo = data;
        console.log(this.messageInfo)
      });
  }

  getUserRelationChip(){
    this.groupService.findUserGroups(this.userInfo.id).subscribe((data: any) => {
      this.groupInfo = data;
      this.activeConversationsCount = this.groupInfo.length;
    })
  }


}
