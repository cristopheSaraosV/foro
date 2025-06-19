import { Component, signal, ViewChild, ElementRef, effect, Input, Signal, input } from '@angular/core';
import Prism from 'prismjs';

export interface PostContent {
  titulo: string;
  subtitulo: string;
  textoHtml: string;
  haveCode: boolean
  codigo: string;
  fecha: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  copyBtnText = signal('Copiar');

  post = input.required<PostContent>()
  @ViewChild('codeRef', { static: false }) codeRef?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      if (this.codeRef?.nativeElement) {
        Prism.highlightElement(this.codeRef.nativeElement);
      }
    });
  }

  copiarCodigo() {
    navigator.clipboard.writeText(this.post().codigo);
    this.copyBtnText.set('¡Copiado!');
    setTimeout(() => this.copyBtnText.set('Copiar'), 2000);
  }
}

