import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          title: "Home Screen",
        }}
      />
      <Stack.Screen
        name="products/index"
        options={{
          title: "Products",
        }}
      />
      <Stack.Screen
        name="profile/index"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="settings/index"
        options={{
          title: "Settings",
        }}
      />
    </Stack>
  );
};

export default StackLayout;
