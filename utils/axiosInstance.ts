import axios from 'axios'
import { CLOUDINARY_CLIENTAPI } from '../config/envariables'

export const axiosInstance = axios.create({
  baseURL: CLOUDINARY_CLIENTAPI,
  timeout: 30000, // 30 seconds
})