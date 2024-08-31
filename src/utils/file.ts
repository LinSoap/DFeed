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


export function readFileToString(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                resolve(result); 
            } else if (result instanceof ArrayBuffer) {
                const text = new TextDecoder().decode(result);
                resolve(text);
            } else {
                reject(new Error("Unexpected result type")); 
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}