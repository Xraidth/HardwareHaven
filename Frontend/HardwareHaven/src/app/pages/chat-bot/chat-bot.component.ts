import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  public currentTime: Date  = new Date();
  userInput: string = '';
public chat:any[] = [];

sendMessage(){
  this.currentTime = new Date();
  this.chat.push(this.userInput);
  this.respondBot()
  this.userInput = '';
}

respondBot(){
  this.chat.push("Hola Mundo");
}
closeChat() {
  this.chat = []
}


}
