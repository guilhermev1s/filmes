import React, { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'
import apiFilmes from '../../services/apiFilmes'
import { Card } from 'react-native-paper'

const Atores = ({ navigation, route }) => {

    const [ator, setAtor] = useState({})
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const id = route.params.id
        apiFilmes.get(`/person/${id}`).then(resultado => {
            setAtor(resultado.data)
        })

        apiFilmes.get(`/person/${id}/movie_credits`).then(resultado => {
            setFilmes(resultado.data.cast)
        })

    }, [])

    return (
        <>
        <ScrollView>
            <Card style={{ marginBottom: 15 }}>
                <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + ator.profile_path }} />
                <Card.Content>
                    <Text variant="titleLarge">{ator.name}</Text>
                    <Text variant="titleLarge">{ator.biography}</Text>
                    <Text variant="bodyMedium">{ator.birthday}</Text>
                    <Text variant="bodyMedium">{ator.place_of_birth}</Text>
                </Card.Content>
            </Card>

            {filmes.map(item => (
                <Card
                    key={item.id}
                    onPress={() => navigation.push('filmes-detalhes', { id: item.id })}
                    style={{ marginBottom: 15 }}
                >
                    <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path }} />
                    <Card.Content>
                        <Text variant="titleLarge">{item.title}</Text>
                        <Text variant="bodyMedium">{item.overview}</Text>
                    </Card.Content>
                </Card>
            ))}
            </ScrollView>
        </>
    )
}

export default Atores