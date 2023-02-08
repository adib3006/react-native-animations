import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const SIZE = width * 0.7;

const TitleScreen = ({ index, title, translateX }) => {
    const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
    ];
    const rStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP
        );
        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolate.CLAMP
        );
        return {
            borderRadius,
            transform: [{ scale }],
        };
    });

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(translateX.value, inputRange, [
            height / 2,
            0,
            -height / 2,
        ]);
        const opacity = interpolate(translateX.value, inputRange, [-2, 1, -2]);
        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: `rgba(0,0,256,0.${index + 1})` },
            ]}
        >
            <Animated.View
                style={[
                    styles.square,
                    { backgroundColor: `rgba(0,0,256,0.${index + 2})` },
                    rStyle,
                ]}
            ></Animated.View>
            <Animated.View style={[rTextStyle, { position: "absolute" }]}>
                <Text style={styles.text}>{title}</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        alignItems: "center",
        justifyContent: "center",
    },
    square: {
        height: SIZE,
        width: SIZE,
    },
    text: {
        fontSize: 70,
        fontWeight: "700",
        color: "white",
        textTransform: "uppercase",
    },
});

export default TitleScreen;
