import React, { useRef } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useQuery, useRealm } from "@realm/react";

import { Task } from "./db/Tasks";
import { TaskList } from "./components/TaskList";

export default function Home() {
  const realm = useRealm();

  // ref to hold description
  const descriptionRef = useRef();

  // get the tasks
  const tasks = useQuery("Task");

  /**
   * Add a new task to the realm database
   */
  const addTask = () => {
    realm.write(() => {
      const newTask = new Task(realm, descriptionRef.current);

      /// Clear the input field
      descriptionRef.current = "";

      /// return the new task
      return newTask;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={{ height: Dimensions.get("screen").height - 132 }}>
          <Text style={styles.title}>TASK LIST</Text>
          {/* input for description */}
          <TextInput
            placeholder="Enter New Task"
            autoCapitalize="none"
            nativeID="description"
            multiline={true}
            numberOfLines={8}
            value={descriptionRef.current}
            onChangeText={(text) => {
              console.log(text);
              descriptionRef.current = text;
            }}
            style={styles.textInput}
          />
          {/*  button to save the new task */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              addTask();
            }}
          >
            <Text style={styles.buttonText}>SAVE TASK</Text>
          </TouchableOpacity>
          <TaskList data={tasks} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    margin: 16,
    fontWeight: "700",
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "500",
    // color: "#455fff",
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 4,
    // borderColor: "#455fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 0,
    marginHorizontal: 16,
  },
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    marginLeft: 16,
    width: 120,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
});
