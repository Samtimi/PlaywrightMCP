import { test, expect, request } from '@playwright/test';
import Ajv from 'ajv';

// Define the API endpoint URL
const API_URL = 'https://fakestoreapi.com/products/1'; // Example endpoint, replace as needed

// JSON Schema for response validation
const productSchema = {
  type: 'object',
  required: ['id', 'title', 'price', 'category', 'description'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    price: { type: 'number' },
    category: { type: 'string' },
    description: { type: 'string' },
  },
};

test('GET product API - validate response and schema', async ({ request }) => {
  // Send GET request
  const response = await request.get(API_URL);
  // Verify status code
  expect(response.status()).toBe(200);

  // Parse response body
  const data = await response.json();

  // Validate required keys
  const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
  for (const key of requiredKeys) {
    expect(data).toHaveProperty(key);
  }

  // Optional: Validate data types using Ajv
  const ajv = new Ajv();
  const validate = ajv.compile(productSchema);
  const valid = validate(data);
  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }
  expect(valid).toBe(true);

  // Log product title and price
  console.log(`Product Title: ${data.title}`);
  console.log(`Product Price: ${data.price}`);
});
