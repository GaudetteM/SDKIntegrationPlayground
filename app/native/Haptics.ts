import { NativeModules } from 'react-native';

const { HapticsModule } = NativeModules;

type HapticType = 'light' | 'medium' | 'heavy';

export function triggerHaptic(type: HapticType): Promise<void> {
  if (!HapticsModule) {
    return Promise.reject(new Error('HapticsModule not linked'));
  }

  return HapticsModule.trigger(type);
}
