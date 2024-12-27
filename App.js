import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const kueList = [
  { id: '1', name: 'Red Velvet', image: require('./assets/red-velvet.jpg'), price: 'Rp 50.000', detail: 'Red velvet dengan chese dan selai strawbery yang yummy.', rating: 4.9, liked: false },
  { id: '2', name: 'Matcha', image: require('./assets/matcha-cake.jpg'), price: 'Rp 60.000', detail: 'Matcha cake yang enak dan lembut.', rating: 4.7, liked: false },
  { id: '3', name: 'Brownies', image: require('./assets/brownie.jpg'), price: 'Rp 70.000', detail: 'Brownies cokelat dengan toping premium.', rating: 4.8, liked: false },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, styles.pinkBackground]}>
      <Text style={styles.title}>Selamat Datang di Toko Kue Bibiie😉🍰</Text>
      <Button mode="contained" style={styles.creamButton} labelStyle={styles.blackText} onPress={() => navigation.navigate('Katalog')}>
        Yuk Lihat Katalog Kue🤤
      </Button>
    </View>
  );
};

const KatalogScreen = () => {
  const [items, setItems] = useState(kueList);
  const [cart, setCart] = useState([]);

  const toggleLike = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.name} telah ditambahkan ke keranjang!`);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert('Terima kasih sudah berbelanja ❤️');
      setCart([]);
    } else {
      alert('Keranjang Anda kosong!');
    }
  };

  return (
    <View style={[styles.container, styles.pinkBackground]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={[styles.card, styles.pinkBackground]}>
            <Card.Content>
              <Image source={item.image} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.detail}>{item.detail}</Text>
                <Text style={styles.rating}>Rating: {item.rating} ★</Text>
              </View>
              <View style={styles.cardContent}>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <FontAwesome
                    name={item.liked ? "heart" : "heart-o"}
                    size={24}
                    color={item.liked ? "#FF0000" : "#800000"}
                  />
                </TouchableOpacity>
                <Button
                  mode="contained"
                  style={styles.addButton}
                  labelStyle={styles.addButtonText}
                  onPress={() => addToCart(item)}
                >
                  Tambah ke Keranjang
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />
      <Button
        mode="contained"
        style={styles.checkoutButton}
        labelStyle={styles.blackText}
        onPress={handleCheckout}
      >
        Checkout
      </Button>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Toko Kue Bibiie' }} />
        <Stack.Screen name="Katalog" component={KatalogScreen} options={{ title: 'Katalog Kue' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#800000',
  },
  card: {
    margin: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#800000',
  },
  price: {
    fontSize: 16,
    color: '#800000',
  },
  detail: {
    fontSize: 14,
    marginTop: 5,
    color: '#800000',
  },
  rating: {
    fontSize: 14,
    marginTop: 5,
    color: '#800000',
  },
  pinkBackground: {
    backgroundColor: '#FFC0CB', // Pink
  },
  creamButton: {
    backgroundColor: '#FFF5E1', // Cream
    color: '#800000',
  },
  blackText: {
    color: '#000000',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#800000',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#FFF5E1',
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#FFF5E1', // Cream
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});