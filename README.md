<a align="center" href="https://www.npmjs.com/package/nativescript-android-sensors">
    <h3 align="center">NativeScript-Android-Sensors</h3>
</a>
<h4 align="center">NativeScript plugin for using android device sensors that run on a background thread.</h4>

<p align="center">
 <a href="https://www.npmjs.com/package/nativescript-android-sensors">
        <img src="https://img.shields.io/npm/v/nativescript-android-sensors.svg" alt="npm">
    </a>
</p>

## Installation

NativeScript 7+:

```
ns plugin add nativescript-android-sensors
```

NativeScript version lower than 7:

```bash
tns plugin add nativescript-android-sensors@1.5.0
```

Android Sensors: https://developer.android.com/reference/android/hardware/Sensor.html

## Usage

```typescript
import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';

const sensors = new AndroidSensors();
const accelerometerSensor: android.hardware.Sensor;
const gyroScope: android.hardware.Sensor;

const sensorListener = new AndroidSensorListener({
    onAccuracyChanged: (
        sensor: android.hardware.Sensor,
        accuracy: number
      ) => {
        console.log('accuracy', accuracy);
    },
    onSensorChanged: (result: string) => {
        // result is being returned as a string currently
        const parsedData = JSON.parse(result);
        const rawSensorData = parsedData.data;
        const sensor = parsedData.sensor;
        const time = parsedData.time;
    }
});

this.sensors.setListener(sensorListener);


someFunction() {
    accelerometerSensor = sensors.startSensor(android.hardware.Sensor.TYPE_LINEAR_ACCELERATION, SensorDelay.FASTEST);

    // here we are using the android const 4 which is for the TYPE_GYROSCOPE sensor
    // https://developer.android.com/reference/android/hardware/Sensor.html#TYPE_GYROSCOPE
    // we are passing the third argument to `startSensor` which is for maxReportLatency, if the sensor is able to support FIFO this will register the sensor with the reporting latency value, if not, the sensor registers on the background thread as normal
    const gyroScope =  sensors.startSensor(4, SensorDelay.NORMAL, 4000000);

    // maybe you wanna use a timeout and stop it after 8 seconds
    setTimeout(() => {
        sensors.stopSensor(gyroScope);
    }, 8000)
}

functionToStopTheSensorData() {
    sensors.stopSensor(accelerometerSensor);
}
```

## API

#### Constructor

AndroidSensors (liteData: boolean = false)

The boolean argument for `liteData` changes the JSON returned from the sensor event changes. This is helpful when you are storing large amounts of dataset by reducing the redundant data from the sensor changed event.

```typescript
import {
  AndroidSensors,
  AndroidSensorListener,
  SensorDelay,
} from 'nativescript-android-sensors';

const sensors = new AndroidSensors(true);
```

#### Methods

- `setListener(listener: AndroidSensorListener): void`
  - Set the event listener which returns data when the sensors change.
- `startSensor(sensor: android.hardware.Sensor, delay: SensorDelay, maxReportingDelay?: number): android.hardware.Sensor`
  - Registers the sensor with the provided reporting delay. Returns the instance of the sensor so it can be passed to the `stopSensor(sensor)` method to unregister when finished with it. The third argument to `startSensor` is for maxReportLatency, if the sensor is able to support FIFO this will register the sensor with the reporting latency value, if not, the sensor registers on the background thread as normal
- `stopSensor(sensor: android.hardware.Sensor): void`
  - Unregisters the sensor.
- `getDeviceSensors(): android.hardware.Sensor[]`
  - Returns an array of the devices sensors.
- `flush(): boolean`
  - Will flush event data from the listener. Returns true if successful in flushing.
