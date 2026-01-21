package net.nitroturtle.nativemoduleplayground

import com.facebook.react.bridge.*

class DeviceInfoModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "DeviceInfoModule"

    @ReactMethod
    fun getDeviceInfo(promise: Promise) {
        try {
            val version = android.os.Build.VERSION.RELEASE ?: "unknown"
            val result = Arguments.createMap().apply {
                putString("platform", "Android")
                putString("version", version)
            }
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("GET_DEVICE_INFO_FAILED", e)
        }
    }
}
