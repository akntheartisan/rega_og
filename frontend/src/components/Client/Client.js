import axios from 'axios';

export const client = axios.create(
    // {baseURL:'http://localhost:4000'}
    {baseURL:'https://rega-og-backend.vercel.app'}
)