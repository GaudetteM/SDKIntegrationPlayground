import { NativeModules } from 'react-native';

type DeviceInfo = {
  platform: string;
  version: string;
};

const { DeviceInfoModule } = NativeModules;

export function getDeviceInfo(): Promise<DeviceInfo> {
  if (!DeviceInfoModule || typeof DeviceInfoModule.getDeviceInfo !== 'function') {
    return Promise.reject(
      new Error(
        '[DeviceInfo] Native module "DeviceInfoModule" is not available. '
      )
    );
  }
  return DeviceInfoModule.getDeviceInfo();
}
