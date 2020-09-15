import { Utils } from '@nativescript/core';

declare const com: any; // bypass not having typings for xsensor lib

export class AndroidSensors {
  private XSensorClass;

  constructor(liteData: boolean = false) {
    this.XSensorClass = new com.github.bradmartin.xsensor.XSensors(
      Utils.android.getApplicationContext(),
      liteData
    );
  }

  setListener(listener) {
    if (listener) {
      this.XSensorClass.setListener(listener);
    }
  }

  startSensor(
    sensor: number,
    delay: number,
    maxReportLatency?: number
  ): android.hardware.Sensor {
    if (maxReportLatency) {
      return this.XSensorClass.startSensorWithReportLatency(
        sensor,
        delay,
        maxReportLatency
      );
    } else {
      return this.XSensorClass.startSensor(sensor, delay);
    }
  }

  stopSensor(sensor: android.hardware.Sensor) {
    if (sensor) {
      this.XSensorClass.stopSensor(sensor);
    }
  }

  getDeviceSensors(): android.hardware.Sensor[] {
    const sensorList = this.XSensorClass.getDeviceSensors();
    const result = [];
    // iterate the sensor List and put the sensors into a plain array to return
    for (let i = 0; i < sensorList.size(); i++) {
      const sensor = sensorList.get(i) as android.hardware.Sensor;
      result.push(sensor);
    }
    return result;
  }

  flush(): boolean {
    return this.XSensorClass.flush();
  }
}

// simple alias for the XSensorListener interface
export const AndroidSensorListener =
  com.github.bradmartin.xsensor.XSensorListener;

export enum SensorDelay {
  'FASTEST' = android.hardware.SensorManager.SENSOR_DELAY_FASTEST,
  'GAME' = android.hardware.SensorManager.SENSOR_DELAY_GAME,
  'UI' = android.hardware.SensorManager.SENSOR_DELAY_UI,
  'NORMAL' = android.hardware.SensorManager.SENSOR_DELAY_NORMAL,
}
