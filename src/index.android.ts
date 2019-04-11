import { ad as androidUtils } from 'tns-core-modules/utils/utils';

declare const com: any; // bypass not having typings for xsensor lib

export class AndroidSensors {
  private XSensorClass;
  constructor() {
    this.XSensorClass = new com.github.bradmartin.xsensor.XSensors(
      androidUtils.getApplicationContext()
    );
  }

  setListener(listener) {
    if (listener) {
      this.XSensorClass.setListener(listener);
    }
  }

  startSensor(sensor: number, delay: number): android.hardware.Sensor {
    return this.XSensorClass.startSensor(sensor, delay);
  }

  stopSensor(sensor: android.hardware.Sensor) {
    if (sensor) {
      this.XSensorClass.stopSensor(sensor);
    }
  }
}

// simple alias for the XSensorListener interface
export const AndroidSensorListener =
  com.github.bradmartin.xsensor.XSensorListener;

export enum SensorDelay {
  'FASTEST' = android.hardware.SensorManager.SENSOR_DELAY_FASTEST,
  'GAME' = android.hardware.SensorManager.SENSOR_DELAY_GAME,
  'UI' = android.hardware.SensorManager.SENSOR_DELAY_UI,
  'NORMAL' = android.hardware.SensorManager.SENSOR_DELAY_NORMAL
}
