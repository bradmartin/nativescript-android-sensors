# NativeScript-Android-Sensors

## Installation

```
tns plugin add nativescript-android-sensors
```

Android Sensors: https://developer.android.com/reference/android/hardware/Sensor.html

## Usage

```typescript
import { AndroidSensors, AndroidSensorListener, SensorDelay } from 'nativescript-android-sensors';

const sensors = new AndroidSensors();

const sensorListener = new AndroidSensorListener();
sensorListener.onSensorChanged(result) {
    // result is being returned as a string currently
    const parsedData = JSON.parse(result);
    const rawSensorData = parsedData.data;
    const sensor = parsedData.sensor;
    const time = parsedData.time;
}

const accelerometerSensor: android.hardware.Sensor;
const gyroScope: android.hardware.Sensor;

someFunction() {
    accelerometerSensor = sensors.startSensor(android.hardware.Sensor.TYPE_LINEAR_ACCELERATION, SensorDelay.FASTEST);

    // here we are using the android const 4 which is for the TYPE_GYROSCOPE sensor
    // https://developer.android.com/reference/android/hardware/Sensor.html#TYPE_GYROSCOPE
    const gyroScope =  sensors.startSensor(4, SensorDelay.NORMAL);

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

```typescript
import { AndroidSensors } from 'nativescript-android-sensors';

const sensors = new AndroidSensors();
```

#### Methods

- `startSensor(sensor: android.hardware.Sensor, delay: SensorDelay): android.hardware.Sensor`
  returns a reference to the sensor that was started, if the sensor was not started correctly, null is returned. You will use this sensor reference for the `stopSensor` method to unregister the listener.
- `stopSensor(sensor: android.hardware.Sensor): void`
