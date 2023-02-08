import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AnimatedScrollViewScreen from "./screens/AnimatedScrollViewScreen";
import PanGestureScreen from "./screens/PanGestureScreen";
import SimpleAnimationScreen from "./screens/SimpleAnimationScreen";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <AnimatedScrollViewScreen />
            {/* <PanGestureScreen /> */}
            {/* <SimpleAnimationScreen /> */}
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
