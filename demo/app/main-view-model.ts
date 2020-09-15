import { Observable } from '@nativescript/core';
import {
  AndroidSensorListener,
  AndroidSensors,
  SensorDelay,
} from 'nativescript-android-sensors';

export class HelloWorldModel extends Observable {
  public message: string;
  private androidSensors: AndroidSensors;

  constructor() {
    super();

    this.androidSensors = new AndroidSensors();

    const listener = new AndroidSensorListener({
      onSensorChanged: (result) => {
        console.log('SensorChangedEvent', result);
        // result is being returned as a string currently
        const parsedData = JSON.parse(result);
        const rawSensorData = parsedData.data;
        this.set('sensorData', rawSensorData.x);
        // const sensor = parsedData.sensor;
        // const time = parsedData.time;
      },
      onAccuracyChanged: (sensor, accuracy) => {
        console.log('Accuracy Changed', sensor, accuracy);
      },
    });

    this.androidSensors.setListener(listener);
  }

  public startLinearAcceleration() {
    // starting the acceleration sensor
    const acceleration = this.androidSensors.startSensor(
      android.hardware.Sensor.TYPE_LINEAR_ACCELERATION,
      SensorDelay.NORMAL,
      8000000
    );
    // checking if it supports FIFO
    const x = (acceleration as any).getFifoMaxEventCount();
    this.set('sensorMaxFifoEventCount', `Max Fifo Event Count: ${x}`);

    // after 8 seconds we are stopping the acceleration sensor
    setTimeout(() => {
      this.androidSensors.stopSensor(acceleration);
      this.set('sensorData', 'Sensor has stopped!');
    }, 20000);
  }
}
