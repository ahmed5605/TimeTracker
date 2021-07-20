import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput, 
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
// importing library to use Stopwatch and Timer
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const App = () => {
 
  const [id, setId] = useState('')
  const [itemId, setItemId] = useState('')
  const [itemTitle, setItemTitle] = useState('')
  const [value, setValue] = useState('')
  const [time, setTime] = useState('')
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [loading, setLoading] = useState(false)


  const fetchData = () => {

      if(id !== ''){
        resetTimer()

        axios.get('https://c965ab309344.ngrok.io/api/pdfs/'+id)
        .then(response => {
            console.log(response.data)
            
            startTimer()
            setItemId(response.data[0].id)
            setItemTitle(response.data[0].title)
            setIsStopwatchStart(true);
            setResetStopwatch(false);
            setLoading(false)
        })
        .catch(error => {
            //console.error('There was an error!', error);
            alert('Error: ' + error)
            setTimeout(() => {
                setLoading(false)
            }, 500);
        });
      }else{
        console.log('sd');    
        setTimeout(() => {
            setLoading(false)
        }, 500);
            alert('Please check the Id you entered!')
          
      }

       
  }

  const updateData = () => {
      
      const formData = new FormData();
      formData.append('file', time);

      axios.post('https://c965ab309344.ngrok.io/api/pdfs/'+id,formData)
      .then(response => {
          console.log(response.data)
          
      })
      .catch(error => {
          console.error('There was an error!', error);
          //alert('Please check the Id you entered!')
      });
  }


  const resetTimer = () => {
      console.log('restart');
    setIsStopwatchStart(false);
    setResetStopwatch(true);
  } 


  const startTimer = () => {
    console.log('start');
    setIsStopwatchStart(!isStopwatchStart);
    setResetStopwatch(false);
  } 

  const setTimerValue = (timeVal) => {
     // console.log('jkhgh ' + timeVal);
      setTime(timeVal)
  }

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <View style={styles.mainContainer} >
                <View style={styles.textContainer} >
                    {itemId === ''
                    ?
                    null
                    :
                        <View style={styles.textStyle} >
                            <Text style={styles.text} >Id: {itemId}</Text>
                            <Text style={styles.text} >Title: {itemTitle}</Text>
                        </View>
                    }
                </View>
                <TextInput
                    placeholder=" Enter the Item Id"
                    keyboardType="numeric"
                    textAlign="center"
                    value={value}
                    onChangeText={(val) => {
                        setValue(val)
                        setId(val)
                    }}
                    style={styles.textInputStyle}
                />
            </View>

            {loading 
            ?<View 
                style={styles.buttonContainer} >
                <ActivityIndicator size="large" color="white" />
                <Text style={styles.buttonText} >  Loading . . .</Text>
            </View>
            :
            <TouchableOpacity 
                onPress={() => {
                    fetchData(); 
                    updateData();
                    setLoading(true)
                }}
                style={styles.buttonContainer} >
                <Text style={styles.buttonText} >Button</Text>
            </TouchableOpacity>
            }

            <Stopwatch
                options={{text: {color: 'white'}}}
                laps
                msecs
                start={isStopwatchStart}
                reset={resetStopwatch}
                getTime={(time) => {
                setTimerValue(time)
                }}
            />
        </View>
      </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        height: 100, 
        marginTop: 100, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textContainer: {
        margin: 20
    },
    text: {
        fontSize: 22
    },
    textInputStyle: {
        height: 50, 
        width: 200, 
        borderWidth: 2, 
        borderRadius: 10, 
        fontSize: 24
    },
    buttonContainer: {
        height: 50,
        width: 200, 
        backgroundColor: '#3498DB', 
        borderRadius: 20, 
        marginTop: 200, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: 'white', fontSize: 22
    },
    textStyle: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 100
    }
});

