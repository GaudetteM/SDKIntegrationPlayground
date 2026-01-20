import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { getDeviceInfo } from '../native/DeviceInfo';
import { triggerHaptic } from '../native/Haptics';
import { HapticButton } from '../components/HapticsButton';

type DeviceInfo = {
  platform: string;
  version: string;
};

export default function LandingScreen() {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  const loadInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getDeviceInfo();
      setInfo(result);
    } catch (e: any) {
      setError(e?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text style={[styles.title, isDark ? styles.darkText : styles.lightText]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>

      <Button
        title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
        onPress={toggleDarkMode}
        color={isDark ? '#8ab4f8' : '#1a73e8'}
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color={isDark ? '#8ab4f8' : '#1a73e8'}
        />
      )}

      {error && (
        <Text
          style={[styles.error, isDark ? styles.darkText : styles.lightText]}
        >
          {error}
        </Text>
      )}

      {info && (
        <View>
          <Text
            style={[styles.title, isDark ? styles.darkText : styles.lightText]}
          >
            Native Device Info
          </Text>
          <View
            style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              {Object.entries(info).map(([key, val], i) => (
                <View key={key} style={styles.infoRow}>
                  <Text
                    style={[
                      styles.label,
                      i % 4 === 0 && styles.labelColor0,
                      i % 4 === 1 && styles.labelColor1,
                      i % 4 === 2 && styles.labelColor2,
                      i % 4 === 3 && styles.labelColor3,
                    ]}
                  >
                    {key}
                  </Text>
                  <Text
                    style={[
                      styles.value,
                      isDark ? styles.darkText : styles.lightText,
                    ]}
                  >
                    {val}
                  </Text>
                </View>
              ))}
            </View>
            <Button
              title="Reload Device Info"
              onPress={loadInfo}
              color={isDark ? '#8ab4f8' : '#1a73e8'}
            />
          </View>
        </View>
      )}

      <Text style={[styles.title, isDark ? styles.darkText : styles.lightText]}>
        Trigger Haptic Feedback
      </Text>
      <View style={styles.buttonRow}>
        <HapticButton
          label="Light Haptic"
          color="#34a853"
          onPress={() => triggerHaptic('light')}
          isDark={isDark}
        />
        <HapticButton
          label="Medium Haptic"
          color="#fbbc05"
          onPress={() => triggerHaptic('medium')}
          isDark={isDark}
        />
        <HapticButton
          label="Heavy Haptic"
          color="#ea4335"
          onPress={() => triggerHaptic('heavy')}
          isDark={isDark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  lightContainer: { backgroundColor: '#f0f3f5' },
  darkContainer: { backgroundColor: '#121212' },
  title: {
    marginVertical: 16,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  lightText: { color: '#222' },
  darkText: { color: '#e0e0e0' },
  modeText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  accentDarkText: { color: '#8ab4f8' },
  accentLightText: { color: '#1a73e8' },
  card: { padding: 16, borderRadius: 12, marginBottom: 16 },
  lightCard: { backgroundColor: '#fff' },
  darkCard: { backgroundColor: '#1f1f1f' },
  infoRow: { marginBottom: 8 },
  label: { fontSize: 14, opacity: 0.7 },
  labelColor0: { color: '#8ab4f8' },
  labelColor1: { color: '#fbbc05' },
  labelColor2: { color: '#34a853' },
  labelColor3: { color: '#ea4335' },
  value: { fontSize: 18, marginBottom: 12 },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexShrink: 1,
  },
});
