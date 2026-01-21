//
//  HapticsModule.swift
//  NativeModulePlayground
//
//  Created by Mike Gaudette on 1/19/26.
//

import Foundation
import UIKit

@objc(HapticsModule)
class HapticsModule: NSObject {

  @objc
  func trigger(
    _ type: String,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      let generator: UIImpactFeedbackGenerator

      switch type {
      case "light":
        generator = UIImpactFeedbackGenerator(style: .light)
      case "medium":
        generator = UIImpactFeedbackGenerator(style: .medium)
      case "heavy":
        generator = UIImpactFeedbackGenerator(style: .heavy)
      default:
        reject("INVALID_TYPE", "Unknown haptic type", nil)
        return
      }

      generator.prepare()
      generator.impactOccurred()
      resolve(nil)
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
