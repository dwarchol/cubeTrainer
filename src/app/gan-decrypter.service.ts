import { Injectable } from '@angular/core';
import { ModeOfOperation } from 'aes-js'
@Injectable({
  providedIn: 'root'
})

export class GanDecrypterService {
  KEY = [0x01, 0x02, 0x42, 0x28, 0x31, 0x91, 0x16, 0x07, 0x20, 0x05, 0x18, 0x54, 0x42, 0x11, 0x12, 0x53];
  IV = [0x11, 0x03, 0x32, 0x28, 0x21, 0x01, 0x76, 0x27, 0x20, 0x95, 0x78, 0x14, 0x32, 0x12, 0x02, 0x43];
  MAC_ADDRESS: number[] = []; //TO DO IMPORTANT
  constructor() {
    this.setMacAddress([0xAB, 0x12, 0x34, 0x5C, 0xD3, 0x7C])
  }

  setMacAddress(address: number[]){
    this.MAC_ADDRESS = address;
    for (let i = 0; i < 6; i++) {
      this.KEY[i] = (this.KEY[i] + this.MAC_ADDRESS[5 - i]) % 0xFF;
      this.IV[i] = (this.IV[i] + this.MAC_ADDRESS[5 - i]) % 0xFF;
    }
  }

  private decryptChunk(data: Uint8Array, offset: number) {
    var cipher = new ModeOfOperation.cbc(this.KEY, this.IV);
    var chunk = cipher.decrypt(data.subarray(offset, offset + 16));
    data.set(chunk, offset);
  }

  decryptMovesData(data: Uint8Array) {
    var msg = new Uint8Array(data);
    if (data.length < 16)
      throw Error('Data must be at least 16 bytes long');
    this.decryptChunk(msg, msg.length - 16);
    this.decryptChunk(msg, 0);
    return msg;
  }

  private encryptChunk(buffer: Uint8Array, offset: number): void {
    var cipher = new ModeOfOperation.cbc(this.KEY, this.IV);
    var chunk = cipher.encrypt(buffer.subarray(offset, offset + 16));
    buffer.set(chunk, offset);
  }

  encrypt(data: Uint8Array): Uint8Array {
    if (data.length < 16)
      throw Error('Data must be at least 16 bytes long');
    var res = new Uint8Array(data);
    // encrypt 16-byte chunk aligned to message start
    this.encryptChunk(res, 0);
    // encrypt 16-byte chunk aligned to message end
    if (res.length > 16) {
      this.encryptChunk(res, res.length - 16);
    }
    return res;
  }

  getBitWord(bits: string, startBit: number, bitLength: number, littleEndian = false): number {
    if (bitLength <= 8) {
      return parseInt(bits.slice(startBit, startBit + bitLength), 2);
    } else if (bitLength == 16 || bitLength == 32) {
      let buf = new Uint8Array(bitLength / 8);
      for (let i = 0; i < buf.length; i++) {
        buf[i] = parseInt(bits.slice(8 * i + startBit, 8 * i + startBit + 8), 2);
      }
      let dv = new DataView(buf.buffer);
      return bitLength == 16 ? dv.getUint16(0, littleEndian) : dv.getUint32(0, littleEndian);
    } else {
      throw new Error('Unsupproted bit word length');
    }
  }

}
