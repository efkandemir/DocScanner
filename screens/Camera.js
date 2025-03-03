import React, { useRef, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Image, StatusBar, PermissionsAndroid, Platform } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useFocusEffect } from '@react-navigation/native';


function CameraScreen() {
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);
    const [photoPath, setPhotoPath] = useState(null);
    const [isPhotoTaken, setIsPhotoTaken] = useState(false);

    useFocusEffect(React.useCallback(() => {
        StatusBar.setBarStyle('light-content');
        Platform.OS === 'android' && StatusBar.setBackgroundColor('black');
    }, []));

    const takePhoto = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePhoto({ flash: 'off' });
            if (!photo?.path) {
                throw new Error("Fotoğraf kaydedilemedi!");
            }
            setPhotoPath(`file://${photo.path}`);
            setIsPhotoTaken(true);
        } catch (error) {
            console.error("Fotoğraf çekme hatası:", error);
            Alert.alert("Hata", `Fotoğraf çekme hatası: ${error.message}`);
        }
    };



    const retakePhoto = () => {
        setPhotoPath(null);
        setIsPhotoTaken(false);
    };

    if (device == null) return <Text className="text-red-500 text-lg">Kamera cihazı bulunamadı.</Text>;

    return (
        <View className="flex-1 items-center justify-center bg-black">
            {!isPhotoTaken && (
                <Camera
                    ref={cameraRef}
                    className="absolute w-full h-full"
                    device={device}
                    isActive={true}
                    photo={true}
                />
            )}

            {!isPhotoTaken && (
                <TouchableOpacity className="absolute bottom-10 bg-white p-4 rounded-full" onPress={takePhoto}>
                    <Text className="text-black font-bold text-lg">📷 Çek</Text>
                </TouchableOpacity>
            )}

            {photoPath && isPhotoTaken && (
                <View className="absolute w-full h-full">
                    <Image source={{ uri: photoPath }} className="w-full h-full" resizeMode="contain" />
                </View>
            )}

            {photoPath && (
                <View className="absolute bottom-10 right-5 flex-row space-x-4">
                    <TouchableOpacity className="bg-black p-4 rounded-full" onPress={retakePhoto}>
                        <Text className="text-white font-bold text-lg">Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-black p-4 rounded-full">
                        <Text className="text-white font-bold text-lg">Done</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default CameraScreen;
