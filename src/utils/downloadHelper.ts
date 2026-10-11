/**
 * High-compatibility image download utility for mobile devices (iOS Safari, Android Chrome, Samsung Internet) and Desktop browsers.
 */

export async function downloadImageFile(imageUrl: string, filename: string): Promise<boolean> {
  try {
    // 1. Fetch as blob to bypass iframe cross-origin / relative file handling issues on mobile
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Ensure MIME type is standard image/jpeg or image/png so mobile OS and gallery viewers recognize it
    const mimeType = imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const finalBlob = new Blob([blob], { type: mimeType });
    const blobUrl = URL.createObjectURL(finalBlob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 15000);

    return true;
  } catch (err) {
    console.warn('Direct fetch failed, falling back to canvas draw:', err);
    // 2. Offscreen Canvas fallback to guarantee valid JPEG bytes
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width || 800;
          canvas.height = img.naturalHeight || img.height || 600;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(false);
            return;
          }

          // Draw white background then image
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          canvas.toBlob(
            (canvasBlob) => {
              if (!canvasBlob) {
                // Last fallback: data URL
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                resolve(true);
                return;
              }

              const blobUrl = URL.createObjectURL(canvasBlob);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = filename;
              document.body.appendChild(link);
              link.click();
              setTimeout(() => {
                if (document.body.contains(link)) {
                  document.body.removeChild(link);
                }
                URL.revokeObjectURL(blobUrl);
              }, 15000);
              resolve(true);
            },
            'image/jpeg',
            0.95
          );
        } catch {
          resolve(false);
        }
      };
      img.onerror = () => resolve(false);
      img.src = imageUrl;
    });
  }
}

export function downloadCanvasToBlob(canvas: HTMLCanvasElement, filename: string): void {
  try {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }

        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
          URL.revokeObjectURL(blobUrl);
        }, 15000);
      },
      'image/png'
    );
  } catch (err) {
    console.warn('Canvas blob error, fallback to dataURL:', err);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
