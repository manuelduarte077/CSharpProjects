import {
  Text,
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRealm } from "@realm/react";

export const TaskList = ({ data }) => {
  const realm = useRealm();

  const onToggleStatus = (task) => {
    console.log(task);
    realm.write(() => {
      task.isComplete = !task.isComplete;
    });
  };

  const onDelete = (task) => {
    console.log(task);
    realm.write(() => {
      realm.delete(task);
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.item}>
        <View style={{ display: "flex", flex: 12 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            {item.description}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 4 }}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
          <Text style={{}}>{item._id + ""}</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignSelf: "center",
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            onPress={() => onToggleStatus(item)}
            style={[styles.status, item.isComplete && styles.completed]}
          >
            {/* <Text style={[styles.icon]}>{item.isComplete ? "✓" : "o"}</Text> */}
            <Ionicons
              name={item.isComplete ? "checkmark-circle" : "ellipse-outline"}
              size={32}
              color={item.isComplete ? "green" : "black"}
            />
          </Pressable>
        </View>
      </View>
      <Pressable onPress={() => onDelete(item)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id + ""}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: Dimensions.get("screen").width,
  },
  icon: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  status: {
    width: 32,
    height: 32,
  },
  deleteButton: {
    backgroundColor: "red",
    margin: 8,
    marginLeft: 0,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    width: 100,
  },
  deleteText: {
    textAlign: "center",
  },
});
