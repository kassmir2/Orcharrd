import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import DropdownComponent from "./DropdownComp";
import MultiSelectComponent from "./MultiSelectComp";
import { Video } from "expo-av";

const api = process.env.EXPO_PUBLIC_BACKEND_URL;

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "LGBTQ+", value: "LGBTQ+" },
];
const prefGenderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "LGBTQ+", value: "LGBTQ+" },
];
const lookingForData = [
  { label: "Romance", value: "love" },
  { label: "Friendship", value: "friends" },
];

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
    gender: "",
    prefGender: "",
    lookingFor: "",
  });
  const [gender, setGender] = useState("");
  const [prefGender, setPrefGender] = useState([]);
  const [lookingFor, setLookingFor] = useState("");
  const router = useRouter();
  const { setIsLoggedIn, setGlobalUsername } = props;
  const [loading, setLoading] = useState(false);
  const [picOne, setPicOne] = useState(null);
  const [picTwo, setPicTwo] = useState(null);
  const [picThree, setPicThree] = useState(null);
  const [picFour, setPicFour] = useState(null);
  const openImagePicker = async (func) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      console.log("User cancelled image picker");
    } else if (result.error) {
      console.log("Image picker error: ", response.error);
    } else {
      func(result.assets[0].uri);
    }
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
    if (!prefGender) {
      hasErrors = true;
      errorObj.name = "An additional field is required";
    }
    if (!gender) {
      hasErrors = true;
      errorObj.name = "An additional field is required";
    }
    if (!lookingFor) {
      hasErrors = true;
      errorObj.name = "An additional field is required";
    }
    setErrors(errorObj);

    if (hasErrors) {
      alert(errorObj.username);
      alert(errorObj.email);
      alert(errorObj.password);
      alert(errorObj.name);
      alert(errorObj.gender);
      alert(errorObj.prefGender);
      alert(errorObj.lookingFor);
      return;
    }

    // Set loading state and submit data
    setLoading(true);
    try {
      const body = new FormData();
      body.append("username", username);
      body.append("email", email);
      body.append("password", password);
      body.append("name", name);
      body.append("bio", bio);
      body.append("gender", gender);
      body.append("looking_for", lookingFor);
      body.append("pref_gender", prefGender);
      picOne &&
        body.append("picOne", {
          uri: picOne,
          name: `${username}picOne.png`,
          type: "image/png",
          filename: `${username}picOne.png`,
        });

      picTwo &&
        body.append("picTwo", {
          uri: picTwo,
          type: "image/png",
          name: `${username}picTwo.png`,
          filename: `${username}picTwo.png`,
        });
      picThree &&
        body.append("picThree", {
          uri: picThree,
          type: "image/png",
          name: `${username}picThree.png`,
          filename: `${username}picThree.png`,
        });
      picFour &&
        body.append("picFour", {
          uri: picFour,
          type: "image/png",
          name: `${username}picFour.png`,
          filename: `${username}picFour.png`,
        });
      console.log("asking backend");
      const response = await fetch(`${api}/createProfile`, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "multipart/form-data",
          enctype: "multipart/form-data",
        },
      });
      // Handle the response
      if (response.ok) {
        // Successful login
        setLoading(false);
        setIsLoggedIn(true);
        setGlobalUsername(username);
        router.push("Components/HS_subComponents");
        console.log("Logged In");
      } else if (response.status === 401) {
        // Handle login failure
        setLoading(false);
        alert("A user already exists with that username");
      } else if (response.status === 402) {
        setLoading(false);
        alert("A user already exists with that email");
      } else {
        setLoading(false);
        alert("Login failed: Unknown Error");
      }
      // Show success message or navigate to the next screen
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Video
            source={require("../../../assets/Orcharrd_Loading.mov")}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="stretch"
            shouldPlay
            isLooping
            style={styles.video}
          />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require("../../../assets/Orcharrd_Logo.png")}
              style={{ width: "100%", height: "100%", marginTop: 40 }}
              resizeMode="stretch"
            />
          </View>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
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

          <DropdownComponent
            Data={genderData}
            setValue={setGender}
            value={gender}
            labIconDes={"man"}
            PHtext={"I am..."}
            labelText={"Select your gender"}
          />

          <DropdownComponent
            Data={lookingForData}
            setValue={setLookingFor}
            value={lookingFor}
            labIconDes={"heart"}
            PHtext={"I am looking for..."}
            labelText={"Select what you are looking for"}
          />

          <MultiSelectComponent
            Data={prefGenderData}
            setValue={setPrefGender}
            value={prefGender}
            labIconDes={"woman"}
            PHtext={"The people I want to meet are..."}
            labelText={"Select who you are looking to meet"}
          />

          {picOne && (
            <Image
              source={{ uri: picOne }}
              style={{
                width: 100,
                height: 180,
                borderRadius: 5,
                marginTop: 10,
              }}
              resizeMode="stretch"
            />
          )}

          <TouchableOpacity
            style={styles.addImage}
            onPress={() => openImagePicker(setPicOne)}
          >
            <Text style={styles.submitText}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
          {picTwo && (
            <Image
              source={{ uri: picTwo }}
              style={{
                width: 100,
                height: 180,
                borderRadius: 5,
                marginTop: 10,
              }}
              resizeMode="stretch"
            />
          )}

          <TouchableOpacity
            style={styles.addImage}
            onPress={() => openImagePicker(setPicTwo)}
          >
            <Text style={styles.submitText}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
          {picThree && (
            <Image
              source={{ uri: picThree }}
              style={{
                width: 100,
                height: 180,
                borderRadius: 5,
                marginTop: 10,
              }}
              resizeMode="stretch"
            />
          )}

          <TouchableOpacity
            style={styles.addImage}
            onPress={() => openImagePicker(setPicThree)}
          >
            <Text style={styles.submitText}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
          {picFour && (
            <Image
              source={{ uri: picFour }}
              style={{
                width: 100,
                height: 180,
                borderRadius: 5,
                marginTop: 10,
              }}
              resizeMode="stretch"
            />
          )}

          <TouchableOpacity
            style={styles.addImage}
            onPress={() => openImagePicker(setPicFour)}
          >
            <Text style={styles.submitText}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Create Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
    backgroundColor: "#82cf97",
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
    position: "relative",
    padding: 10,
    width: 60,
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
    padding: 10,
    height: "15%",
  },
  addImage: {
    backgroundColor: "#82cf97",
    marginTop: 20,
    padding: 20,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    marginBottom: 350,
    width: "50%",
    position: "relative",
    alignSelf: "center",
    backgroundColor: "#82cf97",
  },
  submitText: {
    fontSize: 20,
    color: "#dff5e5",
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  video: {
    width: "100%",
    height: "100%",
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

export default connect(null, mapDispatchToProps)(CreateAccScreen);
