import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    margin: 8,
                    height: 85,
                    left: 20,
                    right: 20,
                    borderRadius: 15
                }
            }} >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View className="justify-center items-center flex-col w-[70px] mt-[35px] h-[70px]">
                        <Icon name="home" size={35} color={focused ? "#3498db" : "#95a5a6"} />
                        <Text className={`text-xs mt-1 ${focused ? "text-blue-500 font-bold" : "text-gray-400"}`}>
                            Home
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <View className="justify-center items-center flex-col w-[70px] mt-[35px] h-[70px]">
                        <Ionicons name="settings" size={35} color={focused ? "#3498db" : "#95a5a6"} />
                        <Text className={`text-xs mt-1 ${focused ? "text-blue-500 font-bold" : "text-gray-400"}`}>
                            Settings
                        </Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    );
}
export default Tabs;