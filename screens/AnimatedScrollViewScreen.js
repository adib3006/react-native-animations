import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import TitleScreen from "./TitleScreen";

const WORDS = ["Hey !", "What's", "Going", "on"];

const AnimatedScrollViewScreen = () => {
    const translateX = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translateX.value = event.contentOffset.x;
    });
    return (
        <Animated.ScrollView
            pagingEnabled
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            horizontal
            style={styles.container}
        >
            {WORDS.map((title, index) => (
                <TitleScreen
                    title={title}
                    index={index}
                    key={index}
                    translateX={translateX}
                />
            ))}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default AnimatedScrollViewScreen;
