import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

// const SwipePage = ({ navigation, route }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.subtitle}> you selected {route.params.place}. </Text>
//       <Text style={styles.title}> This is the swiping page </Text>
//     </View>
//   );
// };
const SwipePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}> YEAHHH</Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
export default SwipePage;
