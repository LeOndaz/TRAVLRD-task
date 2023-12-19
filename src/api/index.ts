import {deleteBusiness, getBusinessById, createBusiness, getBusinesses, updateBusiness, } from './business'
import {getCurrentUser, getSession} from './user'

export const businessApi ={
  deleteBusiness,
  getBusinessById,
  getBusinesses,
  updateBusiness,
  createBusiness,
}

export const authApi = {
  getCurrentUser,
  getSession,
}