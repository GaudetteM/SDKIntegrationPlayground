import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type DeviceInfo = {
  platform: string;
  version: string;
};

type DeviceInfoCardProps = {
  info: DeviceInfo;
  isDark: boolean;
  onReload: () => void;
};

export function DeviceInfoCard({
  info,
  isDark,
  onReload,
}: DeviceInfoCardProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, isDark ? styles.darkText : styles.lightText]}>
        Device Information
      </Text>
      <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, styles.labelColor0]}>Platform</Text>
            <Text
              style={[
                styles.value,
                isDark ? styles.darkText : styles.lightText,
              ]}
            >
              {info.platform}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.label, styles.labelColor1]}>Version</Text>
            <Text
              style={[
                styles.value,
                isDark ? styles.darkText : styles.lightText,
              ]}
            >
              {info.version}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.reloadButton,
            isDark ? styles.darkReloadButton : styles.lightReloadButton,
          ]}
          onPress={onReload}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.reloadText,
              isDark ? styles.darkButtonText : styles.lightButtonText,
            ]}
          >
            ↻ Reload
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  lightText: { color: '#1a1a1a' },
  darkText: { color: '#f5f5f5' },
  card: {
    padding: 20,
    borderRadius: 16,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  lightCard: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
  },
  darkCard: {
    backgroundColor: '#1a1a1a',
    shadowColor: '#000000',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoRow: { flex: 1 },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    opacity: 0.9,
  },
  labelColor0: { color: '#8ab4f8' },
  labelColor1: { color: '#fbbc05' },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  reloadButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  lightReloadButton: {
    backgroundColor: '#f0f0f0',
  },
  darkReloadButton: {
    backgroundColor: '#2a2a2a',
  },
  reloadText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  lightButtonText: { color: '#1a73e8' },
  darkButtonText: { color: '#8ab4f8' },
});
