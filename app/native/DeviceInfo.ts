import { NativeModules } from 'react-native';

type DeviceInfo = {
  platform: string;
  version: string;
};

const { DeviceInfoModule } = NativeModules;

export function getDeviceInfo(): Promise<DeviceInfo> {
  return DeviceInfoModule.getDeviceInfo();
}
