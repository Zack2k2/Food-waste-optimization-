const request = require('supertest');
import { describe, test, it, expect } from 'vitest'
const app = require('./app');
const path = require('path');
const fs = require('fs');
const jsonfile = require('jsonfile');


// Mock file paths
const inventory_json_filepath = path.join(__dirname, './db/inventory.json');
const users_json_filepath = path.join(__dirname, './db/users.json');
const ingredients_json_filepath = path.join(__dirname, './db/ingredients.json');

it('should allow a user to comment on a dish', async () => {
    const comment = { comment: 'Great salad!' };
    const res = await request(app)
      .post('/foods/dish/8/comment')
      .set('Cookie', ['cookie=a1a1a1'])
      .send(comment)
      .expect('Content-Type', /html/)
      .expect(302);

    const inventory = jsonfile.readFileSync(inventory_json_filepath);
    expect(inventory[0].comments).toHaveLength(1);
    expect(inventory[0].comments[0].author_name).toBe('John Doe');
    expect(inventory[0].comments[0].comment).toBe('Great salad!');
  });

describe("Foods API", ()=>{
    it('should return the list of foods', async () => {
        const res = await request(app)
          .get('/foods')
          .expect('Content-Type', /html/)
          .expect(200);
    
        expect(res.text).toContain(`<div class="item expired">
        <h2>Vanilla Cake</h2>
        <p><strong>Ingredients:</strong> flour, sugar, baking powder, eggs, milk, butter, vanilla extract</p>
        <p><strong>Difficulty Cooking:</strong> 4</p>
        <p><strong>Quality:</strong> 10</p>
        <p><strong>Expiration Date:</strong> 2024-06-01</p>
        <p><strong>Quantity:</strong> 3</p>
        <p><strong>Storage Location:</strong> Refrigerator</p>
        <p><strong>Average Rate:</strong>0.00 </p>
         <form action="/foods/rate" method="POST">
          <input type="hidden" name="dist_name" value="Vanilla Cake">
          <label for="rating">Rate this dish:</label>
          <select name="rating" id="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">Submit Rating</button>
        </form>
      </div>`);
      });
}
);