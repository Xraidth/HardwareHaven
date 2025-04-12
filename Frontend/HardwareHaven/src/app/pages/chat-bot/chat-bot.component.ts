import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent implements OnInit {
 constructor(private router: Router){}
  ngOnInit(): void {
 this.initialChat();
  }
  public currentTime: Date  = new Date();
  userInput: string = '';
chat: string[] = [];
typingMessage = "Escribiendo";
typingInterval: any;

sendMessage(){
  this.currentTime = new Date();
  this.chat.push(this.userInput);
  this.userInput = '';
  this.respondBot()

}

respondBot(){

    this.chat.push(this.typingMessage + "...");
    let dots = 0;
    this.typingInterval = setInterval(() => {

      dots = (dots + 1) % 4;
      this.chat[this.chat.length - 1] = this.typingMessage + ".".repeat(dots);
    }, 500);

  setTimeout(() => {
    clearInterval(this.typingInterval);
    this.chat.pop();
    this.chat.push("Por el momento, nuestros servidores están fuera de servicio. No podemos ayudarte en este momento. Por favor, contactá a tu proveedor");

  }, 1500);
}
closeChat() {
  this.chat = []
  this.initialChat();
}
initialChat(){
  this.chat.push("Hola, ¿cómo puedo ayudarte hoy?");
}

gotoHome(){
  this.router.navigate(['home']);
}

}
