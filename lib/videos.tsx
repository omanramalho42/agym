import axios from "axios"

import { getCategories } from "./categories"

export async function getAllVideos () {
  const categories = await getCategories()

  const allVideos = [];
    await Promise.all(
      categories.map( async (i) => {
        await axios.get(`https://agym.desenvolvimento.mobigap.com.br/api/app/videos?user_id=1&categorie_id=${i.id}`)
        .then((res) => {
          allVideos.push(res.data.videos[0]);
        })
      })
    );

    return allVideos;
}