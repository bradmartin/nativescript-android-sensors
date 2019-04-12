export declare class AndroidSensors {
    private XSensorClass;
    constructor();
    setListener(listener: any): void;
    startSensor(sensor: number, delay: number): android.hardware.Sensor;
    stopSensor(sensor: android.hardware.Sensor): void;
    getDeviceSensors(): android.hardware.Sensor[];
}
export declare const AndroidSensorListener: any;
export declare enum SensorDelay {
    'FASTEST',
    'GAME',
    'UI',
    'NORMAL'
}
