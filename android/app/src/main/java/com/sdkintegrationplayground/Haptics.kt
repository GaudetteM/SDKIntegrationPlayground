package com.sdkintegrationplayground

import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import com.facebook.react.bridge.*

class HapticsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "HapticsModule"

    @ReactMethod
    fun trigger(type: String, promise: Promise) {
        try {
            val vibrator = reactApplicationContext
                .getSystemService(ReactApplicationContext.VIBRATOR_SERVICE) as Vibrator

            if (!vibrator.hasVibrator()) {
                promise.resolve(null)
                return
            }

            val duration = when (type) {
                "light" -> 20L
                "medium" -> 40L
                "heavy" -> 80L
                else -> {
                    promise.reject("INVALID_TYPE", "Unknown haptic type")
                    return
                }
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(
                    VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE)
                )
            } else {
                vibrator.vibrate(duration)
            }

            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERROR", e)
        }
    }
}
