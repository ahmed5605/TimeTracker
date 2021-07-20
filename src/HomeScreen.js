import React, {useState, useEffect, Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
    
    const [id, setId] = useState('')
    const [itemId, setItemId] = useState('')
    const [itemTitle, setItemTitle] = useState('')
    const [value, setValue] = useState('')


    const fetchData = () => {
        console.log("id:  " + id);

        axios.get('https://c965ab309344.ngrok.io/api/pdfs/'+id)
        .then(response => {
            console.log(response.data[0])
            setItemId(response.data[0].id)
            setItemTitle(response.data[0].title)
        })
        .catch(error => {
            //console.error('There was an error!', error);
            alert('Please check the Id you entered!')
        });
    }

    const updateData = () => {
      
        const data = { 
            title: 'First File' 
        };

        axios.put('https://c965ab309344.ngrok.io/api/pdfs/1', data)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            
            console.error('There was an error!', error);
        });
    }

    useEffect(() => {
        console.log("useEffect");
        updateData()
    }, [])


    return(
        <SafeAreaView style={{alignItems: 'center', flex:1}} >
            <View >
                <View style={{height: 100, marginTop: 100, justifyContent: 'center', alignItems: 'center'}} >
                    <Text>ID:{itemId}</Text>
                    <Text>Title: {itemTitle}</Text>
                
                    <TextInput
                    placeholder=" Enter the Item Id"
                    keyboardType="numeric"
                    
                    value={value}
                    onChangeText={(val) => {
                        setValue(val)
                        setId(val)
                    }}
                    style={{height: 50, width: 200, borderWidth: 2, borderRadius: 10, fontSize: 24}}

                />
                </View>

                

                <TouchableOpacity 
                    onPress={fetchData}
                    style={{height: 50, width: 200, backgroundColor: 'red', borderRadius: 20, marginTop: 200, justifyContent: 'center', alignItems: 'center'}} >
                    <Text>Button</Text>
                </TouchableOpacity>
            </View>
    </SafeAreaView>
    )
}

export default HomeScreen
