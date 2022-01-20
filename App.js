import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing'

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePicker = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permission.granted === false) {
      alert('Permission to acces media is required')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync()
    if(result.cancelled === true){
      return
    }
    setSelectedImage({localUri: result.uri})
  };

  const openShareDialog = async () => {
    if(!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available on your platform')
      return
    }
    await Sharing.shareAsync(selectedImage.localUri)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an image!</Text>
      <TouchableOpacity
      onPress={openImagePicker}
      >
        <Image
        source={{uri: 
          selectedImage !== null 
          ? selectedImage.localUri
          : 'https://picsum.photos/200/200'
        }}
        style={styles.image}
        />
       </TouchableOpacity>
     {
       selectedImage ?
       (
        <TouchableOpacity 
        style={styles.button}
        onPress={openShareDialog}
        >
          <Text style={styles.buttonText}>Share!</Text>
        </TouchableOpacity>
       ) 
       : (<View/>)
     }
    </View>
  )
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#292929'
  },
  title: { fontSize: 30, color: 'white' },
  image: { height: 200, width: 200, borderRadius: 100, resizeMode: 'contain' },
  button: { backgroundColor: 'lightblue', padding: 5, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 20 }
})

export default App;
