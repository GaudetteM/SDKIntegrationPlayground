import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, StatusBar } from 'react-native';
import { getDeviceInfo } from '../native/DeviceInfo';
import { DeviceInfoCard } from '../components/DeviceInfoCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { HapticControls } from '../components/HapticControls';

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
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={isDark ? '#0a0a0a' : '#f8f9fa'}
      />
      <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />

      {loading && (
        <ActivityIndicator
          size="large"
          color={isDark ? '#8ab4f8' : '#1a73e8'}
        />
      )}

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {info && (
        <DeviceInfoCard info={info} isDark={isDark} onReload={loadInfo} />
      )}

      <HapticControls isDark={isDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  lightContainer: { backgroundColor: '#f8f9fa' },
  darkContainer: { backgroundColor: '#0a0a0a' },
  error: { 
    color: '#ea4335', 
    marginBottom: 16, 
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});
