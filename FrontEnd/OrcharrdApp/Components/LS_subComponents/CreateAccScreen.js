import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const CreateAccScreen = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigation = useNavigation();
  const { setIsLoggedIn } = props;
  const [loading, setLoading] = useState(false);
  const [picOne, setPicOne] = useState(null);
  const options = {
    mediaType: "photo",
    quality: 0.5,
    // other options...
  };
  const handleImagePicker = () => {
    launchCamera(options, (response) => {
      // Use launchImageLibrary to open image gallery
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        setPicOne(response.uri);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        console.log(source);
      }
    });
  };
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
    if (!name) {
      hasErrors = true;
      errorObj.name = "Name is required";
    }
    setErrors(errorObj);

    if (hasErrors) {
      alert(errorObj.username);
      alert(errorObj.email);
      alert(errorObj.password);
      alert(errorObj.name);
      return;
    }

    // Set loading state and submit data
    setLoading(true);
    try {
      // Your logic to create user profile using your chosen data storage solution
      // Replace this with your actual API call or storage method
      const response = await fetch("http://192.168.1.21:34000/createProfile", {
        method: "POST",
        body: JSON.stringify({ username, email, password, name, bio }),
      });
      if (response.ok) {
        // If response status code is 200-299
        // Successful login

        setLoading(false);
        setIsLoggedIn(true);
        console.log("should be logging in");
      } else if (response.status == 401) {
        // Handle login failure
        setLoading(false);

        alert("A user already exists with that username");
      } else if (response.status == 402) {
        setLoading(false);

        alert("A user already exists with that email");
      } else {
        setLoading(false);

        alert("Login failed: Unknown Error");
      }
      // Show success message or navigate to next screen
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/Orcharrd_Logo.png")}
          style={{ width: 240, height: 80, marginTop: 40 }}
          resizeMode="stretch"
        />
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      {/* Header */}
      <Text style={styles.title}>Create Your Profile</Text>

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
      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        error={errors.name}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio (optional)"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
      />
      {picOne && (
        <Image
          source={{ uri: picOne }}
          style={{ width: 100, height: 100, borderRadius: 50, marginTop: 10 }}
        />
      )}

      <TouchableOpacity onPress={handleImagePicker}>
        <Text style={{ color: "blue", marginTop: 10 }}>
          Pick an image from camera roll
        </Text>
      </TouchableOpacity>

      {/* Image upload components for profile picture and other photos (optional) */}

      {/* Submit button and loading indicator */}
      <Button title={"Create Profile"} onPress={handleSubmit} color="blue" />
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
    top: 140,
    left: 15,
    padding: 10,
    backgroundColor: "#f0f0f0", // Light grey background
    borderRadius: 5,
    zIndex: 1,
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
  };
};

export default connect(null, mapDispatchToProps)(CreateAccScreen);
