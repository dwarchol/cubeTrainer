/// <reference types="web-bluetooth" />

import { Injectable } from '@angular/core';
import {GanDecrypterService} from "./gan-decrypter.service";

@Injectable({
  providedIn: 'root'
})
export class CubeService {
  readonly GAN_GEN2_SERVICE = "6e400001-b5a3-f393-e0a9-e50e24dc4179";
  readonly GAN_GEN2_STATE_CHARACTERISTIC = "28be4a4a-cd67-11e9-a32f-2a2ae2dbcce4";
  readonly GAN_GEN2_COMMAND_CHARACTERISTIC = "28be4cb6-cd67-11e9-a32f-2a2ae2dbcce4";

  service: BluetoothRemoteGATTService[];
  isCubeConnected = false;
  lastSerial = -1;
  serial = 0;
  t2_function : (bits: string) => void;
  t4_function : (bits: string) => void;

  constructor( private ganDecrypterService: GanDecrypterService ) { this.setDefaultMethods()}

  async connect(){
    var device = await navigator.bluetooth.requestDevice({
      filters: [
        {namePrefix: "GAN"},
        {namePrefix: "gan"},
        {namePrefix: "Gan"}
      ],
      optionalServices: [this.GAN_GEN2_SERVICE, this.GAN_GEN2_COMMAND_CHARACTERISTIC, this.GAN_GEN2_STATE_CHARACTERISTIC]
    });
    var gatt = await device.gatt?.connect()!;
    this.service = await gatt.getPrimaryServices(this.GAN_GEN2_SERVICE);
    this.isCubeConnected = true;
    console.log(device.name + " is connected!!!");
    this.startTracking()
    this.getState()
  }
  defaultT2(bits: string){
    this.lastSerial = this.serial;
    console.log(this.lastSerial)
  }
  defaultT4(bits: string){
    this.lastSerial = this.serial;
    console.log(this.lastSerial)
  }
  setDefaultMethods(){
    this.t2_function = this.defaultT2;
    this.t4_function = this.defaultT4;
  }
  startTracking() {
    this.service[0].getCharacteristic(this.GAN_GEN2_COMMAND_CHARACTERISTIC).then(
      (characteristic) => {
        console.log("XXX")
        if (characteristic.properties.notify) {
          characteristic.addEventListener(
            "characteristicvaluechanged",
            async (event: any) => {

              var value = event.target.value;
              var data = [];
              for (var i = 0; i < 20; i++) {
                data.push(value.getUint8(i));
              }
              var decr = this.ganDecrypterService.decryptMovesData(new Uint8Array(data));
              var bits = Array.from(decr).map(byte => (byte + 0x100).toString(2).slice(1)).join('');

              var eventType = this.ganDecrypterService.getBitWord(bits, 0, 4);
              console.log(eventType)
              switch(eventType) {
                case 0x02: {
                  if(this.lastSerial!=-1){
                    this.serial = this.ganDecrypterService.getBitWord(bits, 4, 8);
                    this.t2_function(bits)
                  }
                  break;
                }
                case 0x04: {
                  this.serial = this.ganDecrypterService.getBitWord(bits, 4, 8);
                  this.t4_function(bits)
                  break;
                }
              }

            }
          );
        }
        characteristic.startNotifications();
      }
    );
  }
  setT2Function(fn: (bits: string) => void){
    this.t2_function = fn;
  }
  setT4Function(fn: (bits: string) => void){
    this.t4_function = fn;
  }
  public async getState(){
    var message = this.getStateMessage()
    var encryptedMessage = this.ganDecrypterService.encrypt(message);
    var chara = await this.service[0].getCharacteristic(this.GAN_GEN2_STATE_CHARACTERISTIC);
    // console.log(encryptedMessage);
    chara.writeValue(encryptedMessage);
    console.log((encryptedMessage))
  }
  getStateMessage(): Uint8Array {
    var msg: Uint8Array= new Uint8Array(20).fill(0);
    msg[0] = 0x04;
    return msg;
  }
}
