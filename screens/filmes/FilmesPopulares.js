import React from 'react'
import { Text } from 'react-native-paper'

const FilmesPopulares = () => {
  function carregar() {
    apiFilmes.get('/movie/popular?language=pt-BR').then(resultado => {  
      setFilmes(resultado.data.results)
    })
  }

  return (
    <>
    <Text>FilmesPopulares</Text>
    </>
  )
}

export default FilmesPopulares