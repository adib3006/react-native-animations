import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import {
    GestureHandlerRootView,
    PanGestureHandler,
} from "react-native-gesture-handler";

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

const PanGestureScreen = () => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (event, context) => {
            context.translateX = translateX.value;
            context.translateY = translateY.value;
        },
        onActive: (event, context) => {
            translateX.value = event.translationX + context.translateX;
            translateY.value = event.translationY + context.translateY;
        },
        onEnd: () => {
            const distance = Math.sqrt(
                translateX.value ** 2 + translateY.value ** 2
            );
            if (distance < CIRCLE_RADIUS + SIZE / 2) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    });
    const rStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });
    return (
        <View style={{ flex: 1 }}>
            <Text
                style={{
                    marginTop: StatusBar.currentHeight,
                    textAlign: "center",
                }}
            >
                Simple Animation
            </Text>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View style={styles.circle}>
                    <PanGestureHandler onGestureEvent={panGestureEvent}>
                        <Animated.View style={[styles.square, rStyle]} />
                    </PanGestureHandler>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    square: {
        width: SIZE,
        height: SIZE,
        backgroundColor: "rgba(0,0,256,0.5)",
        borderRadius: 20,
    },
    circle: {
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(0,0,256,0.5)",
        borderWidth: 5,
    },
});

export default PanGestureScreen;
