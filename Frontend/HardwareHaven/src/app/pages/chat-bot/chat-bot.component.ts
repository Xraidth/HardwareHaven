import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenClassService } from '../../core/services/share/open-class.service';


@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {
  constructor(private router: Router, private openClassService: OpenClassService) {}

  public currentTime: Date = new Date();
  userInput: string = '';
  chat: string[] = [];
  typingMessage = "Escribiendo";
  typingInterval: any;

  ngOnInit(): void {
    this.initialChat();
  }

  sendMessage() {
    if (!this.userInput.trim()) return; // Evitar enviar mensajes vacíos

    this.currentTime = new Date();
    this.chat.push("Tú: " + this.userInput);
    const messageToSend = this.userInput;
    this.userInput = '';

    this.respondBot(messageToSend);
  }

  respondBot(userMessage: string) {
    this.chat.push(this.typingMessage + "...");
    let dots = 0;
    this.typingInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      this.chat[this.chat.length - 1] = this.typingMessage + ".".repeat(dots);
    }, 500);

    this.openClassService.chat({ message: userMessage }).subscribe({
      next: (res: any) => {
        clearInterval(this.typingInterval);
        this.chat.pop(); // Quitar mensaje "Escribiendo..."
        this.chat.push("Bot: " + (res.response || "No hay respuesta del bot."));
      },
      error: () => {
        clearInterval(this.typingInterval);
        this.chat.pop();
        this.chat.push("Bot: Por el momento, nuestros servidores están fuera de servicio. No podemos ayudarte en este momento. Por favor, contactá a tu proveedor");
      }
    });
  }

  closeChat() {
    this.chat = [];
    this.initialChat();
  }

  initialChat() {
    this.chat.push("Bot: Hola, ¿Cómo puedo ayudarte hoy?");
  }

  gotoHome() {
    this.router.navigate(['home']);
  }
}
