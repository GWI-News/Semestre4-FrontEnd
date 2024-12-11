import React from 'react'
import { useState } from 'react'
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

  const deleteNoticia = async (id) => {
    const notDoc = doc(db, 'Noticias', id)
    await deleteDoc(notDoc)
  }
  
  return { createNoticia, deleteNoticia }
