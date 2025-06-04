import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button } from '@mui/material';

export default function StockSearch() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      router.push(`/stock/${input.trim()}`);
    }
  };

  return (
    <Box display="flex" gap={2}>
      <TextField
        label="輸入股票代號"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        搜尋
      </Button>
    </Box>
  );
}
