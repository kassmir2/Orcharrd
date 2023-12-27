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

const CreateAccScreen = (route) => {
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
  navigation = useNavigation();
  //const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   // Validate data and show errors
  //   let hasErrors = false;
  //   const errorObj = {};
  //   if (!username) {
  //     hasErrors = true;
  //     errorObj.username = "Username is required";
  //   }
  //   if (!email) {
  //     hasErrors = true;
  //     errorObj.email = "Email is required";
  //   }
  //   if (!password) {
  //     hasErrors = true;
  //     errorObj.password = "Password is required";
  //   }
  //   if (!name) {
  //     hasErrors = true;
  //     errorObj.name = "Name is required";
  //   }
  //   setErrors(errorObj);

  //   if (hasErrors) return;

  //   // Set loading state and submit data
  //   setLoading(true);
  //   try {
  //     // Your logic to create user profile using your chosen data storage solution
  //     // Replace this with your actual API call or storage method
  //     await fetch("https://example.com/api/profiles", {
  //       method: "POST",
  //       body: JSON.stringify({ username, email, password, name, bio }),
  //     });
  //     setLoading(false);
  //     // Show success message or navigate to next screen
  //   } catch (error) {
  //     setLoading(false);
  //     // Handle any errors and display message
  //   }
  // };

  return (
    <View style={styles.container}>
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

      {/* Image upload components for profile picture and other photos (optional) */}

      {/* Submit button and loading indicator */}
      <Button
        title={"Create Profile"}
        //onPress={handleSubmit}
        color="blue"
      />
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
export default CreateAccScreen;
