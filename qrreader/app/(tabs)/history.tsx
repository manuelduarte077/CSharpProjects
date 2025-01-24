import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Animated,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/Colors";
import ThemeToggle from "../../components/ThemeToggle";

interface QRScanItem {
  id: string;
  content: string;
  timestamp: string;
}

export default function HistoryScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const placeholderData: QRScanItem[] = [
    {
      id: "1",
      content: "Example QR Code 1",
      timestamp: "2024-01-15T10:00:00Z",
    },
    {
      id: "2",
      content: "Example QR Code 2",
      timestamp: "2024-01-15T09:30:00Z",
    },
    {
      id: "3",
      content: "Example QR Code 3",
      timestamp: "2024-01-15T09:30:00Z",
    },
    {
      id: "4",
      content: "Example QR Code 4",
      timestamp: "2024-01-15T09:30:00Z",
    },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = ({ item }: { item: QRScanItem; index: number }) => (
    <Animated.View
      style={[
        styles.item,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <LinearGradient
        colors={[colors.cardBackground, colors.cardBackground]}
        style={styles.cardGradient}
      >
        <View style={styles.contentContainer}>
          <Text style={[styles.content, { color: colors.text }]}>{item.content}</Text>
          <Text style={[styles.timestamp, { color: colors.placeholderText }]}>
            {new Date(item.timestamp).toLocaleString()}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[{ flex: 1 }, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Scan History</Text>
          <ThemeToggle />
        </View>
        <FlatList
          data={placeholderData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  themeToggle: {
    padding: 10,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 16,
  },
  listContainer: {
    padding: 20,
  },
  item: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardGradient: {
    width: "100%",
  },
  contentContainer: {
    padding: 20,
  },
  content: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  timestamp: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
});
