export const pizzaToppings = [
  'anchovies',
  'bacon',
  'chicken',
  'ground beef',
  'ham',
  'mozzarella cheese',
  'mushrooms',
  'olives',
  'onions',
  'pepperoni',
  'peppers',
  'pineapple',
  'salami',
  'sausage',
  'spinach',
  'tomatoes',
];

export const starterPokemon = [
  {
    id: 1,
    name: 'Bulbasaur',
    type: ['Grass', 'Poison'],
    Weaknesses: ['Fire', 'Psychic', 'Flying', 'Ice'],
    base: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      'Sp. Attack': 65,
      'Sp. Defense': 65,
      Speed: 45,
    },
    description:
      'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun’s rays, the seed grows progressively larger.',
    profile: {
      height: '0.7 m',
      weight: '6.9 kg',
    },
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: ['Fire'],
    Weaknesses: ['Grass', 'Electric'],
    base: {
      HP: 39,
      Attack: 52,
      Defense: 43,
      'Sp. Attack': 60,
      'Sp. Defense': 50,
      Speed: 65,
    },
    description:
      'The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.',
    profile: {
      height: '0.6 m',
      weight: '8.5 kg',
    },
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
  },
  {
    id: 7,
    name: 'Squirtle',
    type: ['Water'],
    Weaknesses: ['Water', 'Ground', 'Rock'],
    base: {
      HP: 44,
      Attack: 48,
      Defense: 65,
      'Sp. Attack': 50,
      'Sp. Defense': 64,
      Speed: 43,
    },
    description:
      'Squirtle’s shell is not merely used for protection. The shell’s rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.',
    profile: {
      height: '0.5 m',
      weight: '9 kg',
    },
    image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
  },
];
