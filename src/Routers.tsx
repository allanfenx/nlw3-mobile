import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import Headers from "./components/Headers";
import OrphanageMap from "./pages/OrphanageMap";
import OrphanageDetails from "./pages/OrphanageDetails";
import SelectMapPosition from "./pages/SelectMapPosition";
import OrphanageData from "./pages/OrphanageData";

export default function Routers() {

    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen name="OrphanageMap" component={OrphanageMap}
                     />
                <Screen name="OrphanageDetails" component={OrphanageDetails} options={{
                        headerShown: true,
                        header: () => <Headers showCancel={false} title="Detalhe Orfanatos" />
                    }} />
                <Screen name="SelectMapPosition" component={SelectMapPosition} options={{
                        headerShown: true,
                        header: () => <Headers title="Selecione no mapa" />
                    }} />
                <Screen name="OrphanageData" component={OrphanageData} options={{
                        headerShown: true,
                        header: () => <Headers title="Informe os dados" />
                    }} />
            </Navigator>
        </NavigationContainer>
    )
}