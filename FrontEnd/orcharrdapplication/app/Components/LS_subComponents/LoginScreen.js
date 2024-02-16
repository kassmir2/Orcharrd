import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

const api = "http://192.168.16.187:34000";
const apiSchool = "http://10.195.11.92:34000";
const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setGlobalUsername } = props;
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    // Validate data and show errors
    let hasErrors = false;
    const errorObj = {};
    if (!username) {
      hasErrors = true;
      errorObj.username = "Username/Email is required";
    }
    if (!password) {
      hasErrors = true;
      errorObj.password = "Password is required";
    }
    setErrors(errorObj);

    if (hasErrors) {
      alert(errorObj.username);
      alert(errorObj.password);
      return;
    }

    // Set loading state and submit data
    setLoading(true);

    try {
      // Your logic to create user profile using your chosen data storage solution
      // Replace this with your actual API call or storage method
      //console.log("We got this far");
      const response = await fetch(`${api}/Login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      //console.log(response);
      if (response.ok) {
        // If response status code is 200-299
        // Successful login

        setLoading(false);
        setGlobalUsername(username);
        setIsLoggedIn(true);
        router.push("Components/HS_subComponents");

        console.log("should be logging in");
      } else if (response.status == 400) {
        // Handle login failure
        setLoading(false);

        alert("Login failed: No Users Matched Those Credentials");
      } else {
        setLoading(false);

        alert("Login failed: Unknown Error");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Handle any errors and display message
    }
  };

  return (
    <View style={styles.container}>
      {/*header container*/}
      <View style={styles.headerContainer}>
        <Image
          source={require("../../../assets/Orcharrd_Logo.png")}
          style={{ width: 300, height: 200, marginTop: 40 }}
          resizeMode="stretch"
        />
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Login to Your Profile</Text>
      {/* Form fields with error messages */}
      <TextInput
        placeholder="Username/Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        error={errors.username}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={errors.password}
        style={styles.input}
      />
      <TouchableOpacity style={styles.logInButton} onPress={handleSubmit}>
        <Text style={styles.logInText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    //alignItems: "center",
    //justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#82cf97",
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    textShadowColor: "#000",
    fontSize: 16,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
  },
  backButton: {
    position: "absolute", // Position absolutely within the container
    top: 140,
    left: 15,
    padding: 10,
    backgroundColor: "#f0f0f0", // Light grey background
    borderRadius: 5,
  },
  logInButton: {
    position: "relative",
    backgroundColor: "#82cf97", // Light grey background
    borderRadius: 5,
    padding: 5,
    width: "50%",
    alignSelf: "center",
  },
  logInText: {
    fontSize: 30,
    color: "#dff5e5",
    textAlign: "center",
    fontWeight: "bold",
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoggedIn: (isLoggedIn) =>
      dispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn }),
    setGlobalUsername: (globalUsername) =>
      dispatch({ type: "SET_GLOBAL_USERNAME", globalUsername }),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
