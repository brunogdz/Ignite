import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet } from "react-native";
import { CarCards } from "../../components/CarCards";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
    CarList,
    Container, 
    Header,
    HeaderContent,
    Logo,
    // MyCarsButton,
    Total,
} from "./styles";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { useTheme } from "styled-components/native";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";


const MyCarButton = Animated.createAnimatedComponent(RectButton);

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
   
    const navigation = useNavigation<any>();
    const theme = useTheme();

    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
   
    const onGestureEvent = useAnimatedGestureHandler({
        onStart(){

        },
        onActive(event){
            positionX.value = event.translationX;
            positionY.value = event.translationY;
        },
        onEnd(){}
    }) 
    const handleMyCarButtonAnimation = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: positionX.value
                },
                {
                    translateY: positionY.value
                }
            ]
        }
    }) 

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    }
    function handleMyCars(){
        navigation.navigate('MyCars');
    }   
     
    useEffect(() => {
        async function fetchCars(){
           try{
               const response = await api.get('/cars');
               setCars(response.data);
            } catch (error) {
                console.log(error);
           } finally {
               setIsLoading(false);
           }
        }
        fetchCars();
    }, []);

    return (
            <Container>
                <StatusBar 
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Header>
                    <HeaderContent>
                        <Logo />
                        <Total>Total de {cars.length} carros</Total>
                    </HeaderContent>
                </Header>
            { isLoading ?
                <Load />
            : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={
                        ({ item }) => 
                            <CarCards 
                                data={item} 
                                onPress={() => handleCarDetails(item)}
                            />
                    }
                />
            }

            <PanGestureHandler
                onGestureEvent={onGestureEvent}
            >
                <Animated.View>
                    <MyCarButton
                        onPress={() => handleMyCars()}
                        style={[styles.myCarButtonStyle, handleMyCarButtonAnimation, { backgroundColor: theme.colors.main }]}
                        >
                        <Ionicons 
                            name="ios-car-sport" 
                            size={32} 
                            color={theme.colors.background_secondary} 
                            />
                    </MyCarButton>
                </Animated.View>    
            </PanGestureHandler>
            </Container>
        );
    }

    const styles = StyleSheet.create({
        myCarButtonStyle: {
            width: RFValue(60),
            height: RFValue(60),
            borderRadius: RFValue(30),

            alignItems: 'center',
            justifyContent: 'center',

            position: 'absolute',
            bottom: RFValue(13),
            right: RFValue(22),
        }
    })