import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { SwipePage } from "./SwipeScreen";

const SwipePage = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}> you selected {route.params.place}. </Text>
      <Text style={styles.title}> This is the swiping page </Text>
    </View>
  );
};
const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="SwipePage" component={SwipePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Card = ({ title, subtitle, numInterested, onPress }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {numInterested && (
        <Text style={styles.numInterested}>
          {numInterested} people interested
        </Text>
      )}
      <Button title="More Info" onPress={onPress} />
      <View style={styles.horizontalLine}></View>
    </View>
  );
};

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Card
        title="Grab a Drink at Glass Jug"
        subtitle="Downtown Durham's coolest new bar"
        numInterested={15}
        onPress={() =>
          navigation.navigate("SwipePage", { place: "Durham's Coolest bar" })
        }
      />
      <Card
        title="Get Coffee at Foster Street Coffee"
        subtitle="Warm drinks and yummy treats"
        numInterested={12}
        onPress={() =>
          navigation.navigate("SwipePage", { place: "Foster Street Coffee" })
        }
      />
      <Card
        title="Go on a walk down the American Tobacco Trail"
        subtitle="Scenic routes and paved walkways"
        numInterested={23}
        onPress={() =>
          navigation.navigate("SwipePage", {
            place: "American Tobacco Trail",
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: "black", // Change color as needed
    borderBottomWidth: 1, // Change thickness as needed
    marginVertical: 10, // Adjust spacing as needed
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
  },
  numInterested: {
    fontSize: 12,
    color: "#999",
  },
});

export default MyStack;
