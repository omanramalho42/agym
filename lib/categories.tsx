import axios from "axios";

export async function getCategories () {
  const { categories } = await axios.get("https://agym.desenvolvimento.mobigap.com.br/api/app/categories/?user_id=1")
  .then((res) => 
    res.data
  );

  return categories?.sun;
}