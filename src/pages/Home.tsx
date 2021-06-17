import React, { useEffect, useRef, useState } from 'react'; 
import { 
    StyleSheet, 
    Alert,
    View,
    FlatList,
    ActivityIndicator, 
    Text, 
} from 'react-native'; 

import { useNavigation } from '@react-navigation/core';
import { Modalize } from 'react-native-modalize'; 
import { getList, removeItem } from '../services/api'
import { Header } from '../components/Header';
import { FoodItem } from '../components/FoodItem'; 
import { FabButton } from '../components/FabButton';
import { ModalContent } from '../components/ModalContent';
import { HeaderModal } from '../components/HeaderModal';
import { Load } from '../components/Load';
import { ItemProps } from '../libs/Props'; 


export const Home = ({...props}) => {
    //13251273
    const navigation = useNavigation(); 
    const modalizeRef = useRef<Modalize>(null); 

    const [ data, setData ] = useState<ItemProps[]>([])
    const [ loading, setLoading ] = useState<Boolean>(true); 
    const [ loadingMore, setLoadingMore ] = useState<Boolean>(true);
    const [ page, setPage ] = useState(0); 
    const [ size, setSize ] = useState(1); 
    const [ updatePrice, setUpdatePrice] = useState<Boolean>(true); 

    //3 maneiras de acionar a minhas lista : ao iniciar a page, ao escrollar a pagina, e ao criar um novo item; 

    async function getItems( qtd?:number){


       const data  = qtd ? await getList(page, qtd) : await getList(page, size + 1);  

       if(!data)
            return setLoading(true)
        if(page > 0){
            setData(oldValue => [ ...oldValue, ...data ])
            setSize(oldValue => oldValue + 1)
        }else {
            setData(data);
        }
        
        setLoading(false);
        setLoadingMore(false);
        setPage(oldValue => oldValue +1);
        return data;
   }
   //2
    function handleFetchMore(distance: number, data:number ){
        if(distance > 0){
            setLoadingMore(true); 
            // setPage(oldValue => oldValue +1)
            getItems(); 
        } else {
            return; 
        }
    }
    
    function onOpen(){
        modalizeRef.current?.open(); 
    }; 

    //3
    function onClose(){
        setPage(oldvalue => oldvalue + 1)
        getItems().then(() => {
            modalizeRef.current?.close();
            console.log(`page:${page} size:${size}`)
        } )
    }

   function handleRemoveItem(item:ItemProps){

        if(size <= 0 )
            return setSize(1)

        if(size > 1)    
            return setSize(size - 1)
        
        Alert.alert("Remover", `Deseja remover a ${item.name}?`, [
            {
                text: 'Não', 
                style: 'cancel'
            }, 
            {
                text: 'Sim', 
                onPress: async () => {
                    try {
                        await removeItem(item.id)
                        setData((oldData) => 
                              oldData.filter((food) => food.id !== item.id)
                          );

                    } catch (error) {
                        Alert.alert('Não foi possível remover tente novamente.');
                        console.log(error)
                    }
                }
            }
        ])
    //    removeItem(item.id); 
   }
 
   function handleItemSelect(item:ItemProps, ){
        navigation.navigate('Add', { item});
   }

   //1
   useEffect(() => {
        getItems(size)
        .then(data => {
            setSize(data.length)
        })
    }, [updatePrice])


   if(loading)
        return <Load/>

    return(
        <View style={styles.container}>
            
            <View style={styles.header}>
                <Header />
            </View>

            
                <FlatList
                    // style={{paddingBottom: 50}}
                    data={data}
                    horizontal={false}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <FoodItem
                            data={item}
                            handleRemove={() => handleRemoveItem(item)}
                            onPress={() => handleItemSelect(item)}
                        />
                    )}
                    contentContainerStyle={{flex:1}}
                    numColumns={1}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd}) => {        
                        handleFetchMore(distanceFromEnd, data.length); 
                    }}
                    ListEmptyComponent={
                        <View
                            style={styles.emptyList}
                        >
                            <Text style={styles.emptyListText}> Sua lista esta vazia</Text>
                        </View>
                    }
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={'#3D7199'} />
                        : <></>
                    }
                />
        
            
            <Modalize
                ref={modalizeRef}
                snapPoint={600}
                modalHeight={650}
                HeaderComponent={
                    <HeaderModal/>
                }
                scrollViewProps={{
                    showsVerticalScrollIndicator:false
                }}
            >
                <ModalContent
                    onPress={onClose}
                />
            </Modalize>

            <FabButton onPress={onOpen}/>

        </View>
    ); 
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // justifyContent: 'space-between', 
        paddingHorizontal: 10, 
        // paddingTop: 50, 
        backgroundColor: '#fff'
    }, 
    header: {
        paddingHorizontal: 30
    },
    foods : {
        height: '100%',
        // flex: 1,
        width: '100%', 
        paddingHorizontal:10, 

    }, 
    emptyList: {
        // backgroundColor: 'red', 
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', 
    }, 
    emptyListText: {
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#3D7199'
    }
}); 