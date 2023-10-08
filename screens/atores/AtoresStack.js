import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import FilmesDetalhes from '../filmes/FilmesDetalhes';
import AtoresDetalhes from '../atores/AtoresDetalhes';
import AtoresPopulares from './AtoresPopulares';

const Stack = createNativeStackNavigator();

const AtoresStack = () => {
  return (
    <>
            <Stack.Navigator>
                <Stack.Screen name="atores-populares" component={AtoresPopulares} options={{ title: 'Atores Populares' }} />
                <Stack.Screen name="atores-detalhes" component={AtoresDetalhes} options={{ title: 'Detalhes' }} />
                <Stack.Screen name="filmes-detalhes" component={FilmesDetalhes} options={{ title: 'Filmes' }} />
            </Stack.Navigator>
        </>
  )
}

export default AtoresStack