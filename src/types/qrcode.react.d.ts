
declare module 'qrcode.react' {
  import * as React from 'react';

  interface ImageSettings {
    src: string;
    x?: number;
    y?: number;
    height?: number;
    width?: number;
    excavate?: boolean;
  }

  interface QRCodeCanvasProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    imageSettings?: ImageSettings;
  }

  export class QRCodeCanvas extends React.Component<QRCodeCanvasProps> {}

  // Se você também usar QRCodeSVG, poderia adicionar uma definição semelhante:
  // interface QRCodeSVGProps extends QRCodeCanvasProps {
  //   title?: string;
  // }
  // export class QRCodeSVG extends React.Component<QRCodeSVGProps> {}
}
