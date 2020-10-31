import React, { useState} from "react";
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import Api from "../service/Api";



import mapMarker from "../images/map-marker.png";

interface Orphanage{
  id: number,
  name: string,
  latitude: number,
  longitude: number
}


export default function OrphanagesMap(){

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const navigation = useNavigation();
  
useFocusEffect(() => {
  Api.get('orphanages').then(response => {
    setOrphanages(response.data);
  });
});

  function handleNavigationToOrphanageDetails(id: number){
    navigation.navigate('OrphanageDetails', {id})
  }
  
  function handleNavigationToCreaOrphanage(){
    navigation.navigate('SelectMapPosition')
  }

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
     Nunito_700Bold,
      Nunito_800ExtraBold
  });

    return(
        <View style={styles.container}>
        <MapView style={styles.map} 
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -24.0195326,
          longitude: -46.493421,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }} >

          {orphanages.map(orphanage => {
            return(
              <Marker key={orphanage.id} icon={mapMarker}
              calloutAnchor={{
                x: 1.7,
                y: 0.6
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            >
              <Callout tooltip onPress={()=> handleNavigationToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
            <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
            )
          })}
         
        </MapView>
  
        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
  
          <RectButton style={styles.createOrphanageButton} onPress={handleNavigationToCreaOrphanage}>
            <Feather name="plus" size={20} color="#fff"  />
          </RectButton>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
    },
  
    calloutText: {
  
      fontFamily: 'Nunito_700Bold',
      color: '#0089a5',
      fontSize: 14
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
    
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 10
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
    
  });
  