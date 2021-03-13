import axios from "axios";
import { Users } from "@/api/InterfacesGithubUsers";

const endpoint = "https://api.github.com/";

export async function getUsers(
  q: string,
  page: number,
  sort?: string,
  order?: string,
  perPage?: number
) {
  //montando a query
  let query = `?q=${q}&page=${page}`;
  query += sort ? `&sort=${sort}` : "";
  query += order ? `&order=${order}` : "";
  query += perPage ? `&per_page=${perPage}` : "";
  const url = "search/users" + query;

  let githubUsers = {} as Users;
  await axios({
    method: "get",
    baseURL: endpoint,
    url: url
  })
    .then(response => {
      githubUsers = response.data;
    })
    .catch(() => {
      return false;
    });
  return githubUsers;
}
