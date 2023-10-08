import React, { useEffect, useState } from 'react'
import { Image, ScrollView } from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import apiFilmes from '../../services/apiFilmes'

const SeriesDetalhes = ({ navigation, route }) => {

  const [series, setSeries] = useState({})
  const [atores, setAtores] = useState([])

  useEffect(() => {
    const id = route.params.id
    apiFilmes.get(`/tv/${id}`).then(resultado => {
      setSeries(resultado.data)
    })

    apiFilmes.get(`/tv/${id}/credits`).then(resultado => {
      setAtores(resultado.data.cast)
    })

  }, [])

  return (
    <>
    <ScrollView style={{ padding: 15 }}>
        <Card style={{ marginBottom: 15 }}>
            <Card.Cover source={{ uri: 'https://image.tmdb.org/t/p/w500/' + series.backdrop_path }} />
            <Card.Content>
                <Text variant="titleLarge">{series.name}</Text>
                <Text variant="bodyMedium">{series.overview}</Text>
            </Card.Content>
        </Card>
        <Card mode='outlined' style={{ marginBottom: 15 }}>
            <Card.Content>
                <Text variant="bodyMedium">Número de Temporadas: {series.number_of_seasons}</Text>
                <Text variant="bodyMedium">Número de Episódios: {series.number_of_episodes}</Text>
                <Text variant="bodyMedium">Lançamento: {series.first_air_date}</Text>
                <Text variant="bodyMedium">Popularidade: {series.popularity}</Text>
                <Text variant="bodyMedium">Nota: {series.vote_average}</Text>
            </Card.Content>
        </Card>

        {atores.map(item => (
            <Card mode="outlined" key={item.id} style={{ marginBottom: 10 }}>
                <Card.Title
                    title={item.character}
                    subtitle={item.name}
                    left={(props) =>
                        <Image
                            source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.profile_path}}
                            style={{ width: 50, height: 50, borderRadius: 50 }}
                        />}
                    right={(props) => <IconButton {...props} icon="chevron-right" onPress={() => {navigation.push('atores-detalhes', { id: item.id }) }} />}
                />
            </Card>
        ))}

    </ScrollView>
</>
  )
}

export default SeriesDetalhes