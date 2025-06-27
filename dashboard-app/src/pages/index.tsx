import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface GoldPriceResponse {
  price: number;
  time: string;
}

export default function Home() {
  const [price, setPrice] = useState<number | null>(null);
  const [history, setHistory] = useState<Array<{ time: string; price: number }>>([]);

  useEffect(() => {
    fetch('/api/gold-price')
      .then(res => res.json())
      .then((data: GoldPriceResponse) => {
        setPrice(data.price);
        setHistory(h => [...h.slice(-9), { time: data.time, price: data.price }]);
      })
      .catch(() => {});
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box my={2}>
        <Typography variant="h6">Current Gold Price (USD)</Typography>
        <Typography variant="body1">{price ? `$${price}` : 'Loading...'}</Typography>
      </Box>
      <Box height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}
