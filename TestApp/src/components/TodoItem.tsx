import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  favorite: boolean;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onFavorite: (id: string) => void;
}

export const TodoItem = ({
  id,
  text,
  completed,
  favorite,
  onToggle,
  onFavorite,
  onRemove,
}: TodoItemProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        completed && styles.completedContainer,
        favorite && styles.favoriteContainer,
      ]}
      onPress={() => onToggle(id)}
      activeOpacity={0.7}>
      <View style={styles.todoContent}>
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text
            style={[
              styles.text,
              completed && styles.completedText,
              favorite && styles.favoriteText,
            ]}>
            {text}
          </Text>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => onFavorite(id)}
            style={[styles.actionButton, favorite && styles.favoriteButton]}>
            <Text style={[styles.actionText, favorite && styles.favoriteActive]}>
              ★
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onRemove(id)}
            style={[styles.actionButton, styles.deleteButton]}>
            <Text style={styles.deleteText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  completedContainer: {
    backgroundColor: '#f8f9fa',
    opacity: 0.8,
  },
  favoriteContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  favoriteText: {
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    backgroundColor: '#fff8e1',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  actionText: {
    fontSize: 20,
    color: '#888',
  },
  favoriteActive: {
    color: '#FFD700',
  },
  deleteText: {
    fontSize: 24,
    color: '#ff1744',
    fontWeight: 'bold',
  },
});
