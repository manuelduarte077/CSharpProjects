import TweetContent from "./TweetContent";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

const Tweet = ({ tweet }) => {
  const { navigate } = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigate("TweetDetailScreen", { tweet });
      }}
    >
      <TweetContent tweet={tweet} />
    </Pressable>
  );
};

export default Tweet;
