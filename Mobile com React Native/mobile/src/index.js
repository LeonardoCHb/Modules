import React, { useEffect, useState } from 'react'
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native'

import api from './services/api'

export default function App() {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data)
        })
    }, [])

    async function handleRepository() {
        const response = await api.post('repositories', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Leonardo C. Hably'
        })
        const repository = response.data

        setRepositories([...repositories, repository])
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={repositories}
                    keyExtractor={repository => repository.id}
                    renderItem={({ item: repository }) => (
                        <Text style={styles.repository}>{repository.title}</Text>
                    )}
                />
                <TouchableOpacity 
                ctiveOpacity={0.6} 
                style={styles.button}
                 onPress={handleRepository}
                 >
                    <Text style={styles.buttonText}>Adicionar projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },

    repository: {
        color: '#FFF',
        fontSize: 30,
    },

    button:{
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }

})