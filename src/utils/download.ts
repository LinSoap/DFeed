export function downloadFile(data: Uint8Array, fileName: string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  
    console.log('File downloaded successfully');
  }
  