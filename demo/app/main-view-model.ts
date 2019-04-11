import { Observable } from 'tns-core-modules/data/observable';
import {
  AndroidSensors,
  AndroidSensorListener,
  SensorDelay
} from 'nativescript-android-sensors';

export class HelloWorldModel extends Observable {
  public message: string;
  private androidSensors: AndroidSensors;

  constructor() {
    super();

    this.androidSensors = new AndroidSensors();

    const listener = new AndroidSensorListener({
      onSensorChanged: result => {
        console.log('SensorChangedEvent', result);
        // result is being returned as a string currently
        // const parsedData = JSON.parse(result);
        // const rawSensorData = parsedData.data;
        // const sensor = parsedData.sensor;
        // const time = parsedData.time;
      },
      onAccuracyChanged: (sensor, accuracy) => {
        console.log('Accuracy Changed', sensor, accuracy);
      }
    });

    this.androidSensors.setListener(listener);

    // starting the acceleration sensor
    const acceleration = this.androidSensors.startSensor(
      android.hardware.Sensor.TYPE_LINEAR_ACCELERATION,
      SensorDelay.NORMAL
    );

    // after 5 seconds we are stopping the acceleration sensor
    setTimeout(() => {
      this.androidSensors.stopSensor(acceleration);
    }, 5000);
  }
}
