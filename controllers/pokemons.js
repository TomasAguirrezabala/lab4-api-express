const axios = require('axios');
const { request, response } = require('express');

const getPokemons = async (req = request, res = response) => {
  try {
    const { limit = 50, offset = 0, api } = req.query;
    const miApi = process.env.API_KEY;
    if (api === miApi){
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?api_key=${api}&limit=${limit}&offset=${offset}`);
      const pokemons = response.data.results;
      res.status(200).json(pokemons);
    }else{
      res.status(401).json({error: 'Unauthorized'})
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error inesperado' });
    }
};

const getPokemon = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const {api} = req.query;
    const miApi = process.env.API_KEY;
    if (api === miApi){
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}?api_key=${api}`);
      const pokemon = response.data;
      res.status(200).json(pokemon);
    }else{
      res.status(401).json({error: 'Unauthorized'})
    }
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: 'Pokémon no encontrado' });
    }
};

const getAbilitiesLista = async (req = request, res = response) => {
  const {limit, offset, api } = req.query;
  const miApi = process.env.API_KEY;
  let query_params = '';
  query_params += limit && `&limit=${limit}`;
  query_params += offset && `&offset=${offset}`;
  try {
    if (api === miApi){    
      const response = await axios.get(`https://pokeapi.co/api/v2/ability?api_key=${api}${query_params}`);
      const abilities = response.data;
      const results = abilities.results;
      res.status(200).json(results);
    }else{
      res.status(401).json({error: 'Unauthorized'})
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error inesperado' });
    }
};

module.exports = {
  getPokemons,
  getPokemon,
  getAbilitiesLista,
};
