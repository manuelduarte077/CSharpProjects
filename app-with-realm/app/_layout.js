import "react-native-get-random-values";
import { RealmProvider } from "@realm/react";
import { Stack } from "expo-router";
import { Task } from "./db/Tasks";

export default function AppLayout() {
  return (
    <RealmProvider schema={[Task]}>
      <Stack
        screenOptions={{
          title: "Tasks",
          headerStyle: {
            backgroundColor: "indigo",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </RealmProvider>
  );
}
