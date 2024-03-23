import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";

const api = process.env.EXPO_PUBLIC_BACKEND_URL;

const ChatScreen = (props) => {
  const { GlobalUsername } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This is where you will be able to chat with the other person
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noMatchesText: {
    fontSize: 18,
    color: "#000000", // Black text
    textAlign: "center",
    marginTop: 20,
  },
});

const mapStateToProps = (state) => ({
  GlobalUsername: state.GlobalUsername,
});

export default connect(mapStateToProps)(ChatScreen);
