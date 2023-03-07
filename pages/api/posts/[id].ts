import { NextApiRequest, NextApiResponse } from "next"

import { getCategories } from "../../../lib/categories"
import { getAllVideos } from "../../../lib/videos"

import useSwr from 'swr'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if(method === 'GET') {
    const categories = await useSwr(
      getCategories(), fetch
    );
    const allVideos = await useSwr(
      getAllVideos(), fetch
    );

    return res.status(200).send({
      categories: categories,
      videos: allVideos,
    })

  } else if (method === 'POST') {
    const { email, name, password } = req.body;
    
    const user = {
      email,
      name, 
      password
    }

    return res.status(201).send({ 
      message: 'success', 
      data: user 
    })
  }

  return res.status(404).send({ message: 'Route not found' })
  
}