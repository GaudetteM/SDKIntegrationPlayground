//
//  DeviceInfoModule.swift
//  SDKIntegrationPlayground
//
//  Created by Mike Gaudette on 1/18/26.
//

import Foundation
import UIKit

@objc(DeviceInfoModule)
class DeviceInfoModule: NSObject {

  @objc
  func getDeviceInfo(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) {
    let systemVersion = UIDevice.current.systemVersion
    resolve([
      "platform": "iOS",
      "version": systemVersion
    ])
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
