import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [valor, setAmount] = useState('');
  const [carteira, setBills] = useState([]);

  const calculateBills = () => {
    const value = parseInt(valor);
    if (isNaN(value) || value % 10 !== 0 || value <= 0) {
      alert("Por favor, insira um valor válido que seja múltiplo de 10.");
      return;
    }

    const multiplos = [50, 20, 10];
    const resultado = [];

    let remainingAmount = value;

    multiplos.forEach(multiplo => {
      const contador = Math.floor(remainingAmount / multiplo);
      if (contador > 0) {
        resultado.push({ multiplo, contador });
        remainingAmount -= contador * multiplo;
      }
    });

    setBills(resultado);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Banco do Itaú</Text>
      <Text style={styles.title}>Digite o valor a ser retirado (múltiplo de 10):</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor a ser retirado"
        keyboardType="numeric"
        value={valor}
        onChangeText={setAmount}
      />
      <Button title="Calcular Retirada" onPress={calculateBills} />
      <View style={styles.containerValores}>
        <FlatList
          data={carteira}
          keyExtractor={(item) => item.multiplo.toString()}
          renderItem={({ item }) => (
            <Text style={styles.billText}>
              R$ {item.multiplo}: {item.contador} nota(s).
            </Text>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma cédula necessária.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  headerTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    backgroundColor: 'black',
    color: 'white',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 50
  },
  containerValores:{
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  billText: {
    color: 'black',
    fontSize: 18,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default App;