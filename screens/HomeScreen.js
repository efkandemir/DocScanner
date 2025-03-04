import { View, Text, SafeAreaView, TouchableOpacity, Alert, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Platform, Linking } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import ImageCards from '../components/ImageCards';
import { createAndShowPdf } from '../utils/pdfUtils';

export default function HomeScreen() {
    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#60a5fa');
    }, []);

    const [isfavpdf, setIsfavpdf] = useState(false);
    const [ispdf, setIspdf] = useState(false);
    const [pdfUri, setPdfUri] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const { hasPermission, requestPermission } = useCameraPermission();

    useEffect(() => {
        if (route.params?.capturedImage) {
            createAndShowPdf(route.params.capturedImage);
        }
    }, [route.params?.capturedImage]);

    const onCamera = async () => {
        const granted = await requestPermission();
        if (!granted) {
            Alert.alert(
                "İzin Gerekli",
                "Kamera iznini ayarlardan açmalısınız.",
                [{ text: "Ayarları Aç", onPress: () => Linking.openSettings() }]
            );
            return;
        }
        navigation.navigate("Camera");
    };

    const onGalleryPress = async () => {
        console.log("Galeri açılıyor...");

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                "İzin Gerekli",
                "Galeriye erişim izni vermelisiniz.",
                [{ text: "Ayarları Aç", onPress: () => Linking.openSettings() }]
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            createAndShowPdf(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView className="items-center flex-1 justify-start bg-blue-400">
            <View className="mt-6">
                <Text className="text-base items-start mt-4 font-semibold">Document Scanner</Text>
            </View>
            <View className="flex-row p-1">
                <TouchableOpacity className="m-2" onPress={onGalleryPress}>
                    <ImageCards props={'Gallery'} />
                </TouchableOpacity>
                <TouchableOpacity className="m-2" onPress={onCamera}>
                    <ImageCards props={'Camera'} />
                </TouchableOpacity>
            </View>

            <View className="h-[1px] w-full bg-black" />
            <View className="w-full h-[250px] items-center justify-center">
                <Text className="self-start ml-4 absolute top-4">Favorites</Text>
                {isfavpdf ? (
                    <Text>Efkan</Text>
                ) : (
                    <Text className="text-center">Favori Pdf Bulunamadı</Text>
                )}
            </View>
            <View className="h-[1px] w-full bg-black" />
            <View className="items-center justify-center w-full h-[355px]">
                <Text className="self-start ml-2 absolute top-4">All Projects</Text>
                {ispdf ? (
                    <TouchableOpacity onPress={viewPdf}>
                        <Text style={{ color: 'blue' }}>PDF'yi Görüntüle</Text>
                    </TouchableOpacity>
                ) : (<Text>Pdf Yok</Text>)}
            </View>
        </SafeAreaView>
    );
}
