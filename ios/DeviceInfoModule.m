//
//  DeviceInfoModule.m
//  NativeModulePlayground
//
//  Created by Mike Gaudette on 1/18/26.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(DeviceInfoModule, NSObject)

RCT_EXTERN_METHOD(
  getDeviceInfo:
  (RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end
