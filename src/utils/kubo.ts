import { KuboRPCClient } from "kubo-rpc-client";
import { CID } from 'multiformats/cid';

export function isValidCID(cidStr: string) {
  try {
    CID.parse(cidStr);
    return true;
  } catch (err) {
    return false;
  }
}


export async function catFileFromPath(path: string, kubo: KuboRPCClient) {
  const chunks = []; 
    for await (const chunk of kubo.cat(path)) {
    chunks.push(chunk); 
  }

  const fullData = new Uint8Array(chunks.reduce((acc, curr) => acc + curr.length, 0));
  let offset = 0;
  for (const chunk of chunks) {
    fullData.set(chunk, offset);
    offset += chunk.length;
  }

  return fullData;
}


export function Uint8ArrayToText(uint8Array: Uint8Array) {
  return new TextDecoder().decode(uint8Array);
}

export function TextToUint8Array(text:string) {
    const encoder = new TextEncoder();
    return encoder.encode(text);
}

export const validateUrl = (url: string) => {
  return /^(http|https):\/\/[^\s/$.?#].[^\s]*(:\d+)?$/.test(url); // 更新为支持http, 地址和端口的URL验证方法
};