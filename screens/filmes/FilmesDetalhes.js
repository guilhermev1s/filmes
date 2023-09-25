import React, { useEffect, useState } from 'react'
import { Avatar, Card, IconButton, Text } from 'react-native-paper'
import apiFilmes from '../../services/apiFilmes'
import { Image, ScrollView } from 'react-native'

const FilmesDetalhes = ({ navigation, route }) => {

    const [filme, setFilme] = useState({})
    const [atores, setAtores] = useState([])

    useEffect(() => {
        const id = route.params.id
        apiFilmes.get(`/movie/${id}`).then(resultado => {
            setFilme(resultado.data)
        })

        apiFilmes.get(`/movie/${id}/credits`).then(resultado => {
            setAtores(resultado.data.cast)
        })

    }, [])

    return (
        <>
            <ScrollView style={{ padding: 15 }}>
                <Card style={{ marginBottom: 15 }}>
                    <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + filme.backdrop_path }} />
                    <Card.Content>
                        <Text variant="titleLarge">{filme.title}</Text>
                        <Text variant="bodyMedium">{filme.overview}</Text>
                    </Card.Content>
                </Card>
                <Card mode='outlined' style={{ marginBottom: 15 }}>
                    <Card.Content>
                        <Text variant="bodyMedium">Orçamento: {filme.budget}</Text>
                        <Text variant="bodyMedium">Voto: {filme.vote_average}</Text>
                        <Text variant="bodyMedium">Duração: {filme.runtime} min.</Text>
                        <Text variant="bodyMedium">Lançamento: {filme.release_date}</Text>
                    </Card.Content>
                </Card>

                <Text variant="titleLarge" style={{ textAlign: 'center', color: 'Green' }}>Atores</Text>

                {atores.map(item => (
                    <Card mode="outlined" 
                    key={item.id} 
                    style={{ marginBottom: 10 }}
                    onPress={() => navigation.push('atores-detalhes', {id: item.id})} >
                        <Card.Title 
                            title={item.character}
                            subtitle={item.name}
                            left={(props) =>
                                <Image
                                    source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.profile_path}}
                                    style={{ width: 50, height: 50, borderRadius: 50 }}
                                />}
                            right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => { }} />}
                        />
                    </Card>
                ))}

            </ScrollView>
        </>
    )
}


export default FilmesDetalhes