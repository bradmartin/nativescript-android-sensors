export declare class AndroidSensors {
    private XSensorClass;
    constructor(liteData?: boolean);
    setListener(listener: any): void;
    startSensor(sensor: number, delay: number, maxReportLatency?: number, isWakeUpSensor?: boolean): android.hardware.Sensor;
    stopSensor(sensor: android.hardware.Sensor): void;
    getDeviceSensors(): android.hardware.Sensor[];
    flush(): boolean;
}
export declare const AndroidSensorListener: any;
export declare enum SensorDelay {
    'FASTEST',
    'GAME',
    'UI',
    'NORMAL'
}
