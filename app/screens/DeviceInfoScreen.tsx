import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import { getDeviceInfo } from '../native/DeviceInfo';

type DeviceInfo = {
  platform: string;
  version: string;
};

export default function DeviceInfoScreen() {
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
        Native Device Info
      </Text>

      <Text
        style={{
          textAlign: 'center',
          marginBottom: 16,
          color: isDark ? '#8ab4f8' : '#1a73e8',
        }}
      >
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
        <View
          style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}
        >
          {Object.entries(info).map(([key, val], i) => (
            <View key={key} style={{ marginBottom: 8 }}>
              <Text
                style={[
                  styles.label,
                  {
                    color: ['#8ab4f8', '#fbbc05', '#34a853', '#ea4335'][i % 4],
                  },
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
      )}

      <Button
        title="Reload Device Info"
        onPress={loadInfo}
        color={isDark ? '#8ab4f8' : '#1a73e8'}
      />
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
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  lightText: { color: '#222' },
  darkText: { color: '#e0e0e0' },
  card: { padding: 16, borderRadius: 12, marginBottom: 16 },
  lightCard: { backgroundColor: '#fff' },
  darkCard: { backgroundColor: '#1f1f1f' },
  label: { fontSize: 14, opacity: 0.7 },
  value: { fontSize: 18, marginBottom: 12 },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});
