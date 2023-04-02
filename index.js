/*A rota PUT é outra funcionalidade importante que deve ser implementada na API do projeto Trindade Places. Essa rota permite que os usuários atualizem as informações de uma instituição pública específica na base de dados.

Para implementar a rota PUT, é preciso definir um identificador único para cada instituição, que será utilizado na requisição de atualização. Além disso, é necessário definir quais campos da instituição poderão ser atualizados pelos usuários.

A rota PUT pode ser implementada com o path /places/:id, onde o parâmetro :id representa o identificador único da instituição. Ao receber uma requisição PUT com esse path, a API deve verificar se o identificador corresponde a uma instituição válida na base de dados e, em caso positivo, permitir a atualização dos campos definidos.

A rota permitirá atualiza todos os campos cadastrados, exceto o ID
*/

const express = require('express');
const connection = require('./src/database');
const Place = require('./src/models/places');

const app = express();

app.use(express.json());        

connection.authenticate();
connection.sync({alter: true})
console.log('API ON') 

app.listen(3333, () => {
    console.log('SERVIDOR ON!')
}); 


app.post('/places', async (req, res) => {

    try {
         const place = {

        name: req.body.name,
       
        numberPhone: req.body.numberPhone,
  
        openingHours: req.body.openingHours,
  
        description: req.body.description,
 
        latitude: req.body.latitude,   
    
        longitude: req.body.longitude,
      }

         const newPlace = await Place.create(place)

             res.status(201).json(newPlace)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
});


app.get('/places', async (req, res) => {
    try {

        const places = await Place.findAll()
        return res.json(places) 
    } 
    catch (error) {
        res.status(500).json({message: 'Não há dados'})
    }

})


app.delete('/places/:id', async (req, res) => {
    try {
      const place = await Place.findByPk(req.params.id);
      if (!place) {
        return res.status(404).json({ message: 'Local não encontrado' });
      }
      await place.destroy();
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.put('/places/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        numberPhone,
        openingHours,
        description,
        latitude,
        longitude
      } = req.body;
   
      const place = await Place.findByPk(id);

      place.name = name;
      place.numberPhone = numberPhone;
      place.openingHours = openingHours;
      place.description = description;
      place.latitude = latitude;
      place.longitude = longitude;

      const placeUpdated = await place.save();

      return res.json(placeUpdated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});


