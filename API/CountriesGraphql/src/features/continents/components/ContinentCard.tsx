import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type ContinentCardProps = {
  name: string;
  code: string;
  onPress: () => void;
};

export default function ContinentCard({name, code, onPress}: ContinentCardProps) {
  return (
    <TouchableOpacity style={styles.continentItem} onPress={onPress}>
      <Text style={styles.continentItemText}>{name}</Text>
      <Text style={styles.continentCode}>{code}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  continentItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
  },
  continentItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  continentCode: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});