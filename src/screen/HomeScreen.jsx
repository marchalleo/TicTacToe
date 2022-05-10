import { Text, View, Button } from 'react-native';

export function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>TicTacToe</Text>
        <Button
          title="Jouer !"
          onPress={() => navigation.navigate('Game')}
        />
      </View>
    );
  }