//
//  HapticsModule.m
//  SDKIntegrationPlayground
//
//  Created by Mike Gaudette on 1/19/26.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(HapticsModule, NSObject)

RCT_EXTERN_METHOD(
  trigger:
  (NSString *)type
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end
