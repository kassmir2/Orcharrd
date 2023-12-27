import { useNavigation } from "@react-navigation/native";
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

const LoginScreen = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = props;
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    // Validate data and show errors
    let hasErrors = false;
    const errorObj = {};
    if (!username) {
      hasErrors = true;
      errorObj.username = "Username is required";
    }
    if (!email) {
      hasErrors = true;
      errorObj.email = "Email is required";
    }
    if (!password) {
      hasErrors = true;
      errorObj.password = "Password is required";
    }
    setErrors(errorObj);

    if (hasErrors) {
      alert(errorObj.username);
      alert(errorObj.email);
      alert(errorObj.password);
    }

    // Set loading state and submit data
    setLoading(true);

    try {
      // Your logic to create user profile using your chosen data storage solution
      // Replace this with your actual API call or storage method
      //console.log("We got this far");
      const response = await fetch("http://192.168.1.21:34000/Login", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      //console.log(response);
      if (response.ok) {
        // If response status code is 200-299
        // Successful login

        setLoading(false);
        setIsLoggedIn(true);
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Login to Your Profile</Text>

      {/* Form fields with error messages */}
      <TextInput
        placeholder="Username (unique)"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        error={errors.username}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
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
      <Button title={"Submit"} onPress={handleSubmit} color="blue" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FFF0",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
  },
  backButton: {
    position: "absolute", // Position absolutely within the container
    top: 10,
    left: 10,
    padding: 10,
    backgroundColor: "#f0f0f0", // Light grey background
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLoggedIn: (isLoggedIn) =>
      dispatch({ type: "SET_IS_LOGGED_IN", isLoggedIn }),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
