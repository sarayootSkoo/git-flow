import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, FormControl, Select, MenuItem } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface GoldPricePoint {
  price: number;
  time: string;
}

export default function Home() {
  const [history, setHistory] = useState<GoldPricePoint[]>([]);
  const [period, setPeriod] = useState('24h');
  const latest = history[history.length - 1];

  useEffect(() => {
    fetch(`/api/gold-price?period=${period}`)
      .then(res => res.json())
      .then((data: GoldPricePoint[]) => {
        setHistory(data);
      })
      .catch(() => {});
  }, [period]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box my={2}>
        <Typography variant="h6">Current Gold Price (USD)</Typography>
        <Typography variant="body1">
          {latest ? `$${latest.price}` : 'Loading...'}
        </Typography>
      </Box>
      <Box my={2}>
        <FormControl size="small">
          <Select
            value={period}
            onChange={e => setPeriod(e.target.value as string)}
          >
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
          </Select>
        </FormControl>
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
