import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import { useState } from 'react';

export function GameScreen({ navigation }) {

  const baseMap = [
    ['', '', ''], //1st row
    ['', '', ''], //2nd row
    ['', '', ''], //3rd row
  ];

  const [plato, setPlato] = useState(baseMap);
  
  const [currentTurn, setCurrentTurn] = useState('x');

  const onPress = (rowIndex, columnIndex) => {
    // console.warn(rowIndex, columnIndex);{/* afiche la ligne et la column de la case cliquée*/}
    if (plato[rowIndex][columnIndex] !== "") {
      alert('case déja remplie');{/* si la case de la const plato est différente d'une case vide, alors on affiche une alerte */}
      return;
    }
    setPlato((existingPlato) => {
      const updatePlato = [...existingPlato];{/* on recupère l'ancien tableau plato pour l'initialiser dans le updatePlato  */}
      updatePlato[rowIndex][columnIndex] = currentTurn;
      return updatePlato;{/* on retourne le nouveau plato avec la nouvelle valeur dedans */}
    });
    
    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x');{/* si la valeur de currentTurn est x, on set alors o (et inversement) */};
    const winner = CheckWinning();
    if(winner){
      gameWon(winner.toUpperCase());
    }
    else {
      gameNull();
    }
    };

  //winning
  const CheckWinning = () => {
    //check rows
    for( let i = 0; i < 3; i++){
      const winningxRow = plato[i].every(cell => cell === 'x');
      const winningoRow = plato[i].every(cell => cell === 'o');
      if( winningxRow){
        return 'x';
      }
      if( winningoRow){
        return 'o';
      }
    }

    //checks columns
    for( let col = 0; col < 3; col++){
      let winningxCol = true;
      let winningoCol = true;

      for( let row = 0; row < 3; row++){
        if(plato[row][col] !== 'x'){
          winningxCol = false;
        }
        if(plato[row][col] !== 'o'){
          winningoCol = false;
        }
      }
      if( winningxCol){
        return 'x';
      }
      if( winningoCol){
        return 'o';
      }
    }

    //check diagonals
    diag1 = plato[0][0] + plato[1][1] + plato[2][2];
    diag2 = plato[0][2] + plato[1][1] + plato[2][0];
    if (diag1 === 'xxx' || diag2 === 'xxx' ){
      return 'x';
    }
    if (diag1 === 'ooo' || diag2 === 'ooo' ){
      return 'o';
    }
  }
  const gameNull = () => {
    if(!plato.some(row => row.some(cell => cell === ''))){
      Alert.alert(`Dommage...`, `Match nul`, [
        {
          text: 'Rejouer',
          onPress: resetGame,
        }
      ]);
    }
  }

  const gameWon = (player) => {
    Alert.alert(`Félicitation !`, `Player ${player} a gagné`, [
      {
        text: 'Rejouer',
        onPress: resetGame,
      }
    ]);
  }
  const resetGame = () => {
    setPlato(baseMap);
    setCurrentTurn('x');
  }

    return (
      <View style={styles.container}>{/* retourne la screen complete */}
      <Text style={styles.textTurn}>Au tour de {currentTurn.toUpperCase()}</Text>
        <View style={styles.plato}>{/* retourne le plateau */}

        <View style={styles.platoLimitHor}>
          <View style={styles.LimitHor}></View>
          <View style={styles.LimitHor}></View>
          <View style={styles.LimitHor}></View>
          <View style={styles.LimitHor}></View>
        </View>
        <View style={styles.platoLimitVert}>
          <View style={styles.LimitVert}></View>
          <View style={styles.LimitVert}></View>
          <View style={styles.LimitVert}></View>
          <View style={styles.LimitVert}></View>
        </View>
          {plato.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>{/* le plato.map retourne les 3 rows de la const plato, contenant elles mêmes 3 cells | rowIndex correspond à la localisation de la case ligne */}
              {row.map((cell, columnIndex) => 
              <Pressable key={`row-${rowIndex}-col-${columnIndex}`} onPress={() => onPress(rowIndex, columnIndex)} style={styles.cell}>{/* le row.map retourne les 3 cells de chaques rows | columnIndex correspond à la localisation de la case column */}
                {cell === 'o' && <View style={styles.circle}></View>}{/* si la case === o, alors on affiche la view circle */}
                {cell === 'x' && <View style={styles.cross}><View style={styles.crossLine}></View><View style={[styles.crossLine, styles.crossLine2]}></View></View>}{/* si la case === x, alors on affiche la view cross */}
              </Pressable>)}
            </View>
          ))}
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3d5a80',
    }, 
    textTurn: {
      position: 'absolute',
      color: '#ffffff',
      top: '10%',
      fontSize: 25,
    },
    plato: {
      position: 'relative',
      width: '80%',
      aspectRatio: 1,
      borderColor: 'transparent',
      borderWidth: 1,
    },
    platoLimitHor: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
    },
    LimitHor: {
      width: '100%',
      height: 5,
      backgroundColor: '#ffffff',
    },
    platoLimitVert: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    LimitVert: {
      height: '100%',
      width: 5,
      backgroundColor: '#ffffff',
    },
    row: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    cell: {
      width: 100,
      height: 100,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'transparent',
      borderWidth: 1,
    },
    circle: {
      width: 65,
      height: 65,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 10,
      borderColor: '#ffffff',
    },
    cross: {
      width: 65,
      height: 65,
    },
    crossLine: {
      position: 'absolute',
      left: '42.5%',
      width: 10,
      height: 65,
      backgroundColor: '#ffffff',
      borderRadius: 5,
      transform: [{ rotate: '45deg' }]
    },
    crossLine2: {
      transform: [{ rotate: '-45deg'}]
    }
  })