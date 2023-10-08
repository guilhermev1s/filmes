import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Card, Text } from 'react-native-paper'
import apiFilmes from '../../services/apiFilmes'

const SeriesPopulares = ({ navigation }) => {

    const [series, setSeries] = useState([])

    useEffect(() => {
      apiFilmes.get('/tv/popular').then(resultado => {
        setSeries(resultado.data.results)
      })
    }, [])

  return (
    <>
      <ScrollView style={{ padding: 15 }}>

        {series.map(item => (
          <Card
            key={item.id}
            onPress={() => navigation.push('series-detalhes', { id: item.id })}
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

export default SeriesPopulares