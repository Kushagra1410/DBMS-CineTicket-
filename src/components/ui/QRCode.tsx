import { useEffect, useRef } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

export default function QRCode({ 
  value, 
  size = 128, 
  backgroundColor = '#FFFFFF', 
  foregroundColor = '#000000' 
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Mock QR Code implementation since we don't have an actual QR library
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size, size);
    
    // Draw a fake QR code pattern
    ctx.fillStyle = foregroundColor;
    
    // Draw positioning squares
    const moduleSize = Math.floor(size / 30);
    const margin = moduleSize * 2;
    
    // Draw position detection patterns
    const drawPositionSquare = (x: number, y: number, size: number) => {
      const outerSize = size * 7;
      const innerSize = size * 5;
      const innerOffset = size;
      
      // Outer square
      ctx.fillRect(x, y, outerSize, outerSize);
      
      // Inner white square
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(x + innerOffset, y + innerOffset, innerSize, innerSize);
      
      // Inner black square
      ctx.fillStyle = foregroundColor;
      ctx.fillRect(x + innerOffset * 2, y + innerOffset * 2, innerSize - innerOffset * 2, innerSize - innerOffset * 2);
      
      ctx.fillStyle = foregroundColor;
    };
    
    // Top-left position square
    drawPositionSquare(margin, margin, moduleSize);
    
    // Top-right position square
    drawPositionSquare(size - margin - moduleSize * 7, margin, moduleSize);
    
    // Bottom-left position square
    drawPositionSquare(margin, size - margin - moduleSize * 7, moduleSize);
    
    // Generate random modules for the fake QR code
    const seed = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (max: number) => (seed * (max + 1)) % max;
    
    for (let y = 0; y < size; y += moduleSize) {
      for (let x = 0; x < size; x += moduleSize) {
        // Skip position detection patterns areas
        const isTopLeft = x < margin + moduleSize * 8 && y < margin + moduleSize * 8;
        const isTopRight = x > size - margin - moduleSize * 8 && y < margin + moduleSize * 8;
        const isBottomLeft = x < margin + moduleSize * 8 && y > size - margin - moduleSize * 8;
        
        if (isTopLeft || isTopRight || isBottomLeft) continue;
        
        // Random pattern based on input value
        if (Math.random() < 0.4) {
          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }
  }, [value, size, backgroundColor, foregroundColor]);

  return (
    <div className="inline-flex items-center justify-center bg-white p-3 rounded-lg">
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
}