import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../Tasks/Home'
import StyleDrawer from '../styleDrawer';
import Login from '../Login';

export default function RoutesDrawer(){
    const Drawer = createDrawerNavigator();

    return(
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={() => <StyleDrawer />}
                initialRouteName="Home"
                screenOptions={{headerShown: false,}}
            >
                <Drawer.Screen name="Home" component={Home} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}